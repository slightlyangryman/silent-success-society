// lib/scoring.ts
// 점수 계산 핵심 로직

import {
  QUESTIONS,
  SECTION_META,
  SECTION_ORDER,
  Question,
  SectionId,
} from "@/data/questions";
import { BEHAVIOR_TYPES, BehaviorTypeId } from "@/data/resultTypes";
import { ObstacleId, OBSTACLE_ORDER } from "@/data/obstacles";

// answers: { [questionId]: 1..5 }
export type AnswerMap = Record<string, number>;

export type SectionScoreMap = Record<SectionId, number>;

export interface ScoreResult {
  // 0~5 점 스케일 (역문항 환산 적용)
  sectionScores: SectionScoreMap;
  threeM: {
    mapping: number;
    making: number;
    meshing: number;
    average: number;
    strongest: "mapping" | "making" | "meshing";
    weakest: "mapping" | "making" | "meshing";
    spread: number;
  };
  habitScore: number;
  orgScore: number;
  obstacleScores: Record<ObstacleId, number>;
  topObstacle: { id: ObstacleId; score: number };
  riskScore: number; // 1.0 ~ 5.0
  riskLevel: "낮음" | "보통" | "높음" | "매우 높음";
  riskMessage: string;
  behaviorType: BehaviorTypeId;
  overallAverage: number;
}

// 한 문항의 실제 점수 (역문항 환산 적용)
export function scoreOf(question: Question, raw: number | undefined): number | null {
  if (raw === undefined || raw === null) return null;
  const v = Number(raw);
  if (Number.isNaN(v)) return null;
  return question.reverse ? 6 - v : v;
}

// 섹션별 평균 점수
export function calculateSectionScores(answers: AnswerMap): SectionScoreMap {
  const buckets: Record<SectionId, number[]> = {
    mapping: [],
    making: [],
    meshing: [],
    aimlessness: [],
    boredom: [],
    comfort: [],
    delusion: [],
    ego: [],
    fear: [],
    guardedness: [],
    habit: [],
    org: [],
  };

  for (const q of QUESTIONS) {
    const s = scoreOf(q, answers[q.id]);
    if (s !== null) buckets[q.section].push(s);
  }

  const result = {} as SectionScoreMap;
  for (const sec of SECTION_ORDER) {
    const arr = buckets[sec];
    result[sec] = arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
  }
  return result;
}

function strongestOfThree(s: SectionScoreMap): "mapping" | "making" | "meshing" {
  const arr: Array<["mapping" | "making" | "meshing", number]> = [
    ["mapping", s.mapping],
    ["making", s.making],
    ["meshing", s.meshing],
  ];
  arr.sort((a, b) => b[1] - a[1]);
  return arr[0][0];
}

function weakestOfThree(s: SectionScoreMap): "mapping" | "making" | "meshing" {
  const arr: Array<["mapping" | "making" | "meshing", number]> = [
    ["mapping", s.mapping],
    ["making", s.making],
    ["meshing", s.meshing],
  ];
  arr.sort((a, b) => a[1] - b[1]);
  return arr[0][0];
}

export function determineBehaviorType(
  scores: SectionScoreMap,
  overallAverage: number
): BehaviorTypeId {
  const { mapping, making, meshing, habit } = scores;
  const threeMAvg = (mapping + making + meshing) / 3;

  // Starter / Reset 조건 (최우선)
  if (threeMAvg < 3.0 || habit < 3.0 || overallAverage < 3.0) {
    return "starter";
  }

  // Developer 조건
  const allHighEnough = mapping >= 3.7 && making >= 3.7 && meshing >= 3.7;
  const spread = Math.max(mapping, making, meshing) - Math.min(mapping, making, meshing);
  if (allHighEnough && spread <= 0.7) {
    return "developer";
  }

  // 가장 약한 축으로 판정
  const weakest = weakestOfThree(scores);
  switch (weakest) {
    case "meshing":
      return "driver";
    case "mapping":
      return "drifter";
    case "making":
      return "dreamer";
  }
}

