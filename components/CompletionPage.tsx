"use client";

import { useState } from "react";
import { ScoreResult, THREE_M_LABEL } from "@/lib/scoring";
import { BEHAVIOR_TYPES } from "@/data/resultTypes";
import { OBSTACLES } from "@/data/obstacles";
import { ActionPlan } from "@/lib/storage";
import { buildCopyText, copyToClipboard } from "@/lib/copy";

interface CompletionPageProps {
  result: ScoreResult;
  plan: ActionPlan;
  onRestart: () => void;
  onHome: () => void;
  onEditPlan: () => void;
}

export default function CompletionPage({
  result,
  plan,
  onRestart,
  onHome,
  onEditPlan,
}: CompletionPageProps) {
  const [copied, setCopied] = useState(false);
  const type = BEHAVIOR_TYPES[result.behaviorType];
  const topObstacle = OBSTACLES[result.topObstacle.id];

  async function handleCopy() {
    const text = buildCopyText(result, plan);
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  }

  function handlePrint() {
    if (typeof window !== "undefined") window.print();
  }

  return (
    <div className="max-w-3xl mx-auto px-5 py-12 md:py-16">
      <div className="mb-12">
        <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink-muted)] mb-3">
          Completed
        </div>
        <h1 className="font-display text-4xl md:text-5xl leading-tight text-[var(--ink)] mb-4">
          오늘의 출발 지점이
          <br />
          정리되었습니다
        </h1>
        <p className="text-[15px] text-[var(--ink-muted)] leading-relaxed max-w-xl">
          이 페이지가 ‘끝’이 아니라, 당신만의 조용한 실행의 시작입니다. 아래 요약을 복사하거나 인쇄해서
          노트, 일정표, 메모 앱 등 잘 보이는 곳에 두세요.
        </p>
      </div>

      {/* 요약 카드 - 인쇄 시 깔끔하게 보임 */}
      <article className="border border-[var(--ink)] bg-white rounded-md p-7 md:p-10 mb-8">
        <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink-muted)] mb-3">
          Silent Success Society · Initiation Summary
        </div>
        <h2 className="font-display text-4xl md:text-5xl text-[var(--ink)] leading-none mb-3">
          {type.name}
        </h2>
        <p className="text-[14px] text-[var(--ink-muted)] mb-7 italic">{type.tagline}</p>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-[14px] border-t border-[var(--line)] pt-6">
          <div>
            <dt className="text-[10px] tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-1">
              가장 강한 축
            </dt>
            <dd className="text-[var(--ink)]">{THREE_M_LABEL[result.threeM.strongest]}</dd>
          </div>
          <div>
            <dt className="text-[10px] tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-1">
              가장 약한 축
            </dt>
            <dd className="text-[var(--ink)]">{THREE_M_LABEL[result.threeM.weakest]}</dd>
          </div>
          <div>
            <dt className="text-[10px] tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-1">
              주요 장애물
            </dt>
            <dd className="text-[var(--ink)]">{topObstacle.name}</dd>
          </div>
          <div>
            <dt className="text-[10px] tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-1">
              작심삼일 위험도
            </dt>
            <dd className="text-[var(--accent)] font-medium">{result.riskLevel}</dd>
          </div>
        </dl>

        <div className="border-t border-[var(--line)] mt-7 pt-6 space-y-5 text-[14px]">
          <div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-1.5">
              나의 정체성 문장
            </div>
            <p className="text-[var(--ink)] leading-relaxed">
              {plan.identityStatement || (
                <span className="text-[var(--ink-soft)] italic">아직 작성 전</span>
              )}
            </p>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-1.5">
              오늘의 2분 행동
            </div>
            <p className="text-[var(--accent)] leading-relaxed">
              {plan.twoMinuteAction || (
                <span className="text-[var(--ink-soft)] italic">아직 작성 전</span>
              )}
            </p>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-1.5">
              7일 과제
            </div>
            <p className="text-[var(--ink)] leading-relaxed">{type.sevenDayChallenge}</p>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-1.5">
              이번 주 안전한 공유 주제
            </div>
            <p className="text-[var(--ink)] leading-relaxed">
              {plan.safeShareTopic || (
                <span className="text-[var(--ink-soft)] italic">아직 작성 전</span>
              )}
            </p>
          </div>
        </div>

        <div className="border-t border-[var(--line)] mt-7 pt-5 text-[11px] text-[var(--ink-soft)] italic">
          작은 행동을 반복할 수 있는 사람이 결국 멀리 갑니다.
        </div>
      </article>

      {/* 액션 버튼 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 no-print">
        <button
          onClick={handleCopy}
          className="bg-[var(--ink)] text-white rounded-md py-3.5 px-6 text-sm font-medium tracking-wide hover:bg-black transition-colors"
        >
          {copied ? "✓ 복사되었습니다" : "요약 복사하기"}
        </button>
        <button
          onClick={handlePrint}
          className="border border-[var(--ink)] text-[var(--ink)] rounded-md py-3.5 px-6 text-sm font-medium hover:bg-[var(--ink)] hover:text-white transition-colors"
        >
          인쇄 · PDF 저장
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 no-print">
        <button
          onClick={onEditPlan}
          className="border border-[var(--line)] text-[var(--ink-muted)] rounded-md py-3 px-4 text-xs hover:bg-[var(--line-soft)] transition-colors"
        >
          실행계획 다시 작성
        </button>
        <button
          onClick={onHome}
          className="border border-[var(--line)] text-[var(--ink-muted)] rounded-md py-3 px-4 text-xs hover:bg-[var(--line-soft)] transition-colors"
        >
          처음으로 돌아가기
        </button>
        <button
          onClick={onRestart}
          className="border border-[var(--line)] text-[var(--ink-muted)] rounded-md py-3 px-4 text-xs hover:bg-[var(--line-soft)] transition-colors"
        >
          전체 다시 시작 (삭제)
        </button>
      </div>

      <p className="text-[11px] text-[var(--ink-soft)] text-center mt-6 leading-relaxed">
        인쇄 · PDF 저장은 브라우저의 인쇄 대화상자를 통해 저장됩니다.
        <br />
        Mac/PC: ⌘P · Ctrl+P · 모바일: 공유 → 인쇄 → PDF 저장.
      </p>
    </div>
  );
}
