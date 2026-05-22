"use client";

import { useState, type ReactNode } from "react";
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

interface PlanItem {
  key: keyof ActionPlan;
  no: string;
  title: string;
  guide: string;
  emphasis?: boolean;
}

const PLAN_ITEMS: PlanItem[] = [
  {
    key: "activityDefinition",
    no: "01",
    title: "나의 활동 정의",
    guide: "앞으로 한 달 동안 어떤 방향으로 움직일 것인가?",
  },
  {
    key: "toRemove",
    no: "02",
    title: "내가 제거할 것",
    guide: "이 한 달 동안 의식적으로 줄이거나 멈출 일.",
  },
  {
    key: "identityStatement",
    no: "03",
    title: "나의 정체성 문장",
    guide: "나는 어떤 사람이 되어가고 있는가?",
    emphasis: true,
  },
  {
    key: "twoMinuteAction",
    no: "04",
    title: "오늘의 2분 행동",
    guide: "오늘 반드시 성공할 수 있는 단 하나의 행동.",
    emphasis: true,
  },
  {
    key: "habitCue",
    no: "05",
    title: "습관 신호",
    guide: "행동을 시작하게 만드는 명확한 신호.",
  },
  {
    key: "reward",
    no: "06",
    title: "행동 후 보상",
    guide: "행동을 마쳤을 때 자신에게 주는 작은 완료 신호.",
  },
  {
    key: "obstacle",
    no: "07",
    title: "예상되는 방해 요인",
    guide: "이 행동을 무너뜨릴 가능성이 가장 큰 한 가지.",
  },
  {
    key: "step",
    no: "08",
    title: "Step · 가장 작은 시작",
    guide: "절대 실패하지 않을 수준의 가장 작은 행동.",
    emphasis: true,
  },
  {
    key: "sprint",
    no: "09",
    title: "Sprint · 집중 단위",
    guide: "한 번에 몰입할 수 있는 짧은 실행 단위.",
  },
  {
    key: "stretch",
    no: "10",
    title: "Stretch · 도전 목표",
    guide: "이번 주 안에 시도해볼 수 있는 작은 도전.",
  },
  {
    key: "safeShareTopic",
    no: "11",
    title: "조직 안에서 공유할 수 있는 안전한 주제",
    guide: "신상이 아니라 시행착오, 과정, 배운 점 중심.",
  },
  {
    key: "valueIOffer",
    no: "12",
    title: "내가 제공할 수 있는 가치",
    guide: "과시가 아니라 나의 시행착오로 다른 사람에게 도움될 수 있는 것.",
  },
];

function EmptyValue() {
  return <span className="text-[var(--ink-soft)] italic">아직 작성 전</span>;
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <div className="text-[10px] tracking-[0.26em] uppercase text-[var(--ink-muted)] mb-2">
        {eyebrow}
      </div>
      <h3 className="text-[18px] md:text-[20px] font-medium text-[var(--ink)] leading-snug">
        {title}
      </h3>
      {description && (
        <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed mt-2">
          {description}
        </p>
      )}
    </div>
  );
}

