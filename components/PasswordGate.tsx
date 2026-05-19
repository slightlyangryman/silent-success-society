"use client";

import { useState, FormEvent, useEffect } from "react";
import { SESSION_KEYS, setSessionFlag } from "@/lib/storage";

interface PasswordGateProps {
  onUnlock: () => void;
}

export default function PasswordGate({ onUnlock }: PasswordGateProps) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 환경변수가 비어있을 때를 위해 기본값을 둠
  const expected = process.env.NEXT_PUBLIC_APP_PASSWORD || "silent2026";

  useEffect(() => {
    // 화면 진입 시 입력에 포커스되도록
    const t = setTimeout(() => {
      const el = document.getElementById("password-input");
      if (el) (el as HTMLInputElement).focus();
    }, 200);
    return () => clearTimeout(t);
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setTimeout(() => {
      if (pw.trim() === expected) {
        setSessionFlag(SESSION_KEYS.authenticated, true);
        onUnlock();
      } else {
        setError("비밀번호가 일치하지 않습니다.");
        setSubmitting(false);
      }
    }, 250);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-deep)] text-white px-5 noise-overlay">
      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-12">
          <div className="text-[10px] tracking-[0.32em] uppercase text-white/40 mb-5">
            Private Entrance
          </div>
          <h1 className="font-display text-4xl md:text-5xl leading-tight mb-1">
            Silent
            <br />
            Success Society
          </h1>
          <p className="text-xs tracking-[0.18em] uppercase text-white/40 mt-4">
            Initiation Guide
          </p>
        </div>

        <div className="border border-white/15 rounded-lg p-6 md:p-8 bg-white/[0.02]">
          <p className="text-sm leading-relaxed text-white/70 mb-7">
            이 진단은 Silent Success Society 신규 참여자를 위한 비공개 자기진단입니다. 전달받은 비밀번호를
            입력해 주세요.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password-input"
                className="block text-[11px] tracking-[0.18em] uppercase text-white/50 mb-2"
              >
                Access Code
              </label>
              <input
                id="password-input"
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border border-white/20 rounded-md px-4 py-3 text-base text-white placeholder-white/25 focus:border-[var(--accent-soft)] outline-none transition-colors"
                autoComplete="off"
                spellCheck={false}
              />
            </div>

            {error && (
              <p className="text-xs text-[#E27B5D] animate-fade-in">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting || !pw.trim()}
              className="w-full mt-2 bg-white text-black rounded-md py-3.5 text-sm font-medium tracking-wide hover:bg-white/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? "확인 중…" : "입장하기"}
            </button>
          </form>
        </div>

        <p className="text-[11px] text-white/30 text-center mt-8 leading-relaxed">
          이 화면은 단순한 접근 제한을 위한 입구입니다.
          <br />
          입력한 비밀번호는 저장되지 않습니다.
        </p>
      </div>
    </div>
  );
}
