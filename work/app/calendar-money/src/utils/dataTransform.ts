import { Tables } from "../lib/supabase";
import {
  Asset,
  Transaction,
  BudgetCategory,
  StockInvestment,
  OnboardingData,
} from "../types";

// Supabase Users → App OnboardingData
export const transformUserToOnboardingData = (
  user: Tables<"users">
): OnboardingData => {
  return {
    name: user.name || "",
    age: user.age || 0,
    birth_date: user.birth_date || "",
    cashAmount: 0, // 初期値、assetsから取得する必要がある
    stockAmount: 0, // 初期値、assetsから取得する必要がある
    stockAnnualReturn: 0.05, // 初期値、assetsから取得する必要がある
    monthlyIncome: 0, // 初期値、budget_categoriesから取得する必要がある
    monthlyExpense: 0, // 初期値、budget_categoriesから取得する必要がある
    monthlyStockInvestment: 0, // 初期値、stock_investmentsから取得する必要がある
    targetAge: user.target_age || 65,
    targetAmount: parseFloat(user.target_amount || "50000000"),
  };
};

// Supabase Assets → App Assets
export const transformSupabaseAssetToAsset = (
  supabaseAsset: Tables<"assets">
): Asset => {
  return {
    id: supabaseAsset.id,
    name: supabaseAsset.name,
    type: supabaseAsset.type,
    amount: parseFloat(supabaseAsset.amount),
    annualReturn: supabaseAsset.annual_return
      ? parseFloat(supabaseAsset.annual_return)
      : 0.05,
  };
};

// App Assets → Supabase Assets
export const transformAssetToSupabaseAsset = (
  asset: Omit<Asset, "id">,
  userId: string
): Omit<Tables<"assets">, "id" | "created_at" | "updated_at"> => {
  return {
    user_id: userId,
    name: asset.name,
    type: asset.type,
    amount: asset.amount.toString(),
    annual_return: asset.annualReturn.toString(),
  };
};

// Supabase Transactions → App Transactions
export const transformSupabaseTransactionToTransaction = (
  supabaseTransaction: Tables<"transactions"> & {
    from_asset?: { id: string; name: string } | null;
    to_asset?: { id: string; name: string } | null;
  }
): Transaction => {
  return {
    id: supabaseTransaction.id,
    date: supabaseTransaction.date,
    amount: parseFloat(supabaseTransaction.amount),
    description: supabaseTransaction.description,
    type: supabaseTransaction.type,
    fromAssetId: supabaseTransaction.from_asset_id || undefined,
    toAssetId: supabaseTransaction.to_asset_id || undefined,
  };
};

// App Transactions → Supabase Transactions
export const transformTransactionToSupabaseTransaction = (
  transaction: Omit<Transaction, "id">,
  userId: string
): Omit<Tables<"transactions">, "id" | "created_at" | "updated_at"> => {
  return {
    user_id: userId,
    date: transaction.date,
    amount: transaction.amount.toString(),
    description: transaction.description,
    type: transaction.type,
    from_asset_id: transaction.fromAssetId || null,
    to_asset_id: transaction.toAssetId || null,
  };
};

// Supabase Budget Categories → App Budget Categories
export const transformSupabaseBudgetCategoryToBudgetCategory = (
  supabaseCategory: Tables<"budget_categories">
): BudgetCategory => {
  return {
    id: supabaseCategory.id,
    name: supabaseCategory.name,
    amount: parseFloat(supabaseCategory.amount),
    type: supabaseCategory.type,
    startDate: supabaseCategory.start_date,
    endDate: supabaseCategory.end_date || undefined,
  };
};

// App Budget Categories → Supabase Budget Categories
export const transformBudgetCategoryToSupabaseBudgetCategory = (
  category: Omit<BudgetCategory, "id">,
  userId: string
): Omit<Tables<"budget_categories">, "id" | "created_at" | "updated_at"> => {
  return {
    user_id: userId,
    name: category.name,
    amount: category.amount.toString(),
    type: category.type,
    start_date: category.startDate,
    end_date: category.endDate || null,
  };
};

// Supabase Stock Investments → App Stock Investments
export const transformSupabaseStockInvestmentToStockInvestment = (
  supabaseInvestment: Tables<"stock_investments">
): StockInvestment => {
  return {
    id: supabaseInvestment.id,
    name: supabaseInvestment.name,
    amount: parseFloat(supabaseInvestment.amount),
    startDate: supabaseInvestment.start_date,
    endDate: supabaseInvestment.end_date || undefined,
  };
};

// App Stock Investments → Supabase Stock Investments
export const transformStockInvestmentToSupabaseStockInvestment = (
  investment: Omit<StockInvestment, "id">,
  userId: string
): Omit<Tables<"stock_investments">, "id" | "created_at" | "updated_at"> => {
  return {
    user_id: userId,
    name: investment.name,
    amount: investment.amount.toString(),
    start_date: investment.startDate,
    end_date: investment.endDate || null,
  };
};

// オンボーディングデータから初期資産を作成
export const createInitialAssetsFromOnboarding = (
  onboardingData: OnboardingData,
  userId: string
) => {
  const assets = [];

  if (onboardingData.cashAmount > 0) {
    assets.push({
      user_id: userId,
      name: "現金",
      type: "cash" as const,
      amount: onboardingData.cashAmount.toString(),
      annual_return: "0.00",
    });
  }

  if (onboardingData.stockAmount > 0) {
    assets.push({
      user_id: userId,
      name: "株式",
      type: "stock" as const,
      amount: onboardingData.stockAmount.toString(),
      annual_return: onboardingData.stockAnnualReturn.toString(),
    });
  }

  return assets;
};

// オンボーディングデータから初期予算カテゴリを作成
export const createInitialBudgetCategoriesFromOnboarding = (
  onboardingData: OnboardingData,
  userId: string
) => {
  const categories = [];
  const today = new Date().toISOString().split("T")[0];

  if (onboardingData.monthlyIncome > 0) {
    categories.push({
      user_id: userId,
      name: "収入",
      amount: onboardingData.monthlyIncome.toString(),
      type: "income" as const,
      start_date: today,
      end_date: null,
    });
  }

  if (onboardingData.monthlyExpense > 0) {
    categories.push({
      user_id: userId,
      name: "支出",
      amount: onboardingData.monthlyExpense.toString(),
      type: "expense" as const,
      start_date: today,
      end_date: null,
    });
  }

  return categories;
};

// オンボーディングデータから初期株式投資を作成
export const createInitialStockInvestmentsFromOnboarding = (
  onboardingData: OnboardingData,
  userId: string
) => {
  const investments = [];
  const today = new Date().toISOString().split("T")[0];

  if (onboardingData.monthlyStockInvestment > 0) {
    investments.push({
      user_id: userId,
      name: "月次積立",
      amount: onboardingData.monthlyStockInvestment.toString(),
      start_date: today,
      end_date: null,
    });
  }

  return investments;
};
