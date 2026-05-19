// lib/copy.ts
// 결과 복사 템플릿 생성

import { ScoreResult, THREE_M_LABEL } from "./scoring";
import { BEHAVIOR_TYPES } from "@/data/resultTypes";
import { OBSTACLES } from "@/data/obstacles";
import { ActionPlan } from "./storage";

export function buildCopyText(result: ScoreResult, plan: ActionPlan): string {
  const type = BEHAVIOR_TYPES[result.behaviorType];
  const topObstacle = OBSTACLES[result.topObstacle.id];

  const lines = [
    "[Silent Success Society 자기진단 결과]",
    "",
    `나의 유형: ${type.name}`,
    `한 줄 요약: ${type.tagline}`,
    "",
    `가장 강한 축: ${THREE_M_LABEL[result.threeM.strongest]}`,
    `가장 약한 축: ${THREE_M_LABEL[result.threeM.weakest]}`,
    `주요 장애물: ${topObstacle.name}`,
    `작심삼일 위험도: ${result.riskLevel}`,
    "",
    `나의 정체성 문장: ${plan.identityStatement || "(아직 작성 전)"}`,
    `오늘의 2분 행동: ${plan.twoMinuteAction || "(아직 작성 전)"}`,
    `7일 과제: ${type.sevenDayChallenge}`,
    `이번 주 안전한 공유 주제: ${plan.safeShareTopic || "(아직 작성 전)"}`,
  ];

  return lines.join("\n");
}

export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator === "undefined") return false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // fallback
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}
