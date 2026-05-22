// lib/copy.ts
// 결과 복사 템플릿 생성

import { ScoreResult, THREE_M_LABEL } from "@/lib/scoring";
import { BEHAVIOR_TYPES } from "@/data/resultTypes";
import { OBSTACLES } from "@/data/obstacles";
import { ActionPlan } from "@/lib/storage";

export function buildCopyText(result: ScoreResult, plan: ActionPlan): string {
  const type = BEHAVIOR_TYPES[result.behaviorType];
  const topObstacle = OBSTACLES[result.topObstacle.id];

  return `
[Silent Success Society · 나의 실행계획]

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
하루 실패해도 전체를 실패로 보지 않는다.
다음 날 다시 2분 행동부터 재시작한다.

8. 실행 원칙
작게 시작한다.
반복 가능하게 만든다.
보여주기보다 실제로 한다.
완벽함보다 복귀를 우선한다.
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
