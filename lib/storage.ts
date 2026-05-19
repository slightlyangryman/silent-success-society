// lib/storage.ts
// 브라우저 저장소 유틸리티

export const STORAGE_KEYS = {
  answers: "sss_answers",
  result: "sss_result",
  actionPlan: "sss_action_plan",
  lastUpdated: "sss_last_updated_at",
  stage: "sss_stage",
} as const;

export const SESSION_KEYS = {
  authenticated: "sss_authenticated",
} as const;

const isBrowser = () => typeof window !== "undefined";

export function loadJSON<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveJSON<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.localStorage.setItem(STORAGE_KEYS.lastUpdated, new Date().toISOString());
  } catch {
    // ignore
  }
}

export function removeKey(key: string): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(key);
}

export function clearAll(): void {
  if (!isBrowser()) return;
  Object.values(STORAGE_KEYS).forEach((k) => window.localStorage.removeItem(k));
}

export function getLastUpdated(): string | null {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(STORAGE_KEYS.lastUpdated);
}

// 세션
export function getSessionFlag(key: string): boolean {
  if (!isBrowser()) return false;
  return window.sessionStorage.getItem(key) === "1";
}

export function setSessionFlag(key: string, on: boolean): void {
  if (!isBrowser()) return;
  if (on) window.sessionStorage.setItem(key, "1");
  else window.sessionStorage.removeItem(key);
}

// 액션 플랜 타입
export interface ActionPlan {
  activityDefinition: string;
  toRemove: string;
  identityStatement: string;
  twoMinuteAction: string;
  habitCue: string;
  reward: string;
  obstacle: string;
  step: string;
  sprint: string;
  stretch: string;
  safeShareTopic: string;
  valueIOffer: string;
}

export const EMPTY_ACTION_PLAN: ActionPlan = {
  activityDefinition: "",
  toRemove: "",
  identityStatement: "",
  twoMinuteAction: "",
  habitCue: "",
  reward: "",
  obstacle: "",
  step: "",
  sprint: "",
  stretch: "",
  safeShareTopic: "",
  valueIOffer: "",
};
