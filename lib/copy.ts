// lib/copy.ts
// 결과 복사 템플릿 생성

import { ScoreResult, THREE_M_LABEL } from "@/lib/scoring";
import { BEHAVIOR_TYPES } from "@/data/resultTypes";
import { OBSTACLES } from "@/data/obstacles";
import { ActionPlan } from "@/lib/storage";
import { SECTION_META, SECTION_ORDER, SectionId } from "@/data/questions";

const SECTION_ACTION_PLANS: Record<
  SectionId,
  {
    focus: string;
    action: string;
    check: string;
  }
> = {
  mapping: {
    focus: "방향, 우선순위, 이번 달의 핵심 전투를 정리한다.",
    action: "이번 달 가장 중요한 목표를 한 문장으로 적고, 하지 않을 일 1가지를 같이 정한다.",
    check: "내가 시간을 쓰는 일이 내가 중요하게 여기는 방향과 연결되어 있는지 확인한다.",
  },
  making: {
    focus: "생각을 실제 결과물로 바꾸는 실행력을 만든다.",
    action: "오늘 바로 할 수 있는 2분 행동을 정하고, 작더라도 결과물을 하나 남긴다.",
    check: "이번 주에 완성한 작은 결과물이 있는지 확인한다.",
  },
  meshing: {
    focus: "학습, 피드백, 새로운 경험을 통해 성장의 폭을 넓힌다.",
    action: "이번 주에 배울 것 1가지와 피드백 받을 사람 또는 자료 1개를 정한다.",
    check: "새로 배운 내용을 내 목표나 실행 방식과 연결했는지 확인한다.",
  },
  aimlessness: {
    focus: "목적 상실을 줄이고 방향을 다시 잡는다.",
    action: "지금 가장 중요한 전투를 하나만 고르고, 그 이유를 짧게 적는다.",
    check: "바쁘게 움직이는 것보다 중요한 방향으로 움직이고 있는지 확인한다.",
  },
  boredom: {
    focus: "지루함과 무기력을 줄이고 호기심을 되살린다.",
    action: "요즘 궁금한 질문 1개를 정하고, 20분 동안 찾아보거나 기록한다.",
    check: "즉각적인 재미만 소비하고 있지는 않은지 확인한다.",
  },
  comfort: {
    focus: "안락함에 머무르지 않고 작은 불편을 감수한다.",
    action: "미루고 있는 일 중 가장 작은 단위 하나를 오늘 2분만 실행한다.",
    check: "편한 선택이 나를 정체시키고 있는지 확인한다.",
  },
  delusion: {
    focus: "생각, 계획, 착각이 아니라 실제 행동과 결과를 기준으로 본다.",
    action: "내가 하고 있다고 생각하는 일 중 실제 결과물이 없는 것을 하나 고르고, 작은 산출물로 바꾼다.",
    check: "노력했다는 느낌과 실제 남은 결과물을 구분한다.",
  },
  ego: {
    focus: "자존심보다 배움과 개선을 우선한다.",
    action: "내가 방어적으로 반응했던 피드백이나 상황을 하나 적고, 배울 점을 다시 정리한다.",
    check: "내가 어떻게 보이는지보다 실제로 제공한 가치가 있는지 확인한다.",
  },
  fear: {
    focus: "두려움 때문에 시작을 미루지 않도록 진입 장벽을 낮춘다.",
    action: "완벽하지 않은 초안, 기록, 생각 중 하나를 안전한 방식으로 공유하거나 저장한다.",
    check: "준비가 부족하다는 이유로 실행을 미루고 있지는 않은지 확인한다.",
  },
  guardedness: {
    focus: "닫힌 태도를 줄이고 안전한 방식으로 연결된다.",
    action: "신상을 드러내지 않고 공유할 수 있는 시행착오, 배운 점, 실행 기록 중 하나를 정한다.",
    check: "혼자 버티는 것이 실제로 나에게 도움이 되고 있는지 확인한다.",
  },
  habit: {
    focus: "의지가 아니라 반복 가능한 습관 시스템을 만든다.",
    action: "오늘 할 행동을 2분 안에 시작할 수 있게 줄이고, 언제/어디서 할지 정한다.",
    check: "행동을 시작하게 만드는 신호와 다시 복귀하는 규칙이 있는지 확인한다.",
  },
  org: {
    focus: "안전하고 조용한 조직 활동을 위한 태도를 갖춘다.",
    action: "이번 주에 공유할 수 있는 안전한 주제를 하나 정한다. 예: 실행 기록, 배운 점, 실패 후 복귀 경험.",
    check: "과시, 평가, 권유가 아니라 실행과 회복을 중심으로 공유하고 있는지 확인한다.",
  },
};

