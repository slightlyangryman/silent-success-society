"use client";

import { useState, useMemo, useEffect } from "react";
import { SURVEY_PAGES, TOTAL_QUESTIONS } from "@/data/questions";
import { AnswerMap } from "@/lib/scoring";

interface SurveyPageProps {
  answers: AnswerMap;
  onAnswerChange: (questionId: string, score: number) => void;
  onComplete: () => void;
  onExit: () => void;
}

const SCORE_LABELS = [
  { v: 1, label: "전혀 아니다" },
  { v: 2, label: "거의 아니다" },
  { v: 3, label: "보통이다" },
  { v: 4, label: "어느 정도" },
  { v: 5, label: "매우 그렇다" },
];

export default function SurveyPage({
  answers,
  onAnswerChange,
  onComplete,
  onExit,
}: SurveyPageProps) {
  // 진행 중인 페이지 인덱스 - 가장 답이 적게 된 첫 페이지부터 시작
  const [pageIndex, setPageIndex] = useState(() => {
    for (let i = 0; i < SURVEY_PAGES.length; i++) {
      const allAnswered = SURVEY_PAGES[i].questions.every((q) => answers[q.id] !== undefined);
      if (!allAnswered) return i;
    }
    return SURVEY_PAGES.length - 1;
  });

  const [showWarning, setShowWarning] = useState(false);

  const currentPage = SURVEY_PAGES[pageIndex];
  const isLastPage = pageIndex === SURVEY_PAGES.length - 1;
  const isFirstPage = pageIndex === 0;

  const answeredCount = useMemo(
    () => Object.values(answers).filter((v) => v !== undefined).length,
    [answers]
  );

  const progress = Math.min(100, Math.round((answeredCount / TOTAL_QUESTIONS) * 100));

  const allCurrentAnswered = currentPage.questions.every((q) => answers[q.id] !== undefined);
  const allTotalAnswered = answeredCount === TOTAL_QUESTIONS;

  useEffect(() => {
    setShowWarning(false);
    // 페이지 변경 시 스크롤 위로
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pageIndex]);

  function handleNext() {
    if (!allCurrentAnswered) {
      setShowWarning(true);
      return;
    }
    if (isLastPage) {
      if (allTotalAnswered) {
        onComplete();
      } else {
        // 미응답이 있는 첫 페이지로 이동
        const missingIndex = SURVEY_PAGES.findIndex((p) =>
          p.questions.some((q) => answers[q.id] === undefined)
        );
        if (missingIndex >= 0) {
          setPageIndex(missingIndex);
          setShowWarning(true);
        }
      }
    } else {
      setPageIndex((i) => i + 1);
    }
  }

  function handlePrev() {
    if (!isFirstPage) setPageIndex((i) => i - 1);
  }

  return (
    <div>
      {/* 진행률 바 */}
      <div className="sticky top-[57px] z-20 bg-[var(--bg)]/95 backdrop-blur-sm border-b border-[var(--line)]/60 no-print">
        <div className="max-w-3xl mx-auto px-5 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--ink-muted)]">
              {String(pageIndex + 1).padStart(2, "0")} / {String(SURVEY_PAGES.length).padStart(2, "0")} · {currentPage.title}
            </div>
            <div className="text-[10px] tracking-[0.16em] uppercase text-[var(--ink-muted)] font-mono">
              {answeredCount} / {TOTAL_QUESTIONS}
            </div>
          </div>
          <div className="h-[3px] bg-[var(--line)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--ink)] transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-8 md:py-12">
        <div className="mb-10">
          <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink-muted)] mb-3">
            Section {String(pageIndex + 1).padStart(2, "0")}
          </div>
          <h2 className="font-display text-3xl md:text-4xl leading-tight text-[var(--ink)]">
            {currentPage.title}
          </h2>
          <p className="text-xs text-[var(--ink-soft)] mt-2">
            자동 저장됨 · {currentPage.questions.length}개 문항
          </p>
        </div>

        <div className="space-y-4">
          {currentPage.questions.map((q, idx) => {
            const selected = answers[q.id];
            return (
              <div
                key={q.id}
                className="border border-[var(--line)] bg-white rounded-md p-5"
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-[10px] font-mono text-[var(--ink-soft)] tracking-wider mt-1">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[15px] leading-relaxed text-[var(--ink)] flex-1">
                    {q.text}
                  </p>
                </div>

                <div className="grid grid-cols-5 gap-1.5">
                  {SCORE_LABELS.map((s) => {
                    const isActive = selected === s.v;
                    return (
                      <button
                        key={s.v}
                        onClick={() => onAnswerChange(q.id, s.v)}
                        className={`group flex flex-col items-center justify-center py-2.5 rounded transition-all border ${
                          isActive
                            ? "bg-[var(--ink)] text-white border-[var(--ink)]"
                            : "bg-white text-[var(--ink-muted)] border-[var(--line)] hover:border-[var(--ink-muted)] hover:text-[var(--ink)]"
                        }`}
                        aria-label={`${q.text} - ${s.label}`}
                        aria-pressed={isActive}
                      >
                        <span className={`text-base font-medium leading-none ${isActive ? "text-white" : "text-[var(--ink)]"}`}>
                          {s.v}
                        </span>
                        <span className={`text-[9px] tracking-wider mt-1 leading-none ${isActive ? "text-white/70" : "text-[var(--ink-soft)]"}`}>
                          {s.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {showWarning && !allCurrentAnswered && (
          <div className="mt-6 border border-[var(--accent-soft)] bg-[var(--accent-bg)] rounded-md p-4 animate-fade-in">
            <p className="text-sm text-[var(--ink)]">
              아직 응답하지 않은 문항이 있습니다. 답을 정하기 어렵다면 가장 가까운 점수를 선택해 주세요.
            </p>
          </div>
        )}

        <div className="mt-10 pt-6 border-t border-[var(--line)] flex flex-col sm:flex-row gap-3 no-print">
          <button
            onClick={handlePrev}
            disabled={isFirstPage}
            className="border border-[var(--line)] text-[var(--ink)] rounded-md py-3.5 px-6 text-sm font-medium hover:bg-[var(--line-soft)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← 이전
          </button>
          <button
            onClick={handleNext}
            className="bg-[var(--ink)] text-white rounded-md py-3.5 px-6 text-sm font-medium tracking-wide hover:bg-black transition-colors flex-1"
          >
            {isLastPage ? "결과 보기" : "다음 →"}
          </button>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={onExit}
            className="text-xs text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
          >
            나중에 다시 하기
          </button>
          <span className="text-[11px] text-[var(--ink-soft)]">
            ⌁ 자동 저장됨
          </span>
        </div>
      </div>
    </div>
  );
}
