"use client";

import { useState, useEffect } from "react";
import { ActionPlan } from "@/lib/storage";
import { ScoreResult } from "@/lib/scoring";
import { BEHAVIOR_TYPES } from "@/data/resultTypes";
import { OBSTACLES } from "@/data/obstacles";

interface ActionPlanPageProps {
  plan: ActionPlan;
  result: ScoreResult;
  onPlanChange: (next: ActionPlan) => void;
  onBack: () => void;
  onComplete: () => void;
}

interface FieldDef {
  key: keyof ActionPlan;
  label: string;
  sublabel: string;
  placeholder: string;
  rows?: number;
}

const FIELDS: FieldDef[] = [
  {
    key: "activityDefinition",
    label: "01 · 나의 활동 정의",
    sublabel: "앞으로 한 달 동안 어떤 방향으로 움직일 것인가?",
    placeholder:
      "예: 나는 앞으로 30일 동안 글쓰기와 운동을 통해 나의 실행력을 회복한다.",
    rows: 3,
  },
  {
    key: "toRemove",
    label: "02 · 내가 제거할 것",
    sublabel: "이 한 달 동안 의식적으로 줄이거나 멈출 일.",
    placeholder: "예: 잠들기 전 의미 없는 숏폼 시청",
  },
  {
    key: "identityStatement",
    label: "03 · 나의 정체성 문장",
    sublabel: "어떤 사람이 되어가고 있는가? 결과보다 정체성에서 출발합니다.",
    placeholder: "예: 나는 매일 작은 결과물을 만드는 사람이다.",
  },
  {
    key: "twoMinuteAction",
    label: "04 · 오늘의 2분 행동",
    sublabel: "오늘 반드시 성공할 수 있는 단 하나의 행동.",
    placeholder: "예: 오늘 배운 것 한 줄 기록하기",
  },
  {
    key: "habitCue",
    label: "05 · 습관 신호 (Cue)",
    sublabel: "행동을 시작하게 만드는 명확한 신호.",
    placeholder: "예: 저녁 식사 후 책상에 앉으면 바로 노트를 연다.",
  },
  {
    key: "reward",
    label: "06 · 행동 후 보상",
    sublabel: "이 작은 행동을 마쳤을 때 자신에게 주는 작은 신호.",
    placeholder: "예: 완료 후 체크 표시를 하고 좋아하는 차를 마신다.",
  },
  {
    key: "obstacle",
    label: "07 · 예상되는 방해 요인",
    sublabel: "이 행동을 무너뜨릴 가능성이 가장 큰 한 가지.",
    placeholder: "예: 피곤하면 바로 누워서 휴대폰을 본다.",
  },
  {
    key: "step",
    label: "08 · Step · 가장 작은 시작",
    sublabel: "절대 실패하지 않을 수준의 행동.",
    placeholder: "예: 2분 동안 책상에 앉기",
  },
  {
    key: "sprint",
    label: "09 · Sprint · 집중 단위",
    sublabel: "한 번에 몰입할 수 있는 짧은 단위.",
    placeholder: "예: 25분 동안 한 가지 작업 집중하기",
  },
  {
    key: "stretch",
    label: "10 · Stretch · 도전 목표",
    sublabel: "이번 주 안에 시도해볼 수 있는 작은 도전.",
    placeholder: "예: 이번 주 안에 작은 결과물 하나 공유하기",
  },
  {
    key: "safeShareTopic",
    label: "11 · 조직 안에서 공유할 수 있는 안전한 주제",
    sublabel: "신상이 아니라 시행착오·과정 중심.",
    placeholder: "예: 이번 주에 배운 책 내용 한 가지",
  },
  {
    key: "valueIOffer",
    label: "12 · 내가 제공할 수 있는 가치",
    sublabel: "과시가 아니라 ‘나의 시행착오로 다른 사람에게 도움될 수 있는 것’.",
    placeholder: "예: 내가 정리한 자료나 시행착오를 공유하기",
    rows: 2,
  },
];

