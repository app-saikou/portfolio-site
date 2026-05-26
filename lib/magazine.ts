// 雑誌の号データ型
export type MagazineIssue = {
  id: string; // 一意のID（例: "prototype", "2025-01"）
  year: number | null; // 年（プロトタイプの場合はnull）
  month: number | null; // 月（プロトタイプの場合はnull）
  isPrototype: boolean; // プロトタイプかどうか
  pageCount: number; // ページ数
  imagePath: string; // 画像のパス（例: "/magazine/Solo Dev/"）
  displayName: string; // 表示名（例: "プロトタイプ", "2025年1月号"）
  comingSoon?: boolean; // Coming Soonかどうか
};

// 雑誌の号データ
export const magazineIssues: MagazineIssue[] = [
  {
    id: "prototype",
    year: null,
    month: null,
    isPrototype: true,
    pageCount: 12,
    imagePath: "/magazine/Solo Dev/",
    displayName: "プロトタイプ",
  },
];

// IDから号を取得
export function getMagazineIssue(id: string): MagazineIssue | undefined {
  return magazineIssues.find((issue) => issue.id === id);
}

// デフォルトの号ID（プロトタイプ）
export const defaultIssueId = "prototype";

