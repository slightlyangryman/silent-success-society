// data/guideContent.ts
// 안내 페이지에 들어갈 카드 콘텐츠

export interface GuideCard {
  title: string;
  definition: string;
  whenLacking: string;
  todaysQuestion: string;
}

export const GUIDE_CARDS: GuideCard[] = [
  {
    title: "Work란 무엇인가",
    definition:
      "여기서 Work는 직업이나 돈벌이만이 아닙니다. 세상에 무엇인가를 추가하는 모든 행동, 즉 배우고 만들고 기록하고 공유하는 활동을 의미합니다.",
    whenLacking:
      "Work의 정의가 좁아지면 ‘월급 받는 일’ 이외의 시간이 모두 소비로만 흐릅니다.",
    todaysQuestion: "지난 한 주 동안 ‘세상에 무엇인가를 추가하는 행동’을 한 적이 있는가?",
  },
  {
    title: "Mapping · 설계",
    definition:
      "왜 하는지 정의하는 힘입니다. 목표, 우선순위, 방향성, 가치관, ‘이번 달의 전투’를 설정하는 능력입니다.",
    whenLacking: "열심히 살고 있는데 어디로 가는지 모르는 상태가 됩니다.",
    todaysQuestion: "지금 이번 달의 ‘단 하나의 전투’를 한 문장으로 말할 수 있는가?",
  },
  {
    title: "Making · 실행",
    definition:
      "실제로 손을 움직여 결과물을 만드는 힘입니다. 행동, 기록, 공유, 실험, 작은 산출물 완성이 모두 포함됩니다.",
    whenLacking: "생각과 계획은 많지만 현실이 잘 바뀌지 않는 상태가 됩니다.",
    todaysQuestion: "이번 주에 ‘실제로 완성한 작은 결과물’이 하나라도 있는가?",
  },
  {
    title: "Meshing · 성장",
    definition:
      "배우고, 연결하고, 시야를 확장하는 힘입니다. 독서, 학습, 피드백, 새로운 경험, 기술 습득이 여기에 해당합니다.",
    whenLacking: "단기 성과는 가능하지만 장기적으로 정체되거나 번아웃에 가까워집니다.",
    todaysQuestion: "지난 한 달 동안 ‘새로 배운 것’이라고 부를 만한 것이 있는가?",
  },
  {
    title: "5가지 행동 유형",
    definition:
      "Mapping · Making · Meshing의 조합으로 현재의 행동 패턴을 다섯 가지로 본 모습입니다. 낙인이 아니라 ‘지금 어디에 있는가’를 보는 지도입니다.",
    whenLacking: "유형이 보이지 않으면, 같은 자리를 반복적으로 도는 이유를 설명하기 어렵습니다.",
    todaysQuestion: "지금 가장 부족하다고 느끼는 축은 어디인가? (방향 · 실행 · 학습 중)",
  },
  {
    title: "7가지 장애물",
    definition:
      "Aimlessness · Boredom · Comfort · Delusion · Ego · Fear · Guardedness. 이것은 성격이 아니라, 현재 실행을 막고 있는 ‘작동 패턴’입니다.",
    whenLacking: "장애물의 이름이 없으면, 실행이 막힐 때마다 자신을 비난하게 됩니다.",
    todaysQuestion: "지금 가장 자주 마주치는 장애물은 무엇인가?",
  },
  {
    title: "작심삼일을 줄이는 습관 원리",
    definition:
      "결과를 만든 사람들이 공통으로 쓰는 원리입니다. 시스템 우선, 정체성 기반 습관, 2분 법칙, 신호 → 행동 → 보상, 환경 설계, 습관 추적, 주기적 리뷰.",
    whenLacking: "작심삼일이 반복될 때, 보통 ‘의지가 부족하다’가 아니라 ‘시스템이 너무 크게 설계되어 있다’가 정답입니다.",
    todaysQuestion: "오늘 ‘실패하기 어려운 2분 행동’ 한 가지를 정의할 수 있는가?",
  },
  {
    title: "조직 활동 원칙",
    definition:
      "신상을 묻지 않고 방향성과 시행착오를 공유합니다. 과시 없이, 종교·정치·사상·영업·투자 권유 없이, 조용히 자신의 전투를 진행합니다.",
    whenLacking: "원칙이 흐릿하면, 함께 모이는 자리도 결국 비교의 장이 되거나 외부 자극의 통로가 됩니다.",
    todaysQuestion: "내가 이 자리에서 ‘공유할 수 있는 안전한 주제’는 무엇인가?",
  },
];