function ResultMetric({
  label,
  children,
  accent = false,
}: {
  label: string;
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="border border-[var(--line)] rounded-md p-4 bg-[var(--bg)]">
      <div className="text-[10px] tracking-[0.18em] uppercase text-[var(--ink-muted)] mb-1.5">
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

function TextBlock({
  label,
  children,
  accent = false,
}: {
  label: string;
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.18em] uppercase text-[var(--ink-muted)] mb-1.5">
        {label}
      </div>
      <div
        className={`text-[14px] leading-relaxed whitespace-pre-wrap ${
          accent ? "text-[var(--accent)] font-medium" : "text-[var(--ink)]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function PlanCard({
  item,
  value,
}: {
  item: PlanItem;
  value: string | undefined;
}) {
  const hasValue = value && value.trim().length > 0;

  return (
    <div
      className={`border rounded-lg p-5 bg-[var(--bg)] ${
        item.emphasis
          ? "border-[var(--accent-soft)]"
          : "border-[var(--line)]"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-8 h-8 rounded-full border border-[var(--line)] flex items-center justify-center text-[11px] font-mono text-[var(--ink-muted)] bg-white">
          {item.no}
        </div>

        <div className="flex-1 min-w-0">
          <div className="mb-3">
            <h4 className="text-[15px] md:text-[16px] font-medium text-[var(--ink)] leading-snug">
              {item.title}
            </h4>
            <p className="text-[12px] text-[var(--ink-muted)] leading-relaxed mt-1">
              {item.guide}
            </p>
          </div>

          <div
            className={`rounded-md border px-4 py-3 min-h-[48px] ${
              item.emphasis
                ? "border-[var(--accent-soft)] bg-[var(--accent-bg)]"
                : "border-[var(--line)] bg-white"
            }`}
          >
            <p
              className={`text-[14px] leading-relaxed whitespace-pre-wrap ${
                item.emphasis && hasValue
                  ? "text-[var(--accent)] font-medium"
                  : "text-[var(--ink)]"
              }`}
            >
              {hasValue ? value : <EmptyValue />}
            </p>
          </div>
        </div>
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
          나의 실행계획이
          <br />
          정리되었습니다
        </h1>

        <p className="text-[15px] text-[var(--ink-muted)] leading-relaxed max-w-2xl">
          아래 결과는 진단 요약과, 당신이 직접 작성한 12개 실행계획입니다.
          복사하거나 인쇄해서 노트, 일정표, 메모 앱 등 잘 보이는 곳에 두세요.
        </p>
      </header>

      <article className="border border-[var(--ink)] bg-white rounded-lg p-7 md:p-10 mb-8">
        <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink-muted)] mb-3">
          Silent Success Society · My Action Plan
        </div>

        <div className="mb-9">
          <h2 className="font-display text-4xl md:text-5xl text-[var(--ink)] leading-none mb-3">
            {type.name}
          </h2>
          <p className="text-[15px] text-[var(--ink-muted)] leading-relaxed italic">
            {type.tagline}
          </p>
        </div>

        <section className="border-t border-[var(--line)] pt-7 mb-9">
          <SectionHeader
            eyebrow="01 · Result Summary"
            title="진단 결과 요약"
            description="이 영역은 내가 어떤 성향으로 출발하는지 확인하기 위한 요약입니다."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <ResultMetric label="현재 유형">{type.name}</ResultMetric>
            <ResultMetric label="주요 장애물">{topObstacle.name}</ResultMetric>
            <ResultMetric label="가장 강한 축">
              {THREE_M_LABEL[result.threeM.strongest]}
            </ResultMetric>
            <ResultMetric label="가장 약한 축">
              {THREE_M_LABEL[result.threeM.weakest]}
            </ResultMetric>
            <ResultMetric label="작심삼일 위험도" accent>
              {result.riskLevel}
            </ResultMetric>
          </div>

          <div className="grid grid-cols-1 gap-5">
            <TextBlock label="성향 해석">{type.summary}</TextBlock>
            <TextBlock label="현재 가장 큰 방해 패턴">
              {topObstacle.currentState}
            </TextBlock>
          </div>
        </section>

        <section className="border-t border-[var(--line)] pt-7 mb-9">
          <SectionHeader
            eyebrow="02 · Written Action Plan"
            title="내가 직접 작성한 12개 실행계획"
            description="이 영역이 최종 결과의 핵심입니다. 아래 내용은 진단 추천 문구가 아니라, 실행계획 페이지에서 직접 입력한 값입니다."
          />

          <div className="space-y-4">
            {PLAN_ITEMS.map((item) => (
              <PlanCard
                key={item.key}
                item={item}
                value={plan[item.key]}
              />
            ))}
          </div>
        </section>

        <section className="border-t border-[var(--line)] pt-7 mb-9">
          <SectionHeader
            eyebrow="03 · Type-Based Challenge"
            title="유형 기반 7일 실행 과제"
            description="직접 작성한 계획을 실제로 굴리기 위한 첫 주 과제입니다."
          />

          <div className="rounded-lg border border-[var(--accent-soft)] bg-[var(--accent-bg)] p-5">
            <TextBlock label="7일 실행 과제" accent>
              {type.sevenDayChallenge}
            </TextBlock>
          </div>
        </section>

        <section className="border-t border-[var(--line)] pt-7">
          <SectionHeader
            eyebrow="04 · Recovery Rule"
            title="실패했을 때 복귀 규칙"
            description="실행계획은 완벽하게 지키는 것이 아니라, 끊겼을 때 다시 돌아오는 구조가 중요합니다."
          />

          <ul className="list-disc pl-5 space-y-2 text-[14px] text-[var(--ink)] leading-relaxed">
            <li>하루 실패해도 전체를 실패로 보지 않습니다.</li>
            <li>다음 날 다시 2분 행동부터 재시작합니다.</li>
            <li>완벽함보다 복귀를 우선합니다.</li>
            <li>실패 원인을 의지 문제가 아니라 시스템 문제로 점검합니다.</li>
          </ul>
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
          {copied ? "✓ 복사되었습니다" : "내 실행계획 복사하기"}
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
