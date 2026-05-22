// data/questions.ts
// Silent Success Society 자기진단 문항
// 1점 = 전혀 아니다, 5점 = 매우 그렇다
// reverse: true 인 문항은 점수 계산 시 6 - 입력값 으로 환산
//
// 섹션별 점수 해석:
// - mapping / making / meshing / habit / org : 점수 높을수록 좋은 상태
// - aimlessness / boredom / comfort / delusion / ego / fear / guardedness : 점수 높을수록 장애물이 강함

export type SectionId =
  | "mapping"
  | "making"
  | "meshing"
  | "aimlessness"
  | "boredom"
  | "comfort"
  | "delusion"
  | "ego"
  | "fear"
  | "guardedness"
  | "habit"
  | "org";

export interface Question {
  id: string;
  section: SectionId;
  label: string;
  text: string;
  reverse: boolean;
  tags?: string[];
}

export const SECTION_META: Record<
  SectionId,
  { label: string; group: "3M" | "obstacle" | "system"; higherIsBetter: boolean }
> = {
  mapping: { label: "Mapping · 설계", group: "3M", higherIsBetter: true },
  making: { label: "Making · 실행", group: "3M", higherIsBetter: true },
  meshing: { label: "Meshing · 성장", group: "3M", higherIsBetter: true },
  aimlessness: { label: "Aimlessness · 목적 상실", group: "obstacle", higherIsBetter: false },
  boredom: { label: "Boredom · 지루함", group: "obstacle", higherIsBetter: false },
  comfort: { label: "Comfort · 안락함", group: "obstacle", higherIsBetter: false },
  delusion: { label: "Delusion · 자기기만", group: "obstacle", higherIsBetter: false },
  ego: { label: "Ego · 자존심", group: "obstacle", higherIsBetter: false },
  fear: { label: "Fear · 두려움", group: "obstacle", higherIsBetter: false },
  guardedness: { label: "Guardedness · 닫힌 태도", group: "obstacle", higherIsBetter: false },
  habit: { label: "습관 시스템", group: "system", higherIsBetter: true },
  org: { label: "조직 활동 준비도", group: "system", higherIsBetter: true },
};

export const SECTION_ORDER: SectionId[] = [
  "mapping",
  "making",
  "meshing",
  "aimlessness",
  "boredom",
  "comfort",
  "delusion",
  "ego",
  "fear",
  "guardedness",
  "habit",
  "org",
];