export function calculateRiskLevel(scores: SectionScoreMap): {
  riskScore: number;
  riskLevel: "낮음" | "보통" | "높음" | "매우 높음";
  riskMessage: string;
} {
  const { making, fear, comfort, habit } = scores;
  // 장애물 평균(상위 1개)
  const obstacleScoresArr = OBSTACLE_ORDER.map((id) => scores[id]);
  const topObstacleAverage = Math.max(...obstacleScoresArr);

  const riskScore =
    (5 - making) * 0.25 +
    fear * 0.2 +
    comfort * 0.2 +
    (5 - habit) * 0.25 +
    topObstacleAverage * 0.1;

  // 위 식은 대략 0.5~4.5 범위. 1.0~5.0 으로 살짝 정규화.
  const clamped = Math.max(1.0, Math.min(5.0, riskScore));

  let riskLevel: "낮음" | "보통" | "높음" | "매우 높음";
  let riskMessage: string;

  if (clamped <= 2.0) {
    riskLevel = "낮음";
    riskMessage =
      "현재는 작은 실행을 유지할 가능성이 비교적 높은 상태입니다. 다만 루틴이 무너지지 않도록 주기적인 리뷰가 필요합니다.";
  } else if (clamped <= 3.0) {
    riskLevel = "보통";
    riskMessage =
      "실행은 가능하지만 환경이나 감정 상태에 따라 쉽게 흔들릴 수 있는 상태입니다. 2분 행동과 기록 장치를 함께 설계해보세요.";
  } else if (clamped <= 4.0) {
    riskLevel = "높음";
    riskMessage =
      "계획은 있지만 실제 행동으로 이어지기 어려운 상태일 수 있습니다. 목표를 줄이고, 실패하기 어려운 행동부터 시작해야 합니다.";
  } else {
    riskLevel = "매우 높음";
    riskMessage =
      "의지의 문제가 아니라 행동 설계가 너무 크거나 불명확할 가능성이 큽니다. 오늘은 단 하나의 2분 행동만 정해 보세요.";
  }

  return { riskScore: clamped, riskLevel, riskMessage };
}

export function getTopObstacle(scores: SectionScoreMap): { id: ObstacleId; score: number } {
  let top: { id: ObstacleId; score: number } = {
    id: OBSTACLE_ORDER[0],
    score: scores[OBSTACLE_ORDER[0]],
  };
  for (const id of OBSTACLE_ORDER) {
    if (scores[id] > top.score) top = { id, score: scores[id] };
  }
  return top;
}

export function calculateOverallAverage(answers: AnswerMap): number {
  let total = 0;
  let count = 0;
  for (const q of QUESTIONS) {
    const s = scoreOf(q, answers[q.id]);
    if (s !== null) {
      total += s;
      count += 1;
    }
  }
  return count ? total / count : 0;
}

export function getCompletedCount(answers: AnswerMap): number {
  return QUESTIONS.filter((q) => answers[q.id] !== undefined).length;
}

export function getAllScores(answers: AnswerMap): ScoreResult {
  const sectionScores = calculateSectionScores(answers);
  const overallAverage = calculateOverallAverage(answers);
  const strongest = strongestOfThree(sectionScores);
  const weakest = weakestOfThree(sectionScores);
  const threeMAverage =
    (sectionScores.mapping + sectionScores.making + sectionScores.meshing) / 3;
  const spread =
    Math.max(sectionScores.mapping, sectionScores.making, sectionScores.meshing) -
    Math.min(sectionScores.mapping, sectionScores.making, sectionScores.meshing);

  const obstacleScores = {} as Record<ObstacleId, number>;
  for (const id of OBSTACLE_ORDER) obstacleScores[id] = sectionScores[id];

  const topObstacle = getTopObstacle(sectionScores);
  const risk = calculateRiskLevel(sectionScores);
  const behaviorType = determineBehaviorType(sectionScores, overallAverage);

  return {
    sectionScores,
    threeM: {
      mapping: sectionScores.mapping,
      making: sectionScores.making,
      meshing: sectionScores.meshing,
      average: threeMAverage,
      strongest,
      weakest,
      spread,
    },
    habitScore: sectionScores.habit,
    orgScore: sectionScores.org,
    obstacleScores,
    topObstacle,
    riskScore: risk.riskScore,
    riskLevel: risk.riskLevel,
    riskMessage: risk.riskMessage,
    behaviorType,
    overallAverage,
  };
}

export function generateRecommendedAction(result: ScoreResult): string {
  const type = BEHAVIOR_TYPES[result.behaviorType];
  return type.twoMinuteActions[0];
}

// 헬퍼: 라벨 한글 매핑
export const THREE_M_LABEL: Record<"mapping" | "making" | "meshing", string> = {
  mapping: "Mapping · 설계",
  making: "Making · 실행",
  meshing: "Meshing · 성장",
};

export function getSectionLabel(id: SectionId): string {
  return SECTION_META[id].label;
}
