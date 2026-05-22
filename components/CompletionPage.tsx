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
          실행계획으로 정리되었습니다
        </h1>

        <p className="text-[15px] text-[var(--ink-muted)] leading-relaxed max-w-xl">
          이 페이지가 ‘끝’이 아니라, 당신만의 조용한 실행의 시작입니다.
          아래 실행계획을 복사하거나 인쇄해서 노트, 일정표, 메모 앱 등
          잘 보이는 곳에 두세요.
        </p>
      </div>

      <article className="border border-[var(--ink)] bg-white rounded-md p-7 md:p-10 mb-8">
        <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink-muted)] mb-3">
          Silent Success Society · Action Plan
        </div>

        <h2 className="font-display text-4xl md:text-5xl text-[var(--ink)] leading-none mb-3">
          {type.name}
        </h2>

        <p className="text-[14px] text-[var(--ink-muted)] mb-7 italic">
          {type.tagline}
        </p>

        <section className="border-t border-[var(--line)] pt-6 mb-7">
          <h3 className="text-[11px] tracking-[0.22em] uppercase text-[var(--ink-muted)] mb-4">
            1. 현재 실행 상태
          </h3>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-[14px]">
            <div>
              <dt className="text-[10px] tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-1">
                가장 강한 축
              </dt>
              <dd className="text-[var(--ink)]">
                {THREE_M_LABEL[result.threeM.strongest]}
              </dd>
            </div>

            <div>
              <dt className="text-[10px] tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-1">
                가장 약한 축
              </dt>
              <dd className="text-[var(--ink)]">
                {THREE_M_LABEL[result.threeM.weakest]}
              </dd>
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
              <dd className="text-[var(--accent)] font-medium">
                {result.riskLevel}
              </dd>
            </div>
          </dl>
        </section>

        <section className="border-t border-[var(--line)] pt-6 space-y-6 text-[14px]">
          <div>
            <div className="text-[11px] tracking-[0.22em] uppercase text-[var(--ink-muted)] mb-2">
              2. 나의 정체성 문장
            </div>
            <p className="text-[var(--ink)] leading-relaxed">
              {plan.identityStatement || (
                <span className="text-[var(--ink-soft)] italic">
                  아직 작성 전
                </span>
              )}
            </p>
          </div>

          <div>
            <div className="text-[11px] tracking-[0.22em] uppercase text-[var(--ink-muted)] mb-2">
              3. 오늘 바로 할 2분 행동
            </div>
            <p className="text-[var(--accent)] leading-relaxed">
              {plan.twoMinuteAction || (
                <span className="text-[var(--ink-soft)] italic">
                  아직 작성 전
                </span>
              )}
            </p>
          </div>

          <div>
            <div className="text-[11px] tracking-[0.22em] uppercase text-[var(--ink-muted)] mb-2">
              4. 7일 실행 과제
            </div>
            <p className="text-[var(--ink)] leading-relaxed">
              {type.sevenDayChallenge}
            </p>
          </div>

          <div>
            <div className="text-[11px] tracking-[0.22em] uppercase text-[var(--ink-muted)] mb-2">
              5. 이번 주 안전한 공유 주제
            </div>
            <p className="text-[var(--ink)] leading-relaxed">
              {plan.safeShareTopic || (
                <span className="text-[var(--ink-soft)] italic">
                  아직 작성 전
                </span>
              )}
            </p>
          </div>

          <div>
            <div className="text-[11px] tracking-[0.22em] uppercase text-[var(--ink-muted)] mb-2">
              6. 실패했을 때 복귀 규칙
            </div>
            <ul className="list-disc pl-5 space-y-1.5 text-[var(--ink)] leading-relaxed">
              <li>하루 실패해도 전체를 실패로 보지 않습니다.</li>
              <li>다음 날 다시 2분 행동부터 재시작합니다.</li>
              <li>완벽함보다 복귀를 우선합니다.</li>
            </ul>
          </div>

          <div>
            <div className="text-[11px] tracking-[0.22em] uppercase text-[var(--ink-muted)] mb-2">
              7. 실행 원칙
            </div>
            <ul className="list-disc pl-5 space-y-1.5 text-[var(--ink)] leading-relaxed">
              <li>작게 시작합니다.</li>
              <li>반복 가능하게 만듭니다.</li>
              <li>보여주기보다 실제로 합니다.</li>
              <li>기록하고, 공유하고, 다시 이어갑니다.</li>
            </ul>
          </div>
        </section>

        <div className="border-t border-[var(--line)] mt-7 pt-5 text-[11px] text-[var(--ink-soft)] italic">
          작은 행동을 반복할 수 있는 사람이 결국 멀리 갑니다.
        </div>
      </article>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 no-print">
        <button
          onClick={handleCopy}
          className="bg-[var(--ink)] text-white rounded-md py-3.5 px-6 text-sm font-medium tracking-wide hover:bg-black transition-colors"
        >
          {copied ? "✓ 복사되었습니다" : "실행계획 복사하기"}
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