export const QUESTIONS: Question[] = [
  // ─────────────────────────────────────────
  // Mapping / 설계 (7)
  // ─────────────────────────────────────────
  { id: "mapping_01", section: "mapping", label: "Mapping · 설계", text: "나는 내가 왜 성장하려 하는지 어느 정도 설명할 수 있다.", reverse: false, tags: ["purpose"] },
  { id: "mapping_02", section: "mapping", label: "Mapping · 설계", text: "나는 이번 달에 집중할 주제를 하나로 좁힐 수 있다.", reverse: false, tags: ["focus"] },
  { id: "mapping_03", section: "mapping", label: "Mapping · 설계", text: "나는 내가 하지 않을 일을 정할 수 있다.", reverse: false, tags: ["priority"] },
  { id: "mapping_04", section: "mapping", label: "Mapping · 설계", text: "나는 지금 내 삶에서 가장 중요한 전투가 무엇인지 알고 있다.", reverse: false, tags: ["battle"] },
  { id: "mapping_05", section: "mapping", label: "Mapping · 설계", text: "나는 목표를 세울 때 남의 기준보다 내 기준을 먼저 본다.", reverse: false, tags: ["self-standard"] },
  { id: "mapping_06", section: "mapping", label: "Mapping · 설계", text: "나는 내가 시간을 쓰는 일과 내가 중요하게 여기는 가치가 어느 정도 연결되어 있다.", reverse: false, tags: ["alignment"] },
  { id: "mapping_07", section: "mapping", label: "Mapping · 설계", text: "나는 중요한 선택을 할 때 우선순위를 기준으로 판단한다.", reverse: false, tags: ["priority"] },

  // ─────────────────────────────────────────
  // Making / 실행 (7)
  // ─────────────────────────────────────────
  { id: "making_01", section: "making", label: "Making · 실행", text: "나는 완벽하지 않아도 작은 결과물을 만든다.", reverse: false, tags: ["output"] },
  { id: "making_02", section: "making", label: "Making · 실행", text: "나는 생각보다 먼저 작게 실행해본다.", reverse: false, tags: ["action"] },
  { id: "making_03", section: "making", label: "Making · 실행", text: "나는 배운 것을 기록이나 결과물로 남긴다.", reverse: false, tags: ["record"] },
  { id: "making_04", section: "making", label: "Making · 실행", text: "나는 시작이 어렵더라도 2분 정도는 행동으로 옮길 수 있다.", reverse: false, tags: ["2min"] },
  { id: "making_05", section: "making", label: "Making · 실행", text: "나는 이번 주에 실제로 완성한 작은 결과물이 있다.", reverse: false, tags: ["weekly"] },
  { id: "making_06", section: "making", label: "Making · 실행", text: "나는 계획을 세운 뒤 실행 여부를 확인한다.", reverse: false, tags: ["review"] },
  { id: "making_07", section: "making", label: "Making · 실행", text: "나는 실패하더라도 다시 작게 시작할 수 있다.", reverse: false, tags: ["restart"] },

  // ─────────────────────────────────────────
  // Meshing / 성장 (7)
  // ─────────────────────────────────────────
  { id: "meshing_01", section: "meshing", label: "Meshing · 성장", text: "나는 새로운 것을 배우는 시간을 따로 둔다.", reverse: false, tags: ["learn"] },
  { id: "meshing_02", section: "meshing", label: "Meshing · 성장", text: "나는 피드백을 통해 방향을 조정한다.", reverse: false, tags: ["feedback"] },
  { id: "meshing_03", section: "meshing", label: "Meshing · 성장", text: "나는 혼자만 하려고 하기보다 배울 사람을 찾는다.", reverse: false, tags: ["mentor"] },
  { id: "meshing_04", section: "meshing", label: "Meshing · 성장", text: "나는 익숙하지 않은 주제에도 호기심을 가질 수 있다.", reverse: false, tags: ["curiosity"] },
  { id: "meshing_05", section: "meshing", label: "Meshing · 성장", text: "나는 새로운 경험을 통해 내 관점을 넓히려 한다.", reverse: false, tags: ["perspective"] },
  { id: "meshing_06", section: "meshing", label: "Meshing · 성장", text: "나는 배운 내용을 기존 지식과 연결해보려 한다.", reverse: false, tags: ["connect"] },
  { id: "meshing_07", section: "meshing", label: "Meshing · 성장", text: "나는 장기적으로 성장하기 위해 회복과 학습이 필요하다는 것을 안다.", reverse: false, tags: ["recovery"] },

  // ─────────────────────────────────────────
  // Aimlessness / 목적 상실 (6)
  // ─────────────────────────────────────────
  { id: "aimless_01", section: "aimlessness", label: "Aimlessness · 목적 상실", text: "나는 요즘 무엇을 위해 노력하는지 잘 모르겠다고 느낀다.", reverse: false },
  { id: "aimless_02", section: "aimlessness", label: "Aimlessness · 목적 상실", text: "나는 바쁘게 지내지만 중요한 방향으로 가고 있는지는 확신이 없다.", reverse: false },
  { id: "aimless_03", section: "aimlessness", label: "Aimlessness · 목적 상실", text: "나는 해야 할 일은 많은데 무엇부터 해야 할지 자주 막힌다.", reverse: false },
  { id: "aimless_04", section: "aimlessness", label: "Aimlessness · 목적 상실", text: "나는 남들이 좋다고 하는 목표를 따라가고 있는 느낌이 든다.", reverse: false },
  { id: "aimless_05", section: "aimlessness", label: "Aimlessness · 목적 상실", text: "나는 이번 달에 반드시 집중할 하나의 전투를 정하지 못했다.", reverse: false },
  { id: "aimless_06", section: "aimlessness", label: "Aimlessness · 목적 상실", text: "나는 목표를 세워도 금방 의미를 잃는 편이다.", reverse: false },

  // ─────────────────────────────────────────
  // Boredom / 지루함 (6)
  // ─────────────────────────────────────────
  { id: "boredom_01", section: "boredom", label: "Boredom · 지루함", text: "나는 요즘 대부분의 일이 별로 새롭게 느껴지지 않는다.", reverse: false },
  { id: "boredom_02", section: "boredom", label: "Boredom · 지루함", text: "나는 반복되는 일상에서 쉽게 무기력해진다.", reverse: false },
  { id: "boredom_03", section: "boredom", label: "Boredom · 지루함", text: "나는 궁금한 것을 끝까지 파고드는 시간이 줄어들었다.", reverse: false },
  { id: "boredom_04", section: "boredom", label: "Boredom · 지루함", text: "나는 새로운 시도를 하기보다 익숙한 자극을 소비하는 편이다.", reverse: false },
  { id: "boredom_05", section: "boredom", label: "Boredom · 지루함", text: "나는 배움보다 즉각적인 재미를 더 자주 선택한다.", reverse: false },
  { id: "boredom_06", section: "boredom", label: "Boredom · 지루함", text: "나는 최근에 스스로 던진 좋은 질문이 별로 없다.", reverse: false },

  // ─────────────────────────────────────────
  // Comfort / 안락함 (6)
  // ─────────────────────────────────────────
  { id: "comfort_01", section: "comfort", label: "Comfort · 안락함", text: "나는 불편한 일을 알면서도 자주 미룬다.", reverse: false },
  { id: "comfort_02", section: "comfort", label: "Comfort · 안락함", text: "나는 성장에 필요한 행동보다 편한 선택을 자주 한다.", reverse: false },
  { id: "comfort_03", section: "comfort", label: "Comfort · 안락함", text: "나는 “내일부터 하면 된다”는 생각을 자주 한다.", reverse: false },
  { id: "comfort_04", section: "comfort", label: "Comfort · 안락함", text: "나는 작은 불편도 피하려는 경향이 있다.", reverse: false },
  { id: "comfort_05", section: "comfort", label: "Comfort · 안락함", text: "나는 해야 할 일을 알면서도 쉬운 소비로 도망갈 때가 있다.", reverse: false },
  { id: "comfort_06", section: "comfort", label: "Comfort · 안락함", text: "나는 지금의 편안함이 나를 정체시키고 있다는 느낌을 받을 때가 있다.", reverse: false },

  // ─────────────────────────────────────────
  // Delusion / 자기기만 (6)
  // ─────────────────────────────────────────
  { id: "delusion_01", section: "delusion", label: "Delusion · 자기기만", text: "나는 내가 진짜 원하는 것과 남들이 좋다고 하는 것을 혼동할 때가 있다.", reverse: false },
  { id: "delusion_02", section: "delusion", label: "Delusion · 자기기만", text: "나는 실제 행동보다 머릿속 계획만으로 만족할 때가 있다.", reverse: false },
  { id: "delusion_03", section: "delusion", label: "Delusion · 자기기만", text: "나는 하지 않으면서도 하고 있다고 착각할 때가 있다.", reverse: false },
  { id: "delusion_04", section: "delusion", label: "Delusion · 자기기만", text: "나는 결과가 없는데도 스스로 꽤 노력했다고 생각할 때가 있다.", reverse: false },
  { id: "delusion_05", section: "delusion", label: "Delusion · 자기기만", text: "나는 남에게 보여주기 좋은 목표를 내 목표라고 착각할 때가 있다.", reverse: false },
  { id: "delusion_06", section: "delusion", label: "Delusion · 자기기만", text: "나는 제거해야 할 일을 알면서도 계속 붙잡고 있다.", reverse: false },

  // ─────────────────────────────────────────
  // Ego / 자존심 (6)
  // ─────────────────────────────────────────
  { id: "ego_01", section: "ego", label: "Ego · 자존심", text: "나는 피드백을 들으면 먼저 방어적으로 반응할 때가 있다.", reverse: false },
  { id: "ego_02", section: "ego", label: "Ego · 자존심", text: "나는 내가 틀렸다는 사실을 인정하는 것이 어렵다.", reverse: false },
  { id: "ego_03", section: "ego", label: "Ego · 자존심", text: "나는 실패를 배움보다 자존심의 문제로 받아들일 때가 있다.", reverse: false },
  { id: "ego_04", section: "ego", label: "Ego · 자존심", text: "나는 도움을 요청하면 약해 보일까 봐 망설인다.", reverse: false },
  { id: "ego_05", section: "ego", label: "Ego · 자존심", text: "나는 다른 사람에게 배우기보다 내 방식을 고집할 때가 있다.", reverse: false },
  { id: "ego_06", section: "ego", label: "Ego · 자존심", text: "나는 내가 제공할 수 있는 가치보다 내가 어떻게 보일지를 더 신경 쓸 때가 있다.", reverse: false },

  // ─────────────────────────────────────────
  // Fear / 두려움 (6)
  // ─────────────────────────────────────────
  { id: "fear_01", section: "fear", label: "Fear · 두려움", text: "나는 아직 준비가 안 됐다는 이유로 시작을 미룬다.", reverse: false },
  { id: "fear_02", section: "fear", label: "Fear · 두려움", text: "나는 실패할 가능성이 보이면 시도 자체를 피한다.", reverse: false },
  { id: "fear_03", section: "fear", label: "Fear · 두려움", text: "나는 거절이나 평가가 두려워 결과물을 공유하지 못한다.", reverse: false },
  { id: "fear_04", section: "fear", label: "Fear · 두려움", text: "나는 완벽하지 않은 초안을 보여주는 것이 어렵다.", reverse: false },
  { id: "fear_05", section: "fear", label: "Fear · 두려움", text: "나는 작은 위험도 크게 느껴져 행동이 늦어진다.", reverse: false },
  { id: "fear_06", section: "fear", label: "Fear · 두려움", text: "나는 시작하기 전에 너무 많은 정보를 더 모으려 한다.", reverse: false },

  // ─────────────────────────────────────────
  // Guardedness / 닫힌 태도 (6)
  // ─────────────────────────────────────────
  { id: "guard_01", section: "guardedness", label: "Guardedness · 닫힌 태도", text: "나는 어려운 일이 있어도 혼자 해결하려는 편이다.", reverse: false },
  { id: "guard_02", section: "guardedness", label: "Guardedness · 닫힌 태도", text: "나는 도움을 요청하는 것이 익숙하지 않다.", reverse: false },
  { id: "guard_03", section: "guardedness", label: "Guardedness · 닫힌 태도", text: "나는 내 고민이나 시행착오를 안전한 방식으로 공유하는 것이 어렵다.", reverse: false },
  { id: "guard_04", section: "guardedness", label: "Guardedness · 닫힌 태도", text: "나는 사람들과 연결되기보다 혼자 버티는 쪽을 택할 때가 많다.", reverse: false },
  { id: "guard_05", section: "guardedness", label: "Guardedness · 닫힌 태도", text: "나는 다른 사람의 피드백을 받기 전부터 경계할 때가 있다.", reverse: false },
  { id: "guard_06", section: "guardedness", label: "Guardedness · 닫힌 태도", text: "나는 신상을 드러내지 않으면서도 배움과 실행을 공유할 수 있다는 생각이 아직 낯설다.", reverse: false },

  // ─────────────────────────────────────────
  // 습관 시스템 (7)
  // ─────────────────────────────────────────
  { id: "habit_01", section: "habit", label: "습관 시스템", text: "나는 목표를 작게 쪼개서 매일 할 수 있는 행동으로 만든다.", reverse: false },
  { id: "habit_02", section: "habit", label: "습관 시스템", text: "나는 실패했을 때 의지 부족보다 시스템 문제를 먼저 본다.", reverse: false },
  { id: "habit_03", section: "habit", label: "습관 시스템", text: "나는 좋은 행동이 쉬워지도록 환경을 설계한다.", reverse: false },
  { id: "habit_04", section: "habit", label: "습관 시스템", text: "나는 새로운 습관을 2분 안에 시작할 수 있을 만큼 작게 만든다.", reverse: false },
  { id: "habit_05", section: "habit", label: "습관 시스템", text: "나는 행동을 시작하게 만드는 신호를 정해둔다.", reverse: false },
  { id: "habit_06", section: "habit", label: "습관 시스템", text: "나는 행동 후 작은 보상을 연결하려 한다.", reverse: false },
  { id: "habit_07", section: "habit", label: "습관 시스템", text: "나는 습관을 기록하거나 체크하는 장치를 사용한다.", reverse: false },

  // ─────────────────────────────────────────
  // 조직 활동 준비도 (7)
  // ─────────────────────────────────────────
  { id: "org_01", section: "org", label: "조직 활동 준비도", text: "나는 신상이 아니라 방향성과 실행 과정을 공유할 준비가 되어 있다.", reverse: false },
  { id: "org_02", section: "org", label: "조직 활동 준비도", text: "나는 다른 사람을 평가하기보다 배울 점을 찾을 수 있다.", reverse: false },
  { id: "org_03", section: "org", label: "조직 활동 준비도", text: "나는 과시보다 기록과 실행에 집중할 수 있다.", reverse: false },
  { id: "org_04", section: "org", label: "조직 활동 준비도", text: "나는 완벽한 결과보다 작은 시도를 공유할 수 있다.", reverse: false },
  { id: "org_05", section: "org", label: "조직 활동 준비도", text: "나는 종교, 정치, 사상, 영업, 투자 권유 없이 안전하게 활동할 수 있다.", reverse: false },
  { id: "org_06", section: "org", label: "조직 활동 준비도", text: "나는 내 성과를 자랑하기보다 시행착오를 나눌 수 있다.", reverse: false },
  { id: "org_07", section: "org", label: "조직 활동 준비도", text: "나는 다른 사람의 활동을 존중할 수 있다.", reverse: false },
];

// 페이지 단위로 나누기 (5~8문항). 각 섹션을 하나의 페이지로 둠.
export const SURVEY_PAGES: { sectionId: SectionId; title: string; questions: Question[] }[] = SECTION_ORDER.map(
  (sectionId) => {
    const sectionMeta = SECTION_META[sectionId];
    return {
      sectionId,
      title: sectionMeta.label,
      questions: QUESTIONS.filter((q) => q.section === sectionId),
    };
  }
);

export const TOTAL_QUESTIONS = QUESTIONS.length;
