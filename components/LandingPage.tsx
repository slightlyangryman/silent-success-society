"use client";

interface LandingPageProps {
  onStart: () => void;
  onGuide: () => void;
  hasExistingProgress: boolean;
}

export default function LandingPage({ onStart, onGuide, hasExistingProgress }: LandingPageProps) {
  return (
    <div>
      {/* Hero */}
      <section className="hero-blackhole noise-overlay text-white">
        <div className="max-w-3xl mx-auto px-5 py-20 md:py-28 relative z-10">
          <div className="text-[10px] tracking-[0.32em] uppercase text-white/45 mb-8">
            Silent Success Society
          </div>
          <h1 className="font-display text-[2.4rem] md:text-[3.4rem] leading-[1.08] mb-6 text-white">
            남의 기준이 아니라,
            <br />
            <span className="italic text-[var(--accent-soft)]">나의 기준</span>을 찾는
            <br />
            조용한 시작
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-white/70 max-w-xl">
            이곳은 당신의 신상을 묻는 공간이 아닙니다. 당신이 누구인지 증명하는 곳도 아닙니다. 이 진단은 더
            나은 삶을 살기 위해, 남의 기준이 아니라 나만의 기준을 찾아가기 위한 조용한 시작입니다.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-3xl mx-auto px-5 py-14 md:py-20">
        <p className="font-display text-2xl md:text-3xl leading-snug text-[var(--ink)] mb-12">
          중요한 것은 거창한 선언이 아니라,
          <br />
          오늘부터 반복할 수 있는{" "}
          <span className="italic text-[var(--accent)]">작은 행동</span>입니다.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          {[
            { k: "01", t: "신상 없음", d: "이름·연락처·소속을 요구하지 않습니다." },
            { k: "02", t: "약 8~12분", d: "12개 영역 78문항으로 구성됩니다." },
            { k: "03", t: "오늘부터 실행", d: "결과는 바로 행동 설계로 이어집니다." },
          ].map((c) => (
            <div
              key={c.k}
              className="border border-[var(--line)] bg-white rounded-md p-5"
            >
              <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-2">
                {c.k}
              </div>
              <div className="text-[15px] font-medium text-[var(--ink)] mb-1.5">{c.t}</div>
              <div className="text-[13px] text-[var(--ink-muted)] leading-relaxed">{c.d}</div>
            </div>
          ))}
        </div>

        <div className="border-t border-[var(--line)] pt-8 mb-10">
          <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-3">
            진행 흐름
          </div>
          <ol className="text-[14px] text-[var(--ink)] space-y-1.5">
            <li>1 · 안내 읽기 (선택)</li>
            <li>2 · 12개 영역 자기진단</li>
            <li>3 · 행동 유형 · 강점 · 약점 · 장애물 확인</li>
            <li>4 · 유형별 해석 보기</li>
            <li>5 · 실행계획 직접 작성</li>
            <li>6 · 요약 복사 · 인쇄 · PDF 저장</li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onStart}
            className="bg-[var(--ink)] text-white rounded-md py-4 px-7 text-sm font-medium tracking-wide hover:bg-black transition-colors flex-1"
          >
            {hasExistingProgress ? "이어서 진단하기" : "진단 시작하기"}
            <span className="ml-2 opacity-60">→</span>
          </button>
          <button
            onClick={onGuide}
            className="border border-[var(--line)] text-[var(--ink)] rounded-md py-4 px-7 text-sm font-medium tracking-wide hover:bg-[var(--line-soft)] transition-colors sm:flex-none"
          >
            안내 먼저 읽기
          </button>
        </div>

        {hasExistingProgress && (
          <p className="text-xs text-[var(--ink-muted)] mt-4">
            이전에 작성한 답변이 브라우저에 저장되어 있습니다. 그대로 이어서 진행할 수 있습니다.
          </p>
        )}
      </section>
    </div>
  );
}
