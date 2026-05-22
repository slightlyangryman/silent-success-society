"use client";

import { useState } from "react";
import { ScoreResult, THREE_M_LABEL } from "@/lib/scoring";
import { BEHAVIOR_TYPES } from "@/data/resultTypes";
import { OBSTACLES } from "@/data/obstacles";
import { SECTION_META, SECTION_ORDER, SectionId } from "@/data/questions";
import { ActionPlan } from "@/lib/storage";
import { buildCopyText, copyToClipboard } from "@/lib/copy";

interface CompletionPageProps {
  result: ScoreResult;
  plan: ActionPlan;
  onRestart: () => void;
  onHome: () => void;
  onEditPlan: () => void;
}

const SECTION_ACTION_PLANS: Record<
  SectionId,
  {
    focus: string;
    action: string;
    check: string;
  }
> = {
  mapping: {
    focus: "방향, 우선순위, 이번 달의 핵심 전투를 정리합니다.",
    action:
      "이번 달 가장 중요한 목표를 한 문장으로 적고, 하지 않을 일 1가지를 같이 정합니다.",
    check:
      "내가 시간을 쓰는 일이 내가 중요하게 여기는 방향과 연결되어 있는지 확인합니다.",
  },
  making: {
    focus: "생각을 실제 결과물로 바꾸는 실행력을 만듭니다.",
    action:
      "오늘 바로 할 수 있는 2분 행동을 정하고, 작더라도 결과물을 하나 남깁니다.",
    check: "이번 주에 완성한 작은 결과물이 있는지 확인합니다.",
  },
  meshing: {
    focus: "학습, 피드백, 새로운 경험을 통해 성장의 폭을 넓힙니다.",
    action:
      "이번 주에 배울 것 1가지와 피드백 받을 사람 또는 자료 1개를 정합니다.",
    check:
      "새로 배운 내용을 내 목표나 실행 방식과 연결했는지 확인합니다.",
  },
  aimlessness: {
    focus: "목적 상실을 줄이고 방향을 다시 잡습니다.",
    action:
      "지금 가장 중요한 전투를 하나만 고르고, 그 이유를 짧게 적습니다.",
    check:
      "바쁘게 움직이는 것보다 중요한 방향으로 움직이고 있는지 확인합니다.",
  },
  boredom: {
    focus: "지루함과 무기력을 줄이고 호기심을 되살립니다.",
    action:
      "요즘 궁금한 질문 1개를 정하고, 20분 동안 찾아보거나 기록합니다.",
    check: "즉각적인 재미만 소비하고 있지는 않은지 확인합니다.",
  },
  comfort: {
    focus: "안락함에 머무르지 않고 작은 불편을 감수합니다.",
    action:
      "미루고 있는 일 중 가장 작은 단위 하나를 오늘 2분만 실행합니다.",
    check: "편한 선택이 나를 정체시키고 있는지 확인합니다.",
  },
  delusion: {
    focus: "생각, 계획, 착각이 아니라 실제 행동과 결과를 기준으로 봅니다.",
    action:
      "내가 하고 있다고 생각하는 일 중 실제 결과물이 없는 것을 하나 고르고, 작은 산출물로 바꿉니다.",
    check: "노력했다는 느낌과 실제 남은 결과물을 구분합니다.",
  },
  ego: {
    focus: "자존심보다 배움과 개선을 우선합니다.",
    action:
      "내가 방어적으로 반응했던 피드백이나 상황을 하나 적고, 배울 점을 다시 정리합니다.",
    check:
      "내가 어떻게 보이는지보다 실제로 제공한 가치가 있는지 확인합니다.",
  },
  fear: {
    focus: "두려움 때문에 시작을 미루지 않도록 진입 장벽을 낮춥니다.",
    action:
      "완벽하지 않은 초안, 기록, 생각 중 하나를 안전한 방식으로 공유하거나 저장합니다.",
    check:
      "준비가 부족하다는 이유로 실행을 미루고 있지는 않은지 확인합니다.",
  },
  guardedness: {
    focus: "닫힌 태도를 줄이고 안전한 방식으로 연결됩니다.",
    action:
      "신상을 드러내지 않고 공유할 수 있는 시행착오, 배운 점, 실행 기록 중 하나를 정합니다.",
    check:
      "혼자 버티는 것이 실제로 나에게 도움이 되고 있는지 확인합니다.",
  },
  habit: {
    focus: "의지가 아니라 반복 가능한 습관 시스템을 만듭니다.",
    action:
      "오늘 할 행동을 2분 안에 시작할 수 있게 줄이고, 언제/어디서 할지 정합니다.",
    check:
      "행동을 시작하게 만드는 신호와 다시 복귀하는 규칙이 있는지 확인합니다.",
  },
  org: {
    focus: "안전하고 조용한 조직 활동을 위한 태도를 갖춥니다.",
    action:
      "이번 주에 공유할 수 있는 안전한 주제를 하나 정합니다. 예: 실행 기록, 배운 점, 실패 후 복귀 경험.",
    check:
      "과시, 평가, 권유가 아니라 실행과 회복을 중심으로 공유하고 있는지 확인합니다.",
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

function SectionLabel({
  children,
  eyebrow,
}: {
  children: React.ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className="mb-5">
      {eyebrow && (
        <div className="text-[10px] tracking-[0.24em] uppercase text-[var(--ink-muted)] mb-2">
          {eyebrow}
        </div>
      )}
      <h3 className="text-[17px] md:text-[18px] font-medium text-[var(--ink)] leading-snug">
        {children}
      </h3>
    </div>
  );
}

function InfoBlock({
  label,
  children,
  accent = false,
}: {
  label: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-1.5">
        {label}
      </div>
      <div
        className={`text-[14px] leading-relaxed ${
          accent ? "text-[var(--accent)] font-medium" : "text-[var(--ink)]"
        }`}
      >
        {children}
      </div>
    </div>
  );
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
    <div className="max-w-4xl mx-auto px-5 py-12 md:py-16">
      <header className="mb-12">
        <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink-muted)] mb-3">
          Completed
        </div>

        <h1 className="font-display text-4xl md:text-5xl leading-tight text-[var(--ink)] mb-4">
          오늘의 출발 지점이
          <br />
          전체 실행계획으로 정리되었습니다
        </h1>

        <p className="text-[15px] text-[var(--ink-muted)] leading-relaxed max-w-2xl">
          이 페이지는 단순 요약이 아니라, 현재 진단 결과를 바탕으로 한 전체 실행계획입니다.
          아래 내용을 복사하거나 인쇄해서 노트, 일정표, 메모 앱 등 잘 보이는 곳에 두세요.
        </p>
      </header>

      <article className="border border-[var(--ink)] bg-white rounded-lg p-7 md:p-10 mb-8">
        <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink-muted)] mb-3">
          Silent Success Society · Full Action Plan
        </div>

        <div className="mb-8">
          <h2 className="font-display text-4xl md:text-5xl text-[var(--ink)] leading-none mb-3">
            {type.name}
          </h2>
          <p className="text-[15px] text-[var(--ink-muted)] leading-relaxed italic">
            {type.tagline}
          </p>
        </div>

        <section className="border-t border-[var(--line)] pt-7 mb-8">
          <SectionLabel eyebrow="01 · Current State">현재 실행 상태</SectionLabel>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            <InfoBlock label="가장 강한 축">
              {THREE_M_LABEL[result.threeM.strongest]}
            </InfoBlock>

            <InfoBlock label="가장 약한 축">
              {THREE_M_LABEL[result.threeM.weakest]}
            </InfoBlock>

            <InfoBlock label="주요 장애물">{topObstacle.name}</InfoBlock>

            <InfoBlock label="작심삼일 위험도" accent>
              {result.riskLevel}
            </InfoBlock>
          </dl>
        </section>

        <section className="border-t border-[var(--line)] pt-7 mb-8">
          <SectionLabel eyebrow="02 · Personal Plan">내가 직접 작성한 실행계획</SectionLabel>

          <div className="grid grid-cols-1 gap-5">
            <InfoBlock label="나의 활동 정의">
              {plan.activityDefinition || (
                <span className="text-[var(--ink-soft)] italic">아직 작성 전</span>
              )}
            </InfoBlock>

            <InfoBlock label="내가 제거할 것">
              {plan.toRemove || (
                <span className="text-[var(--ink-soft)] italic">아직 작성 전</span>
              )}
            </InfoBlock>

            <InfoBlock label="나의 정체성 문장">
              {plan.identityStatement || (
                <span className="text-[var(--ink-soft)] italic">아직 작성 전</span>
              )}
            </InfoBlock>

            <InfoBlock label="오늘 바로 할 2분 행동" accent>
              {plan.twoMinuteAction || (
                <span className="text-[var(--ink-soft)] italic">아직 작성 전</span>
              )}
            </InfoBlock>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InfoBlock label="습관 신호">
                {plan.habitCue || (
                  <span className="text-[var(--ink-soft)] italic">아직 작성 전</span>
                )}
              </InfoBlock>

              <InfoBlock label="행동 후 보상">
                {plan.reward || (
                  <span className="text-[var(--ink-soft)] italic">아직 작성 전</span>
                )}
              </InfoBlock>
            </div>

            <InfoBlock label="예상되는 방해 요인">
              {plan.obstacle || (
                <span className="text-[var(--ink-soft)] italic">아직 작성 전</span>
              )}
            </InfoBlock>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <InfoBlock label="Step · 가장 작은 시작">
                {plan.step || (
                  <span className="text-[var(--ink-soft)] italic">아직 작성 전</span>
                )}
              </InfoBlock>

              <InfoBlock label="Sprint · 집중 단위">
                {plan.sprint || (
                  <span className="text-[var(--ink-soft)] italic">아직 작성 전</span>
                )}
              </InfoBlock>

              <InfoBlock label="Stretch · 도전 목표">
                {plan.stretch || (
                  <span className="text-[var(--ink-soft)] italic">아직 작성 전</span>
                )}
              </InfoBlock>
            </div>

            <InfoBlock label="이번 주 안전한 공유 주제">
              {plan.safeShareTopic || (
                <span className="text-[var(--ink-soft)] italic">아직 작성 전</span>
              )}
            </InfoBlock>

            <InfoBlock label="내가 제공할 수 있는 가치">
              {plan.valueIOffer || (
                <span className="text-[var(--ink-soft)] italic">아직 작성 전</span>
              )}
            </InfoBlock>
          </div>
        </section>

        <section className="border-t border-[var(--line)] pt-7 mb-8">
          <SectionLabel eyebrow="03 · Core Challenge">유형 기반 핵심 과제</SectionLabel>

          <div className="rounded-md border border-[var(--line)] p-5 bg-[var(--bg)]">
            <InfoBlock label="7일 실행 과제" accent>
              {type.sevenDayChallenge}
            </InfoBlock>
          </div>
        </section>

        <section className="border-t border-[var(--line)] pt-7 mb-8">
          <SectionLabel eyebrow="04 · Recovery Rule">실패했을 때 복귀 규칙</SectionLabel>

          <ul className="list-disc pl-5 space-y-2 text-[14px] text-[var(--ink)] leading-relaxed">
            <li>하루 실패해도 전체를 실패로 보지 않습니다.</li>
            <li>다음 날 다시 2분 행동부터 재시작합니다.</li>
            <li>완벽함보다 복귀를 우선합니다.</li>
            <li>실패 원인을 의지 문제가 아니라 시스템 문제로 점검합니다.</li>
          </ul>
        </section>

        <section className="border-t border-[var(--line)] pt-7">
          <SectionLabel eyebrow="05 · 12 Area Plan">
            12개 영역별 실행계획
          </SectionLabel>

          <div className="space-y-4">
            {SECTION_ORDER.map((sectionId, index) => {
              const meta = SECTION_META[sectionId];
              const actionPlan = SECTION_ACTION_PLANS[sectionId];
              const score = formatSectionScore(result, sectionId);
              const scoreGuide = meta.higherIsBetter
                ? "높을수록 잘 작동하는 영역"
                : "높을수록 강하게 작동하는 장애물";

              return (
                <div
                  key={sectionId}
                  className="border border-[var(--line)] rounded-lg p-5 bg-[var(--bg)]"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-[10px] font-mono text-[var(--ink-soft)] tracking-wider mt-1">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="flex-1">
                      <h4 className="text-[15px] md:text-[16px] font-medium text-[var(--ink)] leading-snug">
                        {meta.label}
                      </h4>
                      <p className="text-[11px] text-[var(--ink-soft)] mt-1 leading-relaxed">
                        현재 점수: {score} · {scoreGuide}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 text-[14px] leading-relaxed">
                    <InfoBlock label="핵심 초점">
                      {actionPlan.focus}
                    </InfoBlock>

                    <InfoBlock label="실행 행동" accent>
                      {actionPlan.action}
                    </InfoBlock>

                    <InfoBlock label="점검 질문">
                      {actionPlan.check}
                    </InfoBlock>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="border-t border-[var(--line)] mt-8 pt-5 text-[12px] text-[var(--ink-soft)] italic leading-relaxed">
          작은 행동을 반복할 수 있는 사람이 결국 멀리 갑니다.
        </div>
      </article>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 no-print">
        <button
          onClick={handleCopy}
          className="bg-[var(--ink)] text-white rounded-md py-3.5 px-6 text-sm font-medium tracking-wide hover:bg-black transition-colors"
        >
          {copied ? "✓ 복사되었습니다" : "전체 실행계획 복사하기"}
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
