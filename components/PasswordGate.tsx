"use client";

import { useState, useEffect, FormEvent } from "react";
import { SESSION_KEYS, setSessionFlag } from "@/lib/storage";

interface PasswordGateProps {
  onUnlock: () => void;
}

const LS_SUCCESS_ANSWER = "sss_success_answer";
const LS_NICKNAME = "sss_nickname";

function looksLikePersonalInfo(value: string): boolean {
  if (!value) return false;
  if (/@/.test(value)) return true;
  if (/\d{6,}/.test(value)) return true;
  if (/(010|gmail|naver|kakao|hanmail|outlook)/i.test(value)) return true;
  return false;
}

export default function PasswordGate({ onUnlock }: PasswordGateProps) {
  const [successAnswer, setSuccessAnswer] = useState<"yes" | "no" | "">("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedNick = window.localStorage.getItem(LS_NICKNAME) || "";
      if (savedNick) setNickname(savedNick);
    }

    const t = setTimeout(() => {
      const el = document.getElementById("nickname-input");
      if (el) (el as HTMLInputElement).focus();
    }, 200);

    return () => clearTimeout(t);
  }, []);

  const nicknameLooksPersonal = looksLikePersonalInfo(nickname);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const nick = nickname.trim();

    if (!successAnswer) {
      setError("질문에 답변해 주세요.");
      return;
    }

    if (!nick) {
      setError("닉네임을 입력해 주세요.");
      return;
    }

    if (nick.length > 20) {
      setError("닉네임은 20자 이내로 입력해 주세요.");
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      try {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(LS_SUCCESS_ANSWER, successAnswer);
          window.localStorage.setItem(LS_NICKNAME, nick);
        }
      } catch {}

      setSessionFlag(SESSION_KEYS.authenticated, true);
      onUnlock();
    }, 250);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-deep)] text-white px-5 py-10 noise-overlay">
      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-10">
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
          <p className="text-sm leading-relaxed text-white/70 mb-6">
            이 진단은 Silent Success Society 신규 참여자를 위한 비공개 자기진단입니다.
            아래 질문에 답하고, 안에서 사용할 닉네임을 입력해 주세요.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <p className="block text-[11px] tracking-[0.18em] uppercase text-white/50 mb-3">
                Question · 입장 질문
              </p>

              <p className="text-lg text-white mb-4">
                성공하시고 싶습니까?
              </p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSuccessAnswer("yes")}
                  className={`rounded-md border px-4 py-3 text-sm transition-colors ${
                    successAnswer === "yes"
                      ? "border-white bg-white text-black"
                      : "border-white/20 text-white/70 hover:border-white/40"
                  }`}
                >
                  예
                </button>

                <button
                  type="button"
                  onClick={() => setSuccessAnswer("no")}
                  className={`rounded-md border px-4 py-3 text-sm transition-colors ${
                    successAnswer === "no"
                      ? "border-white bg-white text-black"
                      : "border-white/20 text-white/70 hover:border-white/40"
                  }`}
                >
                  아니오
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="nickname-input"
                className="block text-[11px] tracking-[0.18em] uppercase text-white/50 mb-2"
              >
                Nickname · 닉네임
              </label>

              <input
                id="nickname-input"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="안에서 불릴 호칭"
                className="w-full bg-transparent border border-white/20 rounded-md px-4 py-3 text-base text-white placeholder-white/25 focus:border-[var(--accent-soft)] outline-none transition-colors"
                autoComplete="off"
                spellCheck={false}
                maxLength={20}
              />

              <p className="text-[11px] text-white/40 mt-2 leading-relaxed">
                실명, 이메일, 전화번호, 학교명, 직장명 등{" "}
                <span className="text-white/60">개인을 특정할 수 있는 정보</span>는
                입력하지 마세요. 닉네임은 이 브라우저에만 저장되며 외부로 전송되지
                않습니다.
              </p>

              {nicknameLooksPersonal && (
                <p className="text-[11px] text-[#E2B45D] mt-2 animate-fade-in">
                  입력한 값에 개인정보로 보이는 패턴이 포함되어 있어요. 닉네임은
                  실명이나 연락처가 아닌, 안에서만 쓸 별칭으로 적어 주세요.
                </p>
              )}
            </div>

            {error && (
              <p className="text-xs text-[#E27B5D] animate-fade-in">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting || !successAnswer || !nickname.trim()}
              className="w-full mt-2 bg-white text-black rounded-md py-3.5 text-sm font-medium tracking-wide hover:bg-white/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? "확인 중…" : "입장하기"}
            </button>
          </form>
        </div>

        <p className="text-[11px] text-white/30 text-center mt-8 leading-relaxed">
          이 화면은 단순한 접근 제한을 위한 입구입니다.
          <br />
          답변과 닉네임은 외부로 전송되지 않고 이 기기에만 남습니다.
        </p>
      </div>
    </div>
  );
}
