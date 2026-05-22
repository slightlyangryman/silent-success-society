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
  // 방향성, 우선순위, 기준, 시간 정렬, 하지 않을 일
  // ─────────────────────────────────────────
  {
    id: "mapping_01",
    section: "mapping",
    label: "Mapping · 설계",
    text: "나는 지금 내가 왜 성장하려 하는지 한두 문장으로 설명할 수 있다.",
    reverse: false,
    tags: ["purpose"],
  },
  {
    id: "mapping_02",
    section: "mapping",
    label: "Mapping · 설계",
    text: "나는 이번 달에 반드시 집중해야 할 핵심 전투를 하나로 좁힐 수 있다.",
    reverse: false,
    tags: ["focus", "battle"],
  },
  {
    id: "mapping_03",
    section: "mapping",
    label: "Mapping · 설계",
    text: "나는 목표를 세울 때 ‘해야 할 일’뿐 아니라 ‘하지 않을 일’도 함께 정한다.",
    reverse: false,
    tags: ["priority", "not-to-do"],
  },
  {
    id: "mapping_04",
    section: "mapping",
    label: "Mapping · 설계",
    text: "나는 중요한 선택을 할 때 기분보다 우선순위와 기준을 먼저 확인한다.",
    reverse: false,
    tags: ["decision"],
  },
  {
    id: "mapping_05",
    section: "mapping",
    label: "Mapping · 설계",
    text: "나는 남들이 좋다고 말하는 목표와 내가 진짜 원하는 목표를 구분하려고 한다.",
    reverse: false,
    tags: ["self-standard"],
  },
  {
    id: "mapping_06",
    section: "mapping",
    label: "Mapping · 설계",
    text: "최근 일주일 동안 내가 시간을 쓴 일들은 내가 중요하게 여기는 방향과 어느 정도 연결되어 있다.",
    reverse: false,
    tags: ["alignment", "time"],
  },
  {
    id: "mapping_07",
    section: "mapping",
    label: "Mapping · 설계",
    text: "나는 목표가 흐려졌을 때 다시 기준을 정리하고 방향을 수정할 수 있다.",
    reverse: false,
    tags: ["review", "reset"],
  },

  // ─────────────────────────────────────────
  // Making / 실행 (7)
  // 시작, 산출물, 기록, 완료, 공유, 복귀
  // ─────────────────────────────────────────
  {
    id: "making_01",
    section: "making",
    label: "Making · 실행",
    text: "나는 완벽하지 않아도 일단 작게 시작할 수 있다.",
    reverse: false,
    tags: ["start"],
  },
  {
    id: "making_02",
    section: "making",
    label: "Making · 실행",
    text: "나는 생각이나 계획에서 멈추지 않고 실제 행동으로 옮기는 편이다.",
    reverse: false,
    tags: ["action"],
  },
  {
    id: "making_03",
    section: "making",
    label: "Making · 실행",
    text: "나는 배운 내용을 그냥 소비하지 않고 기록, 정리, 결과물 중 하나로 남기려 한다.",
    reverse: false,
    tags: ["record", "output"],
  },
  {
    id: "making_04",
    section: "making",
    label: "Making · 실행",
    text: "나는 시작이 부담스러울 때도 2분 안에 할 수 있는 최소 행동으로 낮춰서 시작할 수 있다.",
    reverse: false,
    tags: ["2min"],
  },
  {
    id: "making_05",
    section: "making",
    label: "Making · 실행",
    text: "최근 일주일 안에 내가 실제로 완성한 작은 결과물이 있다.",
    reverse: false,
    tags: ["weekly", "completion"],
  },
  {
    id: "making_06",
    section: "making",
    label: "Making · 실행",
    text: "나는 실행한 뒤 결과를 확인하고 다음 행동을 조정한다.",
    reverse: false,
    tags: ["feedback-loop"],
  },
  {
    id: "making_07",
    section: "making",
    label: "Making · 실행",
    text: "나는 하루 실패해도 전체를 포기하지 않고 다시 작게 복귀할 수 있다.",
    reverse: false,
    tags: ["restart"],
  },

  // ─────────────────────────────────────────
  // Meshing / 성장 (7)
  // 학습, 피드백, 연결, 확장, 통합, 회복
  // ─────────────────────────────────────────
  {
    id: "meshing_01",
    section: "meshing",
    label: "Meshing · 성장",
    text: "나는 성장에 필요한 학습 시간을 의도적으로 확보한다.",
    reverse: false,
    tags: ["learn"],
  },
  {
    id: "meshing_02",
    section: "meshing",
    label: "Meshing · 성장",
    text: "나는 피드백을 들었을 때 기분보다 개선할 지점을 먼저 찾으려 한다.",
    reverse: false,
    tags: ["feedback"],
  },
  {
    id: "meshing_03",
    section: "meshing",
    label: "Meshing · 성장",
    text: "나는 혼자만 해결하려 하기보다 배울 사람, 참고할 자료, 도움 받을 방법을 찾는다.",
    reverse: false,
    tags: ["mentor", "resource"],
  },
  {
    id: "meshing_04",
    section: "meshing",
    label: "Meshing · 성장",
    text: "나는 익숙하지 않은 주제나 경험에서도 배울 점을 찾을 수 있다.",
    reverse: false,
    tags: ["curiosity"],
  },
  {
    id: "meshing_05",
    section: "meshing",
    label: "Meshing · 성장",
    text: "나는 새로운 경험을 통해 기존 생각을 업데이트하려 한다.",
    reverse: false,
    tags: ["perspective"],
  },
  {
    id: "meshing_06",
    section: "meshing",
    label: "Meshing · 성장",
    text: "나는 새로 배운 내용을 내 목표, 습관, 실행 방식과 연결해본다.",
    reverse: false,
    tags: ["connect"],
  },
  {
    id: "meshing_07",
    section: "meshing",
    label: "Meshing · 성장",
    text: "나는 장기적으로 성장하기 위해 학습뿐 아니라 회복과 컨디션 관리도 필요하다고 본다.",
    reverse: false,
    tags: ["recovery"],
  },

  // ─────────────────────────────────────────
  // Aimlessness / 목적 상실 (6)
  // 방향 없음, 우선순위 혼란, 의미 상실, 남의 목표
  // ─────────────────────────────────────────
  {
    id: "aimless_01",
    section: "aimlessness",
    label: "Aimlessness · 목적 상실",
    text: "나는 요즘 무엇을 위해 노력하는지 잘 모르겠다고 느낀다.",
    reverse: false,
  },
  {
    id: "aimless_02",
    section: "aimlessness",
    label: "Aimlessness · 목적 상실",
    text: "나는 바쁘게 지내지만 중요한 방향으로 가고 있는지는 확신이 없다.",
    reverse: false,
  },
  {
    id: "aimless_03",
    section: "aimlessness",
    label: "Aimlessness · 목적 상실",
    text: "나는 해야 할 일은 많은데 무엇부터 해야 할지 자주 막힌다.",
    reverse: false,
  },
  {
    id: "aimless_04",
    section: "aimlessness",
    label: "Aimlessness · 목적 상실",
    text: "나는 내가 원하는 것보다 남들이 좋아 보인다고 말하는 목표를 따라갈 때가 있다.",
    reverse: false,
  },
  {
    id: "aimless_05",
    section: "aimlessness",
    label: "Aimlessness · 목적 상실",
    text: "나는 이번 달에 반드시 집중할 하나의 전투를 아직 정하지 못했다.",
    reverse: false,
  },
  {
    id: "aimless_06",
    section: "aimlessness",
    label: "Aimlessness · 목적 상실",
    text: "나는 목표를 세워도 며칠 지나면 의미가 흐려지고 다시 원래대로 돌아가는 편이다.",
    reverse: false,
  },

  // ─────────────────────────────────────────
  // Boredom / 지루함 (6)
  // 지적 호기심 저하, 반복 무기력, 즉각 자극 의존
  // ─────────────────────────────────────────
  {
    id: "boredom_01",
    section: "boredom",
    label: "Boredom · 지루함",
    text: "나는 요즘 대부분의 일이 새롭거나 궁금하게 느껴지지 않는다.",
    reverse: false,
  },
  {
    id: "boredom_02",
    section: "boredom",
    label: "Boredom · 지루함",
    text: "나는 반복되는 일상 속에서 쉽게 무기력해진다.",
    reverse: false,
  },
  {
    id: "boredom_03",
    section: "boredom",
    label: "Boredom · 지루함",
    text: "나는 궁금한 것을 끝까지 파고드는 시간이 줄어들었다.",
    reverse: false,
  },
  {
    id: "boredom_04",
    section: "boredom",
    label: "Boredom · 지루함",
    text: "나는 새로운 시도보다 익숙하고 쉬운 자극을 소비하는 쪽을 자주 선택한다.",
    reverse: false,
  },
  {
    id: "boredom_05",
    section: "boredom",
    label: "Boredom · 지루함",
    text: "나는 배움이나 훈련보다 즉각적인 재미를 더 자주 선택한다.",
    reverse: false,
  },
  {
    id: "boredom_06",
    section: "boredom",
    label: "Boredom · 지루함",
    text: "최근 한 달 동안 스스로에게 던진 좋은 질문이 거의 없다.",
    reverse: false,
  },

  // ─────────────────────────────────────────
  // Comfort / 안락함 (6)
  // 불편 회피, 미루기, 쉬운 소비, 현재 안주
  // ─────────────────────────────────────────
  {
    id: "comfort_01",
    section: "comfort",
    label: "Comfort · 안락함",
    text: "나는 해야 한다는 것을 알면서도 불편하면 자주 미룬다.",
    reverse: false,
  },
  {
    id: "comfort_02",
    section: "comfort",
    label: "Comfort · 안락함",
    text: "나는 성장에 필요한 행동보다 당장 편한 선택을 자주 한다.",
    reverse: false,
  },
  {
    id: "comfort_03",
    section: "comfort",
    label: "Comfort · 안락함",
    text: "나는 ‘내일부터 하면 된다’는 생각으로 오늘의 행동을 넘길 때가 많다.",
    reverse: false,
  },
  {
    id: "comfort_04",
    section: "comfort",
    label: "Comfort · 안락함",
    text: "나는 작은 불편이나 어색함도 피하려는 경향이 있다.",
    reverse: false,
  },
  {
    id: "comfort_05",
    section: "comfort",
    label: "Comfort · 안락함",
    text: "나는 해야 할 일을 알면서도 쉬운 소비나 휴식으로 도망갈 때가 있다.",
    reverse: false,
  },
  {
    id: "comfort_06",
    section: "comfort",
    label: "Comfort · 안락함",
    text: "나는 지금의 편안함이 나를 정체시키고 있다는 느낌을 받을 때가 있다.",
    reverse: false,
  },

  // ─────────────────────────────────────────
  // Delusion / 자기기만 (6)
  // 생각만 하는 상태, 노력 착각, 보여주기 목표, 제거 실패
  // ─────────────────────────────────────────
  {
    id: "delusion_01",
    section: "delusion",
    label: "Delusion · 자기기만",
    text: "나는 내가 진짜 원하는 것과 남들이 좋아 보인다고 말하는 것을 혼동할 때가 있다.",
    reverse: false,
  },
  {
    id: "delusion_02",
    section: "delusion",
    label: "Delusion · 자기기만",
    text: "나는 실제 행동보다 머릿속 계획이나 상상만으로 만족할 때가 있다.",
    reverse: false,
  },
  {
    id: "delusion_03",
    section: "delusion",
    label: "Delusion · 자기기만",
    text: "나는 공부하거나 준비한다는 이유로 실제 실행을 미룰 때가 있다.",
    reverse: false,
  },
  {
    id: "delusion_04",
    section: "delusion",
    label: "Delusion · 자기기만",
    text: "나는 뚜렷한 결과물이 없는데도 스스로 꽤 노력했다고 느낄 때가 있다.",
    reverse: false,
  },
  {
    id: "delusion_05",
    section: "delusion",
    label: "Delusion · 자기기만",
    text: "나는 남에게 보여주기 좋은 목표를 내 진짜 목표라고 착각할 때가 있다.",
    reverse: false,
  },
  {
    id: "delusion_06",
    section: "delusion",
    label: "Delusion · 자기기만",
    text: "나는 줄이거나 끊어야 할 행동을 알면서도 계속 합리화할 때가 있다.",
    reverse: false,
  },

  // ─────────────────────────────────────────
  // Ego / 자존심 (6)
  // 방어, 피드백 회피, 도움 요청 어려움, 초보자 태도 부족
  // ─────────────────────────────────────────
  {
    id: "ego_01",
    section: "ego",
    label: "Ego · 자존심",
    text: "나는 피드백을 들으면 먼저 받아들이기보다 방어적으로 반응할 때가 있다.",
    reverse: false,
  },
  {
    id: "ego_02",
    section: "ego",
    label: "Ego · 자존심",
    text: "나는 내가 틀렸다는 사실을 인정하는 것이 어렵다.",
    reverse: false,
  },
  {
    id: "ego_03",
    section: "ego",
    label: "Ego · 자존심",
    text: "나는 실패를 배움의 과정이라기보다 자존심의 문제로 받아들일 때가 있다.",
    reverse: false,
  },
  {
    id: "ego_04",
    section: "ego",
    label: "Ego · 자존심",
    text: "나는 도움을 요청하면 약해 보이거나 부족해 보일까 봐 망설인다.",
    reverse: false,
  },
  {
    id: "ego_05",
    section: "ego",
    label: "Ego · 자존심",
    text: "나는 다른 사람에게 배우기보다 내 방식을 고집할 때가 있다.",
    reverse: false,
  },
  {
    id: "ego_06",
    section: "ego",
    label: "Ego · 자존심",
    text: "나는 내가 실제로 제공할 수 있는 가치보다 내가 어떻게 보일지를 더 신경 쓸 때가 있다.",
    reverse: false,
  },

  // ─────────────────────────────────────────
  // Fear / 두려움 (6)
  // 실패, 평가, 공유, 불확실성, 준비 과잉
  // ─────────────────────────────────────────
  {
    id: "fear_01",
    section: "fear",
    label: "Fear · 두려움",
    text: "나는 아직 준비가 안 됐다는 이유로 시작을 미룰 때가 많다.",
    reverse: false,
  },
  {
    id: "fear_02",
    section: "fear",
    label: "Fear · 두려움",
    text: "나는 실패할 가능성이 보이면 시도 자체를 피하고 싶어진다.",
    reverse: false,
  },
  {
    id: "fear_03",
    section: "fear",
    label: "Fear · 두려움",
    text: "나는 거절이나 평가가 두려워 결과물이나 생각을 공유하지 못할 때가 있다.",
    reverse: false,
  },
  {
    id: "fear_04",
    section: "fear",
    label: "Fear · 두려움",
    text: "나는 완벽하지 않은 초안이나 미완성 상태를 보여주는 것이 어렵다.",
    reverse: false,
  },
  {
    id: "fear_05",
    section: "fear",
    label: "Fear · 두려움",
    text: "나는 작은 위험이나 불확실성도 크게 느껴져 행동이 늦어진다.",
    reverse: false,
  },
  {
    id: "fear_06",
    section: "fear",
    label: "Fear · 두려움",
    text: "나는 시작하기 전에 정보를 더 모아야 한다는 생각으로 실행을 늦출 때가 있다.",
    reverse: false,
  },

  // ─────────────────────────────────────────
  // Guardedness / 닫힌 태도 (6)
  // 공유 어려움, 도움 요청 회피, 관계 경계, 안전한 개방 부족
  // ─────────────────────────────────────────
  {
    id: "guard_01",
    section: "guardedness",
    label: "Guardedness · 닫힌 태도",
    text: "나는 어려운 일이 있어도 먼저 혼자 해결하려는 편이다.",
    reverse: false,
  },
  {
    id: "guard_02",
    section: "guardedness",
    label: "Guardedness · 닫힌 태도",
    text: "나는 도움을 요청하는 것이 익숙하지 않다.",
    reverse: false,
  },
  {
    id: "guard_03",
    section: "guardedness",
    label: "Guardedness · 닫힌 태도",
    text: "나는 내 고민이나 시행착오를 안전한 방식으로 공유하는 것이 어렵다.",
    reverse: false,
  },
  {
    id: "guard_04",
    section: "guardedness",
    label: "Guardedness · 닫힌 태도",
    text: "나는 사람들과 연결되기보다 혼자 버티는 쪽을 택할 때가 많다.",
    reverse: false,
  },
  {
    id: "guard_05",
    section: "guardedness",
    label: "Guardedness · 닫힌 태도",
    text: "나는 다른 사람의 피드백이나 관심을 받기 전부터 경계할 때가 있다.",
    reverse: false,
  },
  {
    id: "guard_06",
    section: "guardedness",
    label: "Guardedness · 닫힌 태도",
    text: "나는 신상을 드러내지 않으면서도 배움과 실행을 공유할 수 있다는 방식이 아직 낯설다.",
    reverse: false,
  },

  // ─────────────────────────────────────────
  // 습관 시스템 (7)
  // 작게 만들기, 신호, 환경, 기록, 보상, 복귀 규칙
  // ─────────────────────────────────────────
  {
    id: "habit_01",
    section: "habit",
    label: "습관 시스템",
    text: "나는 목표를 작게 쪼개서 오늘 바로 할 수 있는 행동으로 바꾼다.",
    reverse: false,
  },
  {
    id: "habit_02",
    section: "habit",
    label: "습관 시스템",
    text: "나는 실패했을 때 의지 부족보다 시스템의 크기, 난이도, 환경 문제를 먼저 본다.",
    reverse: false,
  },
  {
    id: "habit_03",
    section: "habit",
    label: "습관 시스템",
    text: "나는 좋은 행동이 쉬워지도록 장소, 시간, 도구, 알림 같은 환경을 조정한다.",
    reverse: false,
  },
  {
    id: "habit_04",
    section: "habit",
    label: "습관 시스템",
    text: "나는 새로운 습관을 2분 안에 시작할 수 있을 만큼 작게 만들 수 있다.",
    reverse: false,
  },
  {
    id: "habit_05",
    section: "habit",
    label: "습관 시스템",
    text: "나는 행동을 시작하게 만드는 신호를 정해둔다. 예를 들면 시간, 장소, 기존 습관 뒤에 붙이는 방식이다.",
    reverse: false,
  },
  {
    id: "habit_06",
    section: "habit",
    label: "습관 시스템",
    text: "나는 행동 후 스스로 확인할 수 있는 작은 보상이나 체크 장치를 둔다.",
    reverse: false,
  },
  {
    id: "habit_07",
    section: "habit",
    label: "습관 시스템",
    text: "나는 습관이 끊겼을 때 다시 시작하는 복귀 규칙을 가지고 있다.",
    reverse: false,
  },

  // ─────────────────────────────────────────
  // 조직 활동 준비도 (7)
  // 익명성, 안전한 공유, 비교 금지, 권유 금지, 존중, 지속 참여
  // ─────────────────────────────────────────
  {
    id: "org_01",
    section: "org",
    label: "조직 활동 준비도",
    text: "나는 신상보다 방향성, 실행 과정, 시행착오를 중심으로 공유할 준비가 되어 있다.",
    reverse: false,
  },
  {
    id: "org_02",
    section: "org",
    label: "조직 활동 준비도",
    text: "나는 다른 사람을 평가하기보다 그 사람의 실행에서 배울 점을 찾을 수 있다.",
    reverse: false,
  },
  {
    id: "org_03",
    section: "org",
    label: "조직 활동 준비도",
    text: "나는 과시보다 기록, 실행, 복귀 과정을 공유하는 것에 집중할 수 있다.",
    reverse: false,
  },
  {
    id: "org_04",
    section: "org",
    label: "조직 활동 준비도",
    text: "나는 완벽한 결과가 아니어도 작은 시도나 배운 점을 안전하게 공유할 수 있다.",
    reverse: false,
  },
  {
    id: "org_05",
    section: "org",
    label: "조직 활동 준비도",
    text: "나는 종교, 정치, 사상, 영업, 투자 권유 없이 안전하게 활동할 수 있다.",
    reverse: false,
  },
  {
    id: "org_06",
    section: "org",
    label: "조직 활동 준비도",
    text: "나는 내 성과를 자랑하기보다 내가 겪은 시행착오와 회복 과정을 나눌 수 있다.",
    reverse: false,
  },
  {
    id: "org_07",
    section: "org",
    label: "조직 활동 준비도",
    text: "나는 다른 사람의 속도, 방식, 익명성을 존중하면서 함께 활동할 수 있다.",
    reverse: false,
  },
];

// 페이지 단위로 나누기 (5~8문항). 각 섹션을 하나의 페이지로 둠.
export const SURVEY_PAGES: { sectionId: SectionId; title: string; questions: Question[] }[] =
  SECTION_ORDER.map((sectionId) => {
    const sectionMeta = SECTION_META[sectionId];

    return {
      sectionId,
      title: sectionMeta.label,
      questions: QUESTIONS.filter((q) => q.section === sectionId),
    };
  });

export const TOTAL_QUESTIONS = QUESTIONS.length;
