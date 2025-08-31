import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface IconProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  style?: any;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = "#333",
  style,
}) => {
  return <Ionicons name={name} size={size} color={color} style={style} />;
};

// よく使うアイコンの定数
export const ICONS = {
  // 資産・お金関連
  MONEY: "wallet" as const,
  STOCK: "trending-up" as const,
  CASH: "cash" as const,
  INVESTMENT: "analytics" as const,

  // 収支関連
  INCOME: "trending-up" as const,
  EXPENSE: "trending-down" as const,
  TRANSACTION: "add-circle" as const,
  BUDGET: "calculator" as const,

  // 設定・管理
  SETTINGS: "settings" as const,
  USER: "person" as const,
  TARGET: "flag" as const,
  NOTIFICATION: "notifications" as const,
  THEME: "color-palette" as const,
  DATA: "document-text" as const,
  LOGOUT: "log-out" as const,

  // アクション
  EDIT: "create" as const,
  DELETE: "trash" as const,
  SAVE: "save" as const,
  ADD: "add" as const,

  // その他
  HOME: "home" as const,
  CHART: "bar-chart" as const,
  SUMMARY: "list" as const,
  HELP: "help-circle" as const,
} as const;
