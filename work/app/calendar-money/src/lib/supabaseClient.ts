import { supabase, Tables, Inserts, Updates } from "./supabase";

// Users
export const usersApi = {
  // ユーザー情報を取得
  getUser: async (userId: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data;
  },

  // ユーザー情報を更新
  updateUser: async (userId: string, updates: Updates<"users">) => {
    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // オンボーディング完了
  completeOnboarding: async (
    userId: string,
    onboardingData: {
      name: string;
      age: number;
      birth_date: string;
      target_age: number;
      target_amount: number;
    }
  ) => {
    const { data, error } = await supabase
      .from("users")
      .update({
        ...onboardingData,
        is_onboarding_completed: true,
      })
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

// Assets
export const assetsApi = {
  // ユーザーの資産一覧を取得
  getAssets: async (userId: string) => {
    const { data, error } = await supabase
      .from("assets")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data;
  },

  // 資産を追加
  createAsset: async (asset: Inserts<"assets">) => {
    const { data, error } = await supabase
      .from("assets")
      .insert(asset)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 資産を更新
  updateAsset: async (assetId: string, updates: Updates<"assets">) => {
    const { data, error } = await supabase
      .from("assets")
      .update(updates)
      .eq("id", assetId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 資産を削除
  deleteAsset: async (assetId: string) => {
    const { error } = await supabase.from("assets").delete().eq("id", assetId);

    if (error) throw error;
  },
};

// Transactions
export const transactionsApi = {
  // ユーザーの取引一覧を取得
  getTransactions: async (userId: string) => {
    const { data, error } = await supabase
      .from("transactions")
      .select(
        `
        *,
        from_asset:assets!from_asset_id(id, name),
        to_asset:assets!to_asset_id(id, name)
      `
      )
      .eq("user_id", userId)
      .order("date", { ascending: false });

    if (error) throw error;
    return data;
  },

  // 取引を追加
  createTransaction: async (transaction: Inserts<"transactions">) => {
    const { data, error } = await supabase
      .from("transactions")
      .insert(transaction)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 取引を更新
  updateTransaction: async (
    transactionId: string,
    updates: Updates<"transactions">
  ) => {
    const { data, error } = await supabase
      .from("transactions")
      .update(updates)
      .eq("id", transactionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 取引を削除
  deleteTransaction: async (transactionId: string) => {
    const { error } = await supabase
      .from("transactions")
      .delete()
      .eq("id", transactionId);

    if (error) throw error;
  },
};

// Budget Categories
export const budgetCategoriesApi = {
  // ユーザーの予算カテゴリ一覧を取得
  getBudgetCategories: async (userId: string) => {
    const { data, error } = await supabase
      .from("budget_categories")
      .select("*")
      .eq("user_id", userId)
      .order("start_date", { ascending: true });

    if (error) throw error;
    return data;
  },

  // 予算カテゴリを追加
  createBudgetCategory: async (category: Inserts<"budget_categories">) => {
    const { data, error } = await supabase
      .from("budget_categories")
      .insert(category)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 予算カテゴリを更新
  updateBudgetCategory: async (
    categoryId: string,
    updates: Updates<"budget_categories">
  ) => {
    const { data, error } = await supabase
      .from("budget_categories")
      .update(updates)
      .eq("id", categoryId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 予算カテゴリを削除
  deleteBudgetCategory: async (categoryId: string) => {
    const { error } = await supabase
      .from("budget_categories")
      .delete()
      .eq("id", categoryId);

    if (error) throw error;
  },
};

// Stock Investments
export const stockInvestmentsApi = {
  // ユーザーの株式投資一覧を取得
  getStockInvestments: async (userId: string) => {
    const { data, error } = await supabase
      .from("stock_investments")
      .select("*")
      .eq("user_id", userId)
      .order("start_date", { ascending: true });

    if (error) throw error;
    return data;
  },

  // 株式投資を追加
  createStockInvestment: async (investment: Inserts<"stock_investments">) => {
    const { data, error } = await supabase
      .from("stock_investments")
      .insert(investment)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 株式投資を更新
  updateStockInvestment: async (
    investmentId: string,
    updates: Updates<"stock_investments">
  ) => {
    const { data, error } = await supabase
      .from("stock_investments")
      .update(updates)
      .eq("id", investmentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 株式投資を削除
  deleteStockInvestment: async (investmentId: string) => {
    const { error } = await supabase
      .from("stock_investments")
      .delete()
      .eq("id", investmentId);

    if (error) throw error;
  },
};

// Calendar Cache
export const calendarCacheApi = {
  // ユーザーのカレンダーキャッシュを取得
  getCalendarCache: async (
    userId: string,
    startDate: string,
    endDate: string
  ) => {
    const { data, error } = await supabase
      .from("calendar_cache")
      .select("*")
      .eq("user_id", userId)
      .gte("date", startDate)
      .lte("date", endDate)
      .order("date", { ascending: true });

    if (error) throw error;
    return data;
  },

  // カレンダーキャッシュを追加/更新
  upsertCalendarCache: async (cacheData: Inserts<"calendar_cache">) => {
    const { data, error } = await supabase
      .from("calendar_cache")
      .upsert(cacheData, { onConflict: "user_id,date" })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // カレンダーキャッシュを削除
  deleteCalendarCache: async (userId: string, date: string) => {
    const { error } = await supabase
      .from("calendar_cache")
      .delete()
      .eq("user_id", userId)
      .eq("date", date);

    if (error) throw error;
  },
};
