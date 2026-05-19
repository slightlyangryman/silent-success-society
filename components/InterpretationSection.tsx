"use client";

import { ScoreResult } from "@/lib/scoring";
import { BEHAVIOR_TYPES } from "@/data/resultTypes";
import { OBSTACLES } from "@/data/obstacles";

interface InterpretationSectionProps {
  result: ScoreResult;
  onBack: () => void;
  onActionPlan: () => void;
}

function Section({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-2">
        {label}
      </div>
      <h3 className="font-display text-2xl md:text-3xl text-[var(--ink)] mb-4 leading-snug">
        {title}
      </h3>
      <div className="text-[14px] leading-relaxed text-[var(--ink)]">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((t, i) => (
        <li key={i} className="flex gap-3">
          <span className="text-[var(--accent)] mt-1 leading-none">·</span>
          <span className="flex-1">{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function InterpretationSection({
  result,
  onBack,
  onActionPlan,
}: InterpretationSectionProps) {
  const type = BEHAVIOR_TYPES[result.behaviorType];
  const topObstacle = OBSTACLES[result.topObstacle.id];

  return (
    <div className="max-w-3xl mx-auto px-5 py-12 md:py-16">
      <button
        onClick={onBack}
        className="text-xs tracking-[0.18em] uppercase text-[var(--ink-muted)] hover:text-[var(--ink)] mb-8 transition-colors"
      >
        ← 결과 화면으로
      </button>

      <div className="mb-12">
        <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink-muted)] mb-3">
          Interpretation · {type.name}
        </div>
        <h1 className="font-display text-4xl md:text-5xl leading-tight text-[var(--ink)] mb-4">
          내 유형에 대한 해석
        </h1>
        <p className="text-base text-[var(--ink-muted)] leading-relaxed max-w-xl">
          이 해석은 낙인이 아닙니다. 지금 당신의 행동 패턴을 설명하고, 다음 행동을 찾는 데 쓰기 위한 안내입니다.
        </p>
      </div>

      <div className="border border-[var(--line)] bg-white rounded-md p-6 md:p-8 mb-10">
        <Section label="01 · Summary" title={`${type.name} · ${type.tagline}`}>
          <p>{type.summary}</p>
        </Section>

        <div className="border-t border-[var(--line)] -mx-6 md:-mx-8 my-2" />

        <Section label="02 · Strengths" title="이 유형의 강점">
          <BulletList items={type.strengths} />
        </Section>

        <div className="border-t border-[var(--line)] -mx-6 md:-mx-8 my-2" />

        <Section label="03 · Risks" title="자주 마주치는 위험">
          <BulletList items={type.risks} />
        </Section>

        <div className="border-t border-[var(--line)] -mx-6 md:-mx-8 my-2" />

        <Section label="04 · Misreadings" title="자주 하는 착각">
          <BulletList items={type.commonMisreadings} />
        </Section>

        <div className="border-t border-[var(--line)] -mx-6 md:-mx-8 my-2" />

        <Section label="05 · What You Need" title="지금 필요한 변화">
          <BulletList items={type.whatYouNeed} />
        </Section>

        <div className="border-t border-[var(--line)] -mx-6 md:-mx-8 my-2" />

        <Section label="06 · 2-Minute Actions" title="추천 2분 행동">
          <BulletList items={type.twoMinuteActions} />
          <p className="text-[12px] text-[var(--ink-muted)] mt-3 italic">
            가장 작은 행동부터 시작합니다. 2분도 어렵다면, 더 줄이세요.
          </p>
        </Section>

        <div className="border-t border-[var(--line)] -mx-6 md:-mx-8 my-2" />

        <Section label="07 · 7-Day Challenge" title="7일 과제">
          <p>{type.sevenDayChallenge}</p>
        </Section>

        <div className="border-t border-[var(--line)] -mx-6 md:-mx-8 my-2" />

        <Section label="08 · 30-Day Challenge" title="30일 과제">
          <p>{type.thirtyDayChallenge}</p>
        </Section>

        <div className="border-t border-[var(--line)] -mx-6 md:-mx-8 my-2" />

        <Section label="10 · In the Society" title="조직 안에서의 활동 태도">
          <p>{type.orgAttitude}</p>
        </Section>
      </div>

      {/* 장애물 처방 */}
      <div className="mb-10">
        <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink-muted)] mb-3">
          Obstacle Prescription · 주요 장애물 처방
        </div>
        <h2 className="font-display text-3xl md:text-4xl text-[var(--ink)] mb-6 leading-tight">
          {topObstacle.name}
        </h2>

        <div className="border border-[var(--line)] bg-white rounded-md p-6 md:p-8">
          <Section label="현재 상태" title="지금 어떤 모습인가">
            <p>{topObstacle.currentState}</p>
          </Section>

          <div className="border-t border-[var(--line)] -mx-6 md:-mx-8 my-2" />

          <Section label="자주 드는 생각" title="익숙한 내면의 문장들">
            <BulletList items={topObstacle.commonThoughts} />
          </Section>

          <div className="border-t border-[var(--line)] -mx-6 md:-mx-8 my-2" />

          <Section label="실행을 막는 방식" title="왜 행동이 멈추는가">
            <p>{topObstacle.howItBlocks}</p>
          </Section>

          <div className="border-t border-[var(--line)] -mx-6 md:-mx-8 my-2" />

          <Section label="처방" title="작게 시도해볼 것">
            <BulletList items={topObstacle.prescription} />
          </Section>

          <div className="border-t border-[var(--line)] -mx-6 md:-mx-8 my-2" />

          <Section label="2분 행동" title="오늘 바로 할 수 있는 한 가지">
            <p className="text-[var(--accent)] font-medium">{topObstacle.twoMinuteAction}</p>
          </Section>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onActionPlan}
          className="bg-[var(--ink)] text-white rounded-md py-3.5 px-6 text-sm font-medium tracking-wide hover:bg-black transition-colors flex-1"
        >
          이제 실행계획 작성하기 →
        </button>
        <button
          onClick={onBack}
          className="border border-[var(--line)] text-[var(--ink)] rounded-md py-3.5 px-6 text-sm font-medium hover:bg-[var(--line-soft)] transition-colors"
        >
          결과로 돌아가기
        </button>
      </div>
    </div>
  );
}
