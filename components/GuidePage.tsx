"use client";

import { GUIDE_CARDS } from "@/data/guideContent";

interface GuidePageProps {
  onStart: () => void;
  onBack: () => void;
}

export default function GuidePage({ onStart, onBack }: GuidePageProps) {
  return (
    <div className="max-w-3xl mx-auto px-5 py-12 md:py-16">
      <button
        onClick={onBack}
        className="text-xs tracking-[0.18em] uppercase text-[var(--ink-muted)] hover:text-[var(--ink)] mb-8 transition-colors"
      >
        ← 처음으로
      </button>

      <div className="mb-12">
        <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink-muted)] mb-4">
          Before You Begin
        </div>
        <h1 className="font-display text-4xl md:text-5xl leading-tight text-[var(--ink)] mb-5">
          진단 전 짧은 안내
        </h1>
        <p className="text-base text-[var(--ink-muted)] leading-relaxed max-w-xl">
          진단은 이 안내를 읽지 않아도 진행할 수 있습니다. 다만 이 페이지를 읽고 시작하면, 결과가 훨씬 더
          분명하게 보입니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-12">
        {GUIDE_CARDS.map((card, i) => (
          <article
            key={card.title}
            className="border border-[var(--line)] bg-white rounded-md p-6 hover:border-[var(--ink-muted)] transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-[15px] font-medium text-[var(--ink)]">{card.title}</h3>
              <span className="text-[10px] tracking-[0.2em] text-[var(--ink-soft)] font-mono">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="text-[13px] leading-relaxed text-[var(--ink)] mb-3">
              {card.definition}
            </p>
            <div className="border-t border-[var(--line-soft)] pt-3 mt-3">
              <p className="text-[12px] text-[var(--ink-muted)] mb-2">
                <span className="text-[var(--ink)] font-medium">부족할 때 ·</span>{" "}
                {card.whenLacking}
              </p>
              <p className="text-[12px] italic text-[var(--accent)]">
                Q. {card.todaysQuestion}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="border-t border-[var(--line)] pt-8 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onStart}
          className="bg-[var(--ink)] text-white rounded-md py-4 px-7 text-sm font-medium tracking-wide hover:bg-black transition-colors flex-1"
        >
          진단 시작하기 <span className="ml-2 opacity-60">→</span>
        </button>
        <button
          onClick={onBack}
          className="border border-[var(--line)] text-[var(--ink)] rounded-md py-4 px-7 text-sm font-medium tracking-wide hover:bg-[var(--line-soft)] transition-colors"
        >
          처음으로 돌아가기
        </button>
      </div>
    </div>
  );
}