function formatSectionScore(result: ScoreResult, sectionId: SectionId): string {
  const resultAny = result as unknown as Record<string, unknown>;

  const possibleScoreSources = [
    resultAny.sectionScores,
    resultAny.scores,
    resultAny.sectionAverages,
    resultAny.sections,
  ];

  for (const source of possibleScoreSources) {
    if (!source || typeof source !== "object") continue;

    const value = (source as Record<string, unknown>)[sectionId];

    if (typeof value === "number") {
      return `${value.toFixed(1)} / 5`;
    }

    if (value && typeof value === "object") {
      const valueObj = value as Record<string, unknown>;

      if (typeof valueObj.score === "number") {
        return `${valueObj.score.toFixed(1)} / 5`;
      }

      if (typeof valueObj.average === "number") {
        return `${valueObj.average.toFixed(1)} / 5`;
      }

      if (typeof valueObj.value === "number") {
        return `${valueObj.value.toFixed(1)} / 5`;
      }
    }
  }

  return "점수 정보 없음";
}

function buildTwelveActionPlans(result: ScoreResult): string {
  return SECTION_ORDER.map((sectionId, index) => {
    const meta = SECTION_META[sectionId];
    const plan = SECTION_ACTION_PLANS[sectionId];
    const score = formatSectionScore(result, sectionId);

    const scoreGuide = meta.higherIsBetter
      ? "점수가 높을수록 현재 잘 작동하는 영역입니다."
      : "점수가 높을수록 현재 실행을 막는 장애물이 강한 영역입니다.";

    return `${index + 1}. ${meta.label}
- 현재 점수: ${score}
- 읽는 법: ${scoreGuide}
- 핵심 초점: ${plan.focus}
- 실행 행동: ${plan.action}
- 점검 질문: ${plan.check}`;
  }).join("\n\n");
}

export function buildCopyText(result: ScoreResult, plan: ActionPlan): string {
  const type = BEHAVIOR_TYPES[result.behaviorType];
  const topObstacle = OBSTACLES[result.topObstacle.id];

  return `
[Silent Success Society · 나의 전체 실행계획]

1. 나의 현재 유형
- 유형: ${type.name}
- 한 줄 설명: ${type.tagline}

2. 나의 실행 상태
- 가장 강한 축: ${THREE_M_LABEL[result.threeM.strongest]}
- 가장 약한 축: ${THREE_M_LABEL[result.threeM.weakest]}
- 주요 장애물: ${topObstacle.name}
- 작심삼일 위험도: ${result.riskLevel}

3. 나의 정체성 문장
${plan.identityStatement || "아직 작성 전"}

4. 오늘 바로 할 2분 행동
${plan.twoMinuteAction || "아직 작성 전"}

5. 7일 실행 과제
${type.sevenDayChallenge}

6. 이번 주 안전한 공유 주제
${plan.safeShareTopic || "아직 작성 전"}

7. 실패했을 때 복귀 규칙
- 하루 실패해도 전체를 실패로 보지 않는다.
- 다음 날 다시 2분 행동부터 재시작한다.
- 완벽함보다 복귀를 우선한다.

8. 기본 실행 원칙
- 작게 시작한다.
- 반복 가능하게 만든다.
- 보여주기보다 실제로 한다.
- 기록하고, 공유하고, 다시 이어간다.

9. 12개 영역별 실행계획

${buildTwelveActionPlans(result)}
`.trim();
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
