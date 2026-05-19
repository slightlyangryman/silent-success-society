// lib/supabase.ts
// 옵션 구조만 제공. 환경변수가 없으면 비활성화됩니다.
// 실제 사용 시에는 @supabase/supabase-js 를 추가로 설치하세요.
//   npm install @supabase/supabase-js
// 그리고 아래 코드를 활성화한 후 사용하세요.

export function isSupabaseEnabled(): boolean {
  if (typeof process === "undefined") return false;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(url && key);
}

// 익명 ID 생성 (개인식별정보 없음)
export function generateAnonymousId(): string {
  return (
    "anon_" +
    Math.random().toString(36).slice(2, 10) +
    "_" +
    Date.now().toString(36)
  );
}

// 저장할 수 있는 페이로드 (개인식별정보 절대 포함하지 않음)
export interface AnonymousSubmissionPayload {
  anonymousId: string;
  createdAt: string;
  scores: Record<string, number>;
  resultType: string;
  riskLevel: string;
  topObstacle: string;
}

// 실제 Supabase 연동을 원한다면 아래 함수를 활성화하세요.
//
// import { createClient } from "@supabase/supabase-js";
//
// const supabase = isSupabaseEnabled()
//   ? createClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL!,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//     )
//   : null;
//
// export async function submitAnonymous(payload: AnonymousSubmissionPayload) {
//   if (!supabase) return { ok: false, reason: "disabled" };
//   const { error } = await supabase.from("submissions").insert(payload);
//   return { ok: !error, error };
// }
