"use client";

import { useState, useEffect, FormEvent } from "react";
import { SESSION_KEYS, setSessionFlag } from "@/lib/storage";

interface PasswordGateProps {
  onUnlock: () => void;
}

type SuccessAnswer = "yes" | "no" | "";

const LS_SUCCESS_ANSWER = "sss_success_answer";
const LS_NICKNAME = "sss_nickname";
const LS_ACCESS_LOCK_UNTIL = "sss_access_lock_until";

const LOCK_DURATION_MS = 5 * 60 * 1000;

function looksLikePersonalInfo(value: string): boolean {
  if (!value) return false;
  if (/@/.test(value)) return true;
  if (/\d{6,}/.test(value)) return true;
  if (/(010|gmail|naver|kakao|hanmail|outlook)/i.test(value)) return true;
  return false;
}

function formatRemainingTime(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes <= 0) return `${seconds}초`;
  return `${minutes}분 ${String(seconds).padStart(2, "0")}초`;
}

export default function PasswordGate({ onUnlock }: PasswordGateProps) {
  const [successAnswer, setSuccessAnswer] = useState<SuccessAnswer>("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [lockUntil, setLockUntil] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());

  const isLocked = lockUntil !== null && lockUntil > now;
  const remainingLockTime = isLocked ? lockUntil - now : 0;
  const nicknameLooksPersonal = looksLikePersonalInfo(nickname);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedNick = window.localStorage.getItem(LS_NICKNAME) || "";
      if (savedNick) setNickname(savedNick);

      const savedLockUntil = Number(
        window.localStorage.getItem(LS_ACCESS_LOCK_UNTIL) || 0
      );

      if (savedLockUntil && savedLockUntil > Date.now()) {
        setLockUntil(savedLockUntil);
        setSuccessAnswer("no");
        setError("언젠가 성공하시길.");
        setSessionFlag(SESSION_KEYS.authenticated, false);
      } else {
        window.localStorage.removeItem(LS_ACCESS_LOCK_UNTIL);
      }
    }

    const t = setTimeout(() => {
      const el = document.getElementById("nickname-input");
      if (el) (el as HTMLInputElement).focus();
    }, 200);

    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!lockUntil) return;

    const interval = setInterval(() => {
      const currentTime = Date.now();
      setNow(currentTime);

      if (lockUntil <= currentTime) {
        if (typeof window !== "undefined") {
          window.localStorage.removeItem(LS_ACCESS_LOCK_UNTIL);
        }

        setLockUntil(null);
        setSuccessAnswer("");
        setError("");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lockUntil]);

  function lockAccess() {
    const until = Date.now() + LOCK_DURATION_MS;

    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(LS_ACCESS_LOCK_UNTIL, String(until));
        window.localStorage.setItem(LS_SUCCESS_ANSWER, "no");
      }
    } catch {}

    setSessionFlag(SESSION_KEYS.authenticated, false);
    setLockUntil(until);
    setNow(Date.now());
    setSuccessAnswer("no");
    setSubmitting(false);
    setError("언젠가 성공하시길.");
  }

  function handleYesClick() {
    if (isLocked) {
      setError("언젠가 성공하시길.");
      return;
    }

    setSuccessAnswer("yes");
    setError("");
  }

  function handleNoClick() {
    lockAccess();
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (isLocked) {
      setError("언젠가 성공하시길.");
      return;
    }

    const nick = nickname.trim();

    if (!successAnswer) {
      setError("질문에 답변해 주세요.");
      return;
    }

    if (successAnswer === "no") {
      lockAccess();
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
          window.localStorage.setItem(LS_SUCCESS_ANSWER, "yes");
          window.localStorage.setItem(LS_NICKNAME, nick);
          window.localStorage.removeItem(LS_ACCESS_LOCK_UNTIL);
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

          {isLocked && (
            <div className="mb-6 rounded-md border border-[#E2B45D]/40 bg-[#E2B45D]/10 px-4 py-3 animate-fade-in">
              <p className="text-sm text-[#E2B45D] font-medium">
                언젠가 성공하시길.
              </p>
              <p className="text-xs text-white/50 mt-1">
                {formatRemainingTime(remainingLockTime)} 뒤 다시 시도할 수 있습니다.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <p className="block text-[11px] tracking-[0.18em] uppercase text-white/50 mb-3">
                Question · 입장 질문
              </p>

              <p className="text-lg text-white mb-4">성공하시고 싶습니까?</p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleYesClick}
                  disabled={isLocked}
                  className={`rounded-md border px-4 py-3 text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                    successAnswer === "yes"
                      ? "border-white bg-white text-black"
                      : "border-white/20 text-white/70 hover:border-white/40"
                  }`}
                >
                  예
                </button>

                <button
                  type="button"
                  onClick={handleNoClick}
                  disabled={isLocked}
                  className={`rounded-md border px-4 py-3 text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
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
                disabled={isLocked}
                className="w-full bg-transparent border border-white/20 rounded-md px-4 py-3 text-base text-white placeholder-white/25 focus:border-[var(--accent-soft)] outline-none transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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

              {nicknameLooksPersonal && !isLocked && (
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
              disabled={
                submitting ||
                isLocked ||
                successAnswer !== "yes" ||
                !nickname.trim()
              }
              className="w-full mt-2 bg-white text-black rounded-md py-3.5 text-sm font-medium tracking-wide hover:bg-white/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {isLocked
                ? "입장 제한 중"
                : submitting
                ? "확인 중…"
                : "입장하기"}
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
