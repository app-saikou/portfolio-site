// Asset types
export interface Asset {
  id: string;
  name: string;
  type: "cash" | "stock";
  amount: number;
  annualReturn?: number; // 年利 (株式の場合のみ)
}

// Transaction types
export interface Transaction {
  id: string;
  date: string; // YYYY-MM-DD format
  amount: number; // 正の値: 収入、負の値: 支出
  description: string;
  type: "income" | "expense" | "stock_investment";
  fromAssetId?: string; // 支出元・移動元の資産ID
  toAssetId?: string; // 収入先・移動先の資産ID
}

// Budget types
export interface BudgetCategory {
  id: string;
  name: string;
  amount: number;
  type: 'income' | 'expense';
  startDate: string; // YYYY-MM-DD format
  endDate?: string; // YYYY-MM-DD format (undefined = 無期限)
}

export interface StockInvestment {
  id: string;
  name: string;
  amount: number;
  startDate: string; // YYYY-MM-DD format
  endDate?: string; // YYYY-MM-DD format (undefined = 無期限)
}

export interface MonthlyBudget {
  id: string;
  month: string; // YYYY-MM format
  income: number;
  expense: number;
  stockInvestments: StockInvestment[]; // 複数の株式投資設定
  startDate: string; // YYYY-MM-DD format
  endDate?: string; // YYYY-MM-DD format (undefined = 無期限)
}

// Calendar day data
export interface CalendarDayData {
  date: string; // YYYY-MM-DD format
  totalAssets: number;
  cashAmount: number;
  stockAmount: number;
  isToday: boolean;
  isPrediction: boolean; // 未来の予測データかどうか
}

// Navigation types
export type RootStackParamList = {
  Home: undefined;
  AssetManagement: undefined;
  BudgetSettings: undefined;
  TransactionHistory: undefined;
};

// Settings
export interface AppSettings {
  defaultStockAnnualReturn: number; // デフォルト年利
  displayCurrency: string;
}

// User and Onboarding types
export interface User {
  id: string;
  email: string;
  isOnboardingCompleted: boolean;
}

export interface OnboardingData {
  name: string;
  age: number;
  birthDate?: string; // ISO date string
  cashAmount: number;
  stockAmount: number;
  stockAnnualReturn: number;
  monthlyIncome: number;
  monthlyExpense: number;
  monthlyStockInvestment: number;
  targetAge?: number;
  targetAmount?: number;
}