export default function ActionPlanPage({
  plan,
  result,
  onPlanChange,
  onBack,
  onComplete,
}: ActionPlanPageProps) {
  const [local, setLocal] = useState<ActionPlan>(plan);
  const type = BEHAVIOR_TYPES[result.behaviorType];
  const topObstacle = OBSTACLES[result.topObstacle.id];

  // debounce 저장
  useEffect(() => {
    const t = setTimeout(() => onPlanChange(local), 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [local]);

  function update(key: keyof ActionPlan, value: string) {
    setLocal((p) => ({ ...p, [key]: value }));
  }

  function applyHint(key: keyof ActionPlan, value: string) {
    setLocal((p) => ({ ...p, [key]: value }));
  }

  const filledCount = Object.values(local).filter((v) => v && v.trim().length > 0).length;

  return (
    <div className="max-w-3xl mx-auto px-5 py-12 md:py-16">
      <button
        onClick={onBack}
        className="text-xs tracking-[0.18em] uppercase text-[var(--ink-muted)] hover:text-[var(--ink)] mb-8 transition-colors"
      >
        ← 이전
      </button>

      <div className="mb-12">
        <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink-muted)] mb-3">
          Action Plan
        </div>
        <h1 className="font-display text-4xl md:text-5xl leading-tight text-[var(--ink)] mb-4">
          오늘부터 실행할 것들
        </h1>
        <p className="text-[15px] text-[var(--ink-muted)] leading-relaxed max-w-xl">
          결과는 해석으로 끝나지 않습니다. 여기에서 12개 항목을 직접 적으며, 작은 행동으로 옮겨봅니다.
        </p>
        <p className="text-[12px] text-[var(--ink-soft)] mt-3">
          입력 내용은 입력 즉시 브라우저에 자동 저장됩니다 · {filledCount} / {FIELDS.length} 작성
        </p>
      </div>

      {/* 빠른 힌트 */}
      <div className="border border-[var(--accent-soft)] bg-[var(--accent-bg)] rounded-md p-5 mb-8">
        <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--accent)] mb-2">
          참고 · 내 결과 기반 추천
        </div>
        <div className="text-[13px] text-[var(--ink)] space-y-2 leading-relaxed">
          <p>
            <span className="text-[var(--ink-muted)]">2분 행동 후보 · </span>
            {type.twoMinuteActions.map((a, i) => (
              <button
                key={i}
                onClick={() => applyHint("twoMinuteAction", a)}
                className="underline-offset-2 hover:underline text-[var(--ink)] hover:text-[var(--accent)] mr-2 text-left"
              >
                {a}
                {i < type.twoMinuteActions.length - 1 ? "," : ""}
              </button>
            ))}
          </p>
          <p>
            <span className="text-[var(--ink-muted)]">장애물 처방 후보 · </span>
            <button
              onClick={() => applyHint("twoMinuteAction", topObstacle.twoMinuteAction)}
              className="underline-offset-2 hover:underline text-[var(--ink)] hover:text-[var(--accent)] text-left"
            >
              {topObstacle.twoMinuteAction}
            </button>
          </p>
          <p className="text-[11px] text-[var(--ink-muted)] italic pt-1">
            클릭하면 해당 칸에 자동으로 채워집니다. 직접 수정해도 좋습니다.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {FIELDS.map((field) => (
          <div
            key={field.key}
            className="border border-[var(--line)] bg-white rounded-md p-5 md:p-6"
          >
            <label htmlFor={field.key} className="block">
              <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-1.5">
                {field.label.split(" · ")[0]}
              </div>
              <div className="text-[15px] font-medium text-[var(--ink)] mb-1">
                {field.label.split(" · ").slice(1).join(" · ")}
              </div>
              <div className="text-[12px] text-[var(--ink-muted)] mb-3 leading-relaxed">
                {field.sublabel}
              </div>
              {field.rows && field.rows > 1 ? (
                <textarea
                  id={field.key}
                  value={local[field.key]}
                  onChange={(e) => update(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  rows={field.rows}
                  className="w-full border border-[var(--line)] rounded-md px-3.5 py-3 text-[14px] text-[var(--ink)] placeholder-[var(--ink-soft)] focus:border-[var(--ink-muted)] outline-none bg-[var(--bg)] leading-relaxed"
                />
              ) : (
                <input
                  id={field.key}
                  type="text"
                  value={local[field.key]}
                  onChange={(e) => update(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full border border-[var(--line)] rounded-md px-3.5 py-3 text-[14px] text-[var(--ink)] placeholder-[var(--ink-soft)] focus:border-[var(--ink-muted)] outline-none bg-[var(--bg)]"
                />
              )}
            </label>
          </div>
        ))}
      </div>

      <div className="mt-10 pt-6 border-t border-[var(--line)] flex flex-col sm:flex-row gap-3">
        <button
          onClick={onBack}
          className="border border-[var(--line)] text-[var(--ink)] rounded-md py-3.5 px-6 text-sm font-medium hover:bg-[var(--line-soft)] transition-colors"
        >
          ← 결과로 돌아가기
        </button>
        <button
          onClick={onComplete}
          className="bg-[var(--ink)] text-white rounded-md py-3.5 px-6 text-sm font-medium tracking-wide hover:bg-black transition-colors flex-1"
        >
          전체 실행계획 보기 →
        </button>
      </div>
      <p className="text-[11px] text-[var(--ink-soft)] text-center mt-4">
        모든 칸을 다 채우지 않아도 다음으로 이동할 수 있습니다.
      </p>
    </div>
  );
}
