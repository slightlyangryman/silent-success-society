// data/obstacles.ts
// 7가지 장애물 해석

import { SectionId } from "./questions";

export type ObstacleId = Extract<
  SectionId,
  "aimlessness" | "boredom" | "comfort" | "delusion" | "ego" | "fear" | "guardedness"
>;

export interface ObstacleDetail {
  id: ObstacleId;
  name: string;
  shortLabel: string;
  currentState: string;
  commonThoughts: string[];
  howItBlocks: string;
  prescription: string[];
  twoMinuteAction: string;
}

export const OBSTACLES: Record<ObstacleId, ObstacleDetail> = {
  aimlessness: {
    id: "aimlessness",
    name: "Aimlessness · 목적 상실",
    shortLabel: "목적 상실",
    currentState:
      "현재는 ‘무엇을 위해 노력하는가’가 흐릿한 상태입니다. 바쁘게 움직여도 방향이 보이지 않으면 같은 자리를 도는 느낌이 들 수 있습니다.",
    commonThoughts: [
      "“열심히 살고는 있는데 어디로 가는지 모르겠다.”",
      "“해야 할 일이 너무 많아서 무엇부터 해야 할지 모르겠다.”",
      "“남들이 좋다고 하는 목표를 따라가는 느낌이 든다.”",
    ],
    howItBlocks:
      "방향이 흐리면 작은 노력도 분산되어 결과로 누적되지 않습니다. 의지의 문제가 아니라 ‘이번 달의 전투’가 정해지지 않은 상태일 가능성이 큽니다.",
    prescription: [
      "이번 달의 ‘단 하나의 전투’를 한 문장으로 정의하기",
      "그 전투와 무관한 일들을 한 번에 다 줄이려 하지 말고, 한 가지부터 제거하기",
      "주 1회 5분간 ‘이번 주 방향이 맞는지’ 점검하는 시간 갖기",
    ],
    twoMinuteAction: "이번 달의 한 가지 전투를 한 문장으로 노트에 적기.",
  },

  boredom: {
    id: "boredom",
    name: "Boredom · 지루함",
    shortLabel: "지루함",
    currentState:
      "현재는 새로운 자극이 들어오는 통로가 좁아진 상태입니다. 반복 자체가 문제는 아니지만, 호기심의 입구가 닫히면 무기력이 따라옵니다.",
    commonThoughts: [
      "“요즘 새로운 것이 별로 없다.”",
      "“궁금했던 것을 끝까지 파고드는 시간이 줄었다.”",
      "“새로운 시도보다 익숙한 자극을 더 자주 찾는다.”",
    ],
    howItBlocks:
      "지루함은 능력의 문제가 아니라 ‘좋은 질문이 끊긴 상태’입니다. 질문이 멈추면 학습이 멈추고, 학습이 멈추면 실행도 점점 의미를 잃습니다.",
    prescription: [
      "이번 주 ‘작은 호기심 한 가지’를 메모로 남기기",
      "익숙한 자극(숏폼, SNS) 대신 짧은 글 한 편 읽기로 대체해보기",
      "‘질문 노트’를 만들어 떠오르는 질문을 쌓아두기",
    ],
    twoMinuteAction: "오늘 떠오른 작은 질문 한 가지를 노트에 적기.",
  },

  comfort: {
    id: "comfort",
    name: "Comfort · 안락함",
    shortLabel: "안락함",
    currentState:
      "현재는 불편을 피하는 회로가 잘 작동하는 상태입니다. 잠시 쉬는 것은 좋지만, 그것이 ‘기본값’이 되면 성장이 멈춥니다.",
    commonThoughts: [
      "“내일부터 하면 된다.”",
      "“오늘은 피곤하니까 다음에.”",
      "“너무 힘든 건 일단 미루자.”",
    ],
    howItBlocks:
      "안락함은 의지 부족이 아니라 ‘실패하기 쉬운 행동’이 너무 크게 설계되어 있는 신호입니다. 작은 행동도 부담스럽다면, 더 줄여야 합니다.",
    prescription: [
      "오늘의 목표를 절반 또는 10분의 1로 줄이기",
      "2분 안에 시작할 수 있는 행동으로 변환하기",
      "방해 요인(휴대폰, 자극) 하나를 물리적으로 멀리 두기",
    ],
    twoMinuteAction: "오늘의 목표 중 한 가지를 ‘2분 안에 할 수 있는 행동’으로 다시 적기.",
  },

  delusion: {
    id: "delusion",
    name: "Delusion · 자기기만",
    shortLabel: "자기기만",
    currentState:
      "현재는 ‘하고 있는 것 같다’와 ‘실제로 하고 있다’의 경계가 흐릿할 수 있습니다. 머릿속 계획은 활발한데, 실제 행동이 그만큼 따라가지 못하는 구조입니다.",
    commonThoughts: [
      "“이건 다 머릿속에서는 정리돼 있다.”",
      "“노력했는데 결과가 없을 뿐이다.”",
      "“이건 내가 진짜 원하는 거니까 곧 할 거다.”",
    ],
    howItBlocks:
      "자기기만은 ‘성실하다는 감각’만 남고 ‘결과’가 사라지는 상태입니다. 자기 비난이 아니라, 단지 ‘실제 행동’을 측정 가능한 방식으로 기록해야 합니다.",
    prescription: [
      "행동 기록을 ‘완료/미완료’로 단순하게 표시하기",
      "주 1회 ‘이번 주에 실제로 만든 결과물’을 한 줄로 적기",
      "‘하고 싶은 일’과 ‘하고 있는 일’을 같은 페이지에 나란히 적기",
    ],
    twoMinuteAction: "이번 주에 실제로 완성한 것이 있다면 한 줄로 적고, 없다면 ‘없음’이라고 솔직하게 적기.",
  },

  ego: {
    id: "ego",
    name: "Ego · 자존심",
    shortLabel: "자존심",
    currentState:
      "현재는 ‘틀린 것’이 ‘부족한 사람’으로 연결되는 회로가 강한 상태일 수 있습니다. 이것이 강하면 피드백이 들어올 때 문을 닫게 됩니다.",
    commonThoughts: [
      "“이건 내가 더 잘 알고 있다.”",
      "“도움을 받으면 약해 보일 것 같다.”",
      "“이번엔 그냥 내 방식대로 해본다.”",
    ],
    howItBlocks:
      "자존심은 단기적으로는 추진력이지만, 장기적으로는 학습의 가장 큰 차단막이 됩니다. 결과를 만든 사람들은 대부분 피드백을 빠르게 흡수합니다.",
    prescription: [
      "이번 주 한 사람에게 ‘작은 도움 요청’ 한 가지 해보기",
      "피드백을 받을 때 처음 떠오르는 반응을 잠시 적어두고, 다음 날 다시 보기",
      "내가 가장 약한 부분을 노트에 솔직하게 한 줄 적기",
    ],
    twoMinuteAction: "이번 주에 ‘도움받고 싶은 한 가지 주제’를 한 줄로 적기.",
  },

  fear: {
    id: "fear",
    name: "Fear · 두려움",
    shortLabel: "두려움",
    currentState:
      "현재는 ‘공개되는 것’과 ‘평가받는 것’에 대한 민감도가 높은 상태일 수 있습니다. 두려움은 자연스러운 감각이며, 작게 다루면 추진력으로 바꿀 수 있습니다.",
    commonThoughts: [
      "“아직 준비가 안 됐다.”",
      "“이런 걸 공유하면 어떻게 볼까.”",
      "“완벽하지 않으면 보여줄 수 없다.”",
    ],
    howItBlocks:
      "두려움은 보통 ‘행동이 너무 큰 단위로 설계되어 있을 때’ 강해집니다. 행동을 더 작게 만들면 두려움도 자연스럽게 작아집니다.",
    prescription: [
      "‘완성도 70%면 공개한다’는 기준을 미리 정해두기",
      "결과물을 ‘1명에게만’ 보여주는 단계부터 시작하기",
      "두려움이 가장 큰 행동을 ‘2분 행동’으로 한 번 더 쪼개기",
    ],
    twoMinuteAction: "지금 미루고 있는 일 중 한 가지를 ‘2분 안에 끝낼 수 있는 단계’로 다시 적기.",
  },

  guardedness: {
    id: "guardedness",
    name: "Guardedness · 닫힌 태도",
    shortLabel: "닫힌 태도",
    currentState:
      "현재는 ‘혼자 해결한다’가 기본 모드인 상태일 수 있습니다. 익명을 유지하면서도 시행착오를 공유할 수 있다는 감각이 아직 자연스럽지 않을 수 있습니다.",
    commonThoughts: [
      "“이런 건 혼자 처리하는 게 낫다.”",
      "“내 고민을 굳이 누군가에게 말하기 부담스럽다.”",
      "“내가 약하게 보일 수도 있다.”",
    ],
    howItBlocks:
      "닫힌 태도는 안전을 지키지만, 동시에 외부에서 들어올 수 있는 작은 단서들을 차단합니다. 익명 공유라는 ‘안전한 방식’부터 익히면 좋습니다.",
    prescription: [
      "신상이 아닌 ‘과정’만 공유하는 방식을 시도해보기",
      "‘성공’이 아니라 ‘시행착오’를 한 줄로 적어두는 연습",
      "신뢰할 수 있는 1명에게 안전한 주제로 짧게 공유해보기",
    ],
    twoMinuteAction: "이번 주에 ‘안전하게 공유할 수 있는 주제’ 한 가지를 한 줄로 적기.",
  },
};

export const OBSTACLE_ORDER: ObstacleId[] = [
  "aimlessness",
  "boredom",
  "comfort",
  "delusion",
  "ego",
  "fear",
  "guardedness",
];
