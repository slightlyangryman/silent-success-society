"use client";

import { useEffect, useMemo, useState } from "react";

import AppLayout from "@/components/AppLayout";
import PasswordGate from "@/components/PasswordGate";
import LandingPage from "@/components/LandingPage";
import GuidePage from "@/components/GuidePage";
import SurveyPage from "@/components/SurveyPage";
import ResultPage from "@/components/ResultPage";
import InterpretationSection from "@/components/InterpretationSection";
import ActionPlanPage from "@/components/ActionPlanPage";
import CompletionPage from "@/components/CompletionPage";

import {
  loadJSON,
  saveJSON,
  STORAGE_KEYS,
  SESSION_KEYS,
  getSessionFlag,
  ActionPlan,
  EMPTY_ACTION_PLAN,
  clearAll,
} from "@/lib/storage";
import { AnswerMap, getAllScores, getCompletedCount } from "@/lib/scoring";
import { TOTAL_QUESTIONS } from "@/data/questions";

type Stage =
  | "landing"
  | "guide"
  | "survey"
  | "result"
  | "interpretation"
  | "action"
  | "completion";

export default function HomePage() {
  // 클라이언트 마운트 가드
  const [mounted, setMounted] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [stage, setStage] = useState<Stage>("landing");
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [plan, setPlan] = useState<ActionPlan>(EMPTY_ACTION_PLAN);

  useEffect(() => {
    // 초기 로드
    const authed = getSessionFlag(SESSION_KEYS.authenticated);
    setAuthenticated(authed);
    setAnswers(loadJSON<AnswerMap>(STORAGE_KEYS.answers, {}));
    setPlan(loadJSON<ActionPlan>(STORAGE_KEYS.actionPlan, EMPTY_ACTION_PLAN));
    setStage(loadJSON<Stage>(STORAGE_KEYS.stage, "landing"));
    setMounted(true);
  }, []);

  // 답변 저장
  useEffect(() => {
    if (!mounted) return;
    saveJSON(STORAGE_KEYS.answers, answers);
  }, [answers, mounted]);

  // 실행계획 저장
  useEffect(() => {
    if (!mounted) return;
    saveJSON(STORAGE_KEYS.actionPlan, plan);
  }, [plan, mounted]);

  // 스테이지 저장
  useEffect(() => {
    if (!mounted) return;
    saveJSON(STORAGE_KEYS.stage, stage);
  }, [stage, mounted]);

  // 결과 계산 (모든 문항 답변 완료 시에만 신뢰성 있음, 부분 완료여도 미리보기는 가능)
  const completedCount = useMemo(() => getCompletedCount(answers), [answers]);
  const allAnswered = completedCount === TOTAL_QUESTIONS;
  const result = useMemo(() => (allAnswered ? getAllScores(answers) : null), [answers, allAnswered]);

  // 핸들러들
  function handleAnswerChange(qid: string, value: number) {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  }

  function handleSurveyComplete() {
    setStage("result");
  }

  function handleRestart() {
    if (typeof window === "undefined") return;
    const ok = window.confirm(
      "모든 답변과 실행계획이 삭제됩니다. 다시 시작하시겠습니까?"
    );
    if (!ok) return;
    clearAll();
    setAnswers({});
    setPlan(EMPTY_ACTION_PLAN);
    setStage("landing");
  }

  function handleGoHome() {
    setStage("landing");
  }

  // 서버 사이드에서는 빈 레이아웃 - 인증 정보 없음
  if (!mounted) {
    return (
      <AppLayout hideHeader>
        <div className="min-h-screen flex items-center justify-center text-[var(--ink-muted)] text-sm">
          loading…
        </div>
      </AppLayout>
    );
  }

  if (!authenticated) {
    return <PasswordGate onUnlock={() => setAuthenticated(true)} />;
  }

  // 메인 흐름
  switch (stage) {
    case "landing":
      return (
        <AppLayout>
          <LandingPage
            onStart={() => setStage("survey")}
            onGuide={() => setStage("guide")}
            hasExistingProgress={completedCount > 0 && completedCount < TOTAL_QUESTIONS}
          />
        </AppLayout>
      );

    case "guide":
      return (
        <AppLayout>
          <GuidePage onStart={() => setStage("survey")} onBack={() => setStage("landing")} />
        </AppLayout>
      );

    case "survey":
      return (
        <AppLayout>
          <SurveyPage
            answers={answers}
            onAnswerChange={handleAnswerChange}
            onComplete={handleSurveyComplete}
            onExit={() => setStage("landing")}
          />
        </AppLayout>
      );

    case "result":
      if (!result) {
        // 아직 완료되지 않았으면 다시 설문으로
        setStage("survey");
        return null;
      }
      return (
        <AppLayout>
          <ResultPage
            result={result}
            onInterpretation={() => setStage("interpretation")}
            onActionPlan={() => setStage("action")}
            onRestart={handleRestart}
          />
        </AppLayout>
      );

    case "interpretation":
      if (!result) {
        setStage("survey");
        return null;
      }
      return (
        <AppLayout>
          <InterpretationSection
            result={result}
            onBack={() => setStage("result")}
            onActionPlan={() => setStage("action")}
          />
        </AppLayout>
      );

    case "action":
      if (!result) {
        setStage("survey");
        return null;
      }
      return (
        <AppLayout>
          <ActionPlanPage
            plan={plan}
            result={result}
            onPlanChange={setPlan}
            onBack={() => setStage("result")}
            onComplete={() => setStage("completion")}
          />
        </AppLayout>
      );

    case "completion":
      if (!result) {
        setStage("survey");
        return null;
      }
      return (
        <AppLayout>
          <CompletionPage
            result={result}
            plan={plan}
            onRestart={handleRestart}
            onHome={handleGoHome}
            onEditPlan={() => setStage("action")}
          />
        </AppLayout>
      );

    default:
      return null;
  }
}
