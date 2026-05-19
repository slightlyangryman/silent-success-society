"use client";

import { ScoreResult, THREE_M_LABEL } from "@/lib/scoring";
import { BEHAVIOR_TYPES } from "@/data/resultTypes";
import { OBSTACLES, OBSTACLE_ORDER } from "@/data/obstacles";

interface ResultPageProps {
  result: ScoreResult;
  onInterpretation: () => void;
  onActionPlan: () => void;
  onRestart: () => void;
}

function ScoreBar({
  label,
  score,
  invert = false,
  accent = false,
}: {
  label: string;
  score: number;
  invert?: boolean;
  accent?: boolean;
}) {
  const pct = Math.min(100, Math.max(0, (score / 5) * 100));
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-[13px] text-[var(--ink)]">{label}</span>
        <span className="text-[12px] font-mono text-[var(--ink-muted)]">
          {score.toFixed(2)}
        </span>
      </div>
      <div className="h-1.5 bg-[var(--line)] rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-700 ${
            accent
              ? "bg-[var(--accent)]"
              : invert
              ? "bg-[var(--ink-muted)]"
              : "bg-[var(--ink)]"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {invert && (
        <p className="text-[10px] text-[var(--ink-soft)] mt-1">
          점수가 높을수록 장애물이 강하게 작동하고 있음을 의미합니다.
        </p>
      )}
    </div>
  );
}

export default function ResultPage({
  result,
  onInterpretation,
  onActionPlan,
  onRestart,
}: ResultPageProps) {
  const type = BEHAVIOR_TYPES[result.behaviorType];
  const topObstacle = OBSTACLES[result.topObstacle.id];

  return (
    <div className="max-w-3xl mx-auto px-5 py-12 md:py-16">
      <div className="mb-10">
        <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink-muted)] mb-3">
          Diagnostic Result
        </div>
        <h1 className="font-display text-4xl md:text-5xl leading-tight text-[var(--ink)] mb-4">
          나의 현재 상태
        </h1>
        <p className="text-[15px] text-[var(--ink-muted)] leading-relaxed">
          이 결과는 당신을 평가하지 않습니다. 지금 당신이 어디에 서 있는지를 보여주는 지도일 뿐입니다.
        </p>
      </div>

      {/* 핵심 결과 카드 */}
      <div className="border border-[var(--ink)] bg-[var(--ink)] text-white rounded-lg p-7 md:p-9 mb-6 noise-overlay">
        <div className="text-[10px] tracking-[0.32em] uppercase text-white/45 mb-3">
          Your Type
        </div>
        <h2 className="font-display text-5xl md:text-6xl leading-none mb-3">
          {type.name}
        </h2>
        <p className="text-[15px] text-white/75 mb-7 leading-relaxed max-w-xl">
          {type.tagline}
        </p>
        <p className="text-[14px] text-white/85 leading-relaxed border-t border-white/10 pt-5">
          {type.summary}
        </p>

        <div className="grid grid-cols-2 gap-4 mt-7 pt-6 border-t border-white/10">
          <div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1.5">
              가장 강한 축
            </div>
            <div className="text-[15px] text-white">
              {THREE_M_LABEL[result.threeM.strongest]}
            </div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1.5">
              가장 약한 축
            </div>
            <div className="text-[15px] text-white">
              {THREE_M_LABEL[result.threeM.weakest]}
            </div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1.5">
              주요 장애물
            </div>
            <div className="text-[15px] text-white">{topObstacle.shortLabel}</div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1.5">
              작심삼일 위험도
            </div>
            <div className="text-[15px] text-[var(--accent-soft)]">
              {result.riskLevel}
            </div>
          </div>
        </div>
      </div>

      {/* 위험도 메시지 */}
      <div className="border border-[var(--accent-soft)] bg-[var(--accent-bg)] rounded-md p-5 mb-10">
        <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--accent)] mb-2">
          Risk Reading · 작심삼일 위험도 해석
        </div>
        <p className="text-[14px] text-[var(--ink)] leading-relaxed">{result.riskMessage}</p>
        <p className="text-[13px] text-[var(--ink)] mt-3 pt-3 border-t border-[var(--accent-soft)]/40">
          <span className="text-[var(--accent)] font-medium">추천 2분 행동 · </span>
          {type.twoMinuteActions[0]}
        </p>
      </div>

      {/* 3M 점수 */}
      <section className="mb-8">
        <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-4">
          Three Axes · 방향 · 실행 · 성장
        </div>
        <div className="border border-[var(--line)] bg-white rounded-md p-5 md:p-6">
          <ScoreBar
            label="Mapping · 설계 (방향성)"
            score={result.threeM.mapping}
            accent={result.threeM.strongest === "mapping"}
          />
          <ScoreBar
            label="Making · 실행 (결과물)"
            score={result.threeM.making}
            accent={result.threeM.strongest === "making"}
          />
          <ScoreBar
            label="Meshing · 성장 (학습 · 연결)"
            score={result.threeM.meshing}
            accent={result.threeM.strongest === "meshing"}
          />
        </div>
      </section>

      {/* 시스템 점수 */}
      <section className="mb-8">
        <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-4">
          System Readiness · 시스템 점수
        </div>
        <div className="border border-[var(--line)] bg-white rounded-md p-5 md:p-6">
          <ScoreBar label="습관 시스템" score={result.habitScore} />
          <ScoreBar label="조직 활동 준비도" score={result.orgScore} />
        </div>
      </section>

      {/* 장애물 점수 */}
      <section className="mb-12">
        <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-4">
          Obstacle Map · 장애물별 점수
        </div>
        <div className="border border-[var(--line)] bg-white rounded-md p-5 md:p-6">
          {OBSTACLE_ORDER.map((id, idx) => (
            <ScoreBar
              key={id}
              label={OBSTACLES[id].name}
              score={result.obstacleScores[id]}
              invert
              accent={id === result.topObstacle.id}
            />
          ))}
          <p className="text-[12px] text-[var(--ink-soft)] mt-4 pt-3 border-t border-[var(--line-soft)] leading-relaxed">
            장애물 점수는 ‘나쁜 사람’의 표시가 아니라 ‘지금 작동하고 있는 패턴’의 강도를 보여줍니다.
          </p>
        </div>
      </section>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <button
          onClick={onInterpretation}
          className="border border-[var(--ink)] text-[var(--ink)] rounded-md py-3.5 px-6 text-sm font-medium hover:bg-[var(--ink)] hover:text-white transition-colors flex-1"
        >
          내 결과 해석 자세히 보기
        </button>
        <button
          onClick={onActionPlan}
          className="bg-[var(--ink)] text-white rounded-md py-3.5 px-6 text-sm font-medium tracking-wide hover:bg-black transition-colors flex-1"
        >
          실행계획 만들기 →
        </button>
      </div>

      <button
        onClick={onRestart}
        className="text-xs text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
      >
        다시 진단하기 (현재 답변 삭제)
      </button>
    </div>
  );
}
