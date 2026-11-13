import type { CommandData } from "@ui-sdk/react/command";

/** Fake BO / mall commands for the palette demo. */
export const COMMANDS: CommandData = [
  {
    type: "group",
    label: "이동",
    items: [
      {
        value: "nav-home",
        label: "홈으로 이동",
        keywords: ["home", "대시보드"],
      },
      {
        value: "nav-products",
        label: "상품 목록 열기",
        keywords: ["product", "상품"],
      },
      {
        value: "nav-std-category",
        label: "표준 카테고리 트리 열기",
        keywords: ["category", "카테고리", "표준"],
      },
      {
        value: "nav-orders",
        label: "주문 목록 열기",
        keywords: ["order", "주문"],
      },
    ],
  },
  { type: "separator" },
  {
    type: "group",
    label: "생성",
    items: [
      {
        value: "create-product",
        label: "새 상품 등록",
        keywords: ["new", "create", "상품"],
        shortcut: "mod+n",
      },
      {
        value: "create-category",
        label: "새 표준 카테고리 추가",
        keywords: ["category", "추가"],
      },
      {
        value: "create-coupon",
        label: "쿠폰 만들기",
        keywords: ["coupon", "쿠폰"],
      },
    ],
  },
  { type: "separator" },
  {
    type: "group",
    label: "설정",
    items: [
      {
        value: "settings-theme",
        label: "테마 바꾸기…",
        keywords: ["theme", "dark", "light"],
        shortcut: "mod+t",
      },
      {
        value: "settings-profile",
        label: "내 프로필",
        keywords: ["profile", "계정"],
        shortcut: "mod+p",
      },
      {
        value: "settings-billing",
        label: "결제 / 정산",
        keywords: ["billing", "정산"],
      },
      {
        value: "settings-disabled",
        label: "실험실 (비활성)",
        keywords: ["lab", "실험"],
        disabled: true,
      },
    ],
  },
];

export const SUGGESTED_COMMANDS: CommandData = [
  {
    type: "group",
    label: "추천",
    items: [
      { value: "nav-std-category", label: "표준 카테고리 트리 열기" },
      { value: "create-product", label: "새 상품 등록" },
      { value: "settings-theme", label: "테마 바꾸기…" },
    ],
  },
];

export const COMMAND_LABELS: Record<string, string> = {
  "nav-home": "홈으로 이동",
  "nav-products": "상품 목록 열기",
  "nav-std-category": "표준 카테고리 트리 열기",
  "nav-orders": "주문 목록 열기",
  "create-product": "새 상품 등록",
  "create-category": "새 표준 카테고리 추가",
  "create-coupon": "쿠폰 만들기",
  "settings-theme": "테마 바꾸기…",
  "settings-profile": "내 프로필",
  "settings-billing": "결제 / 정산",
  "settings-disabled": "실험실 (비활성)",
};
