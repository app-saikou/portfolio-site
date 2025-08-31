import { Asset, MonthlyBudget, Transaction, CalendarDayData } from "../types";

export interface PeakAssetInfo {
  peakAmount: number;
  peakDate: string;
  yearsFromNow: number;
  monthsFromNow: number;
  peakAge?: number;
  assetAtTargetAge?: number;
  targetAge?: number;
  targetAchieveDate?: string;
  targetAchieveYears?: number;
  targetAchieveMonths?: number;
  isTargetAchievable?: boolean;
}

/**
 * 通貨をフォーマットして表示用に変換
 */
export const formatCurrency = (amount: number): string => {
  if (amount >= 100000000) {
    // 1億円以上
    return `${Math.round(amount / 100000000)}億円`;
  } else if (amount >= 10000) {
    // 1万円以上
    return `${Math.round(amount / 10000)}万円`;
  } else if (amount >= 1000) {
    // 1000円以上
    return `${Math.round(amount / 1000)}千円`;
  } else {
    return `${Math.round(amount)}円`;
  }
};

/**
 * 日付文字列をDateオブジェクトに変換
 */
export const parseDate = (dateString: string): Date => {
  return new Date(dateString + "T00:00:00");
};

/**
 * DateオブジェクトをYYYY-MM-DD形式の文字列に変換
 */
export const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

/**
 * 月の最初の日を取得
 */
export const getFirstDayOfMonth = (year: number, month: number): Date => {
  return new Date(year, month - 1, 1);
};

/**
 * 月の最後の日を取得
 */
export const getLastDayOfMonth = (year: number, month: number): Date => {
  return new Date(year, month, 0);
};

/**
 * 日付が今日より未来かどうかを判定
 */
export const isFutureDate = (dateString: string): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = parseDate(dateString);
  return targetDate > today;
};

/**
 * 複利計算
 */
export const calculateCompoundInterest = (
  principal: number,
  annualRate: number,
  months: number
): number => {
  const monthlyRate = annualRate / 12;
  return principal * Math.pow(1 + monthlyRate, months);
};

/**
 * 特定の月における資産の予測値を計算
 */
export const calculateAssetValueAtMonth = (
  asset: Asset,
  startDate: Date,
  targetDate: Date,
  monthlyInvestment: number = 0
): number => {
  if (asset.type === "cash") {
    // 現金は単純に積立額を加算
    const monthsDiff = getMonthsDifference(startDate, targetDate);
    return asset.amount + monthlyInvestment * monthsDiff;
  } else if (asset.type === "stock" && asset.annualReturn) {
    // 株式は複利計算と積立を考慮
    const monthsDiff = getMonthsDifference(startDate, targetDate);

    // 元本の複利計算
    const compoundedPrincipal = calculateCompoundInterest(
      asset.amount,
      asset.annualReturn,
      monthsDiff
    );

    // 積立分の複利計算（各月の積立額が残り期間で複利運用される）
    let accumulatedInvestment = 0;
    for (let i = 0; i < monthsDiff; i++) {
      const remainingMonths = monthsDiff - i - 1;
      accumulatedInvestment += calculateCompoundInterest(
        monthlyInvestment,
        asset.annualReturn,
        remainingMonths
      );
    }

    return compoundedPrincipal + accumulatedInvestment;
  }

  return asset.amount;
};

/**
 * 2つの日付間の月数差を計算
 */
export const getMonthsDifference = (startDate: Date, endDate: Date): number => {
  const yearsDiff = endDate.getFullYear() - startDate.getFullYear();
  const monthsDiff = endDate.getMonth() - startDate.getMonth();
  return yearsDiff * 12 + monthsDiff;
};

/**
 * 特定の日付における取引を適用した資産額を計算
 */
export const applyTransactionsToAssets = (
  assets: Asset[],
  transactions: Transaction[],
  upToDate: string
): Asset[] => {
  const relevantTransactions = transactions.filter((t) => t.date <= upToDate);
  const updatedAssets = assets.map((asset) => ({ ...asset }));

  relevantTransactions.forEach((transaction) => {
    if (transaction.type === "stock_investment") {
      // 株式投資の場合、現金から株式に移動
      const cashAsset = updatedAssets.find((a) => a.type === "cash");
      const stockAsset = updatedAssets.find((a) => a.type === "stock");

      if (cashAsset && stockAsset) {
        cashAsset.amount -= Math.abs(transaction.amount);
        stockAsset.amount += Math.abs(transaction.amount);
      }
    } else {
      // 通常の収支の場合、現金資産に反映
      const cashAsset = updatedAssets.find((a) => a.type === "cash");
      if (cashAsset) {
        cashAsset.amount += transaction.amount;
      }
    }
  });

  return updatedAssets;
};

/**
 * 資産の将来予測データを計算してカレンダー用データを生成
 */
export const calculateAssetProjection = (
  assets: Asset[],
  budgets: MonthlyBudget[],
  transactions: Transaction[]
): Record<string, CalendarDayData> => {
  const result: Record<string, CalendarDayData> = {};
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth() - 6, 1); // 6か月前から
  const endDate = new Date(today.getFullYear() + 2, today.getMonth(), 0); // 2年後まで

  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateString = formatDate(currentDate);
    const isPrediction = isFutureDate(dateString);
    const isToday = formatDate(currentDate) === formatDate(today);

    let dayAssets: Asset[];

    if (!isPrediction) {
      // 過去・現在の場合、実際の取引を適用
      dayAssets = applyTransactionsToAssets(assets, transactions, dateString);
    } else {
      // 未来の場合、固定予算と年利を考慮して計算
      // 固定予算として最初の予算を使用（毎月同じ予算を適用）
      const fixedBudget = budgets.length > 0 ? budgets[0] : null;

      // 今日の資産状況を起点とする
      const baseAssets = applyTransactionsToAssets(
        assets,
        transactions,
        formatDate(today)
      );

      // 月初の判定
      const isMonthStart = currentDate.getDate() === 1;

      // 初期資産額
      let cashAmount = baseAssets.find((a) => a.type === "cash")?.amount || 0;
      let stockAmount = baseAssets.find((a) => a.type === "stock")?.amount || 0;

      const monthlyStockInvestment = fixedBudget
        ? fixedBudget.stockInvestment
        : 0;
      const monthlyNetCash = fixedBudget
        ? fixedBudget.income - fixedBudget.expense
        : 0;

      // 月初の処理
      if (isMonthStart) {
        // 1. 毎月の収支（収入−支出）を月初に現金に加算
        cashAmount += monthlyNetCash;

        // 2. 毎月の積立額を月初に現金から株式へ移動
        if (monthlyStockInvestment > 0) {
          cashAmount -= monthlyStockInvestment;
          stockAmount += monthlyStockInvestment;
        }
      }

      // 3. 株式資産は年利を365日で割った日利を使って、日ごとに複利で成長させる
      if (stockAmount > 0) {
        const stockAsset = baseAssets.find((a) => a.type === "stock");
        if (stockAsset && stockAsset.annualReturn) {
          // 年利を日利に変換
          const dailyRate = stockAsset.annualReturn / 365;

          // その日の複利計算
          stockAmount = stockAmount * (1 + dailyRate);
        }
      }

      dayAssets = baseAssets.map((asset) => {
        if (asset.type === "cash") {
          return {
            ...asset,
            amount: cashAmount,
          };
        } else if (asset.type === "stock") {
          return {
            ...asset,
            amount: stockAmount,
          };
        }
        return asset;
      });
    }

    const totalAssets = dayAssets.reduce((sum, asset) => sum + asset.amount, 0);
    const cashAmount = dayAssets
      .filter((asset) => asset.type === "cash")
      .reduce((sum, asset) => sum + asset.amount, 0);
    const stockAmount = dayAssets
      .filter((asset) => asset.type === "stock")
      .reduce((sum, asset) => sum + asset.amount, 0);

    // デバッグ: 月初の計算を確認
    const isMonthStart = currentDate.getDate() === 1;

    if (isMonthStart) {
      console.log(
        `Debug: ${dateString} - Cash: ${cashAmount}, Stock: ${stockAmount}, Total: ${totalAssets}`
      );
    }

    result[dateString] = {
      date: dateString,
      totalAssets,
      cashAmount,
      stockAmount,
      isToday,
      isPrediction,
    };

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
};

/**
 * ピーク資産情報を計算
 */
export const calculatePeakAssetInfo = (
  calendarData: Record<string, CalendarDayData>,
  userAge?: number,
  targetAge?: number,
  targetAmount?: number
): PeakAssetInfo => {
  console.log("Debug: calculatePeakAssetInfo called with:", {
    userAge,
    targetAge,
    targetAmount,
    calendarDataKeys: Object.keys(calendarData).length,
  });
  const today = new Date();
  let peakAmount = 0;
  let peakDate = "";

  // 全ての日付から最大資産額とその日付を見つける
  Object.entries(calendarData).forEach(([date, data]) => {
    if (data.totalAssets > peakAmount) {
      peakAmount = data.totalAssets;
      peakDate = date;
    }
  });

  // ピーク日付までの期間を計算
  const peakDateObj = parseDate(peakDate);
  const diffTime = peakDateObj.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const yearsFromNow = Math.floor(diffDays / 365);
  const monthsFromNow = Math.floor((diffDays % 365) / 30);

  // ピーク時の年齢を計算
  let peakAge: number | undefined;
  if (userAge) {
    peakAge = userAge + yearsFromNow;
  }

  let assetAtTargetAge: number | undefined;
  let targetAchieveDate: string | undefined;
  let targetAchieveYears: number | undefined;
  let targetAchieveMonths: number | undefined;
  let isTargetAchievable: boolean | undefined;

  // 設定年齢時点の資産額を計算
  if (userAge && targetAge) {
    const yearsToTarget = targetAge - userAge;
    const targetDate = new Date(today);
    targetDate.setFullYear(targetDate.getFullYear() + yearsToTarget);

    // 目標年齢の日付を探す（最も近い日付を選択）
    let closestDate = "";
    let minDiff = Infinity;

    Object.keys(calendarData).forEach((dateString) => {
      const date = parseDate(dateString);
      const diff = Math.abs(date.getTime() - targetDate.getTime());
      if (diff < minDiff) {
        minDiff = diff;
        closestDate = dateString;
      }
    });

    if (closestDate && calendarData[closestDate]) {
      assetAtTargetAge = calendarData[closestDate].totalAssets;
      console.log(
        `Debug: Found target age asset at ${closestDate}: ${assetAtTargetAge}`
      );
    } else {
      console.log(`Debug: No calendar data found for target age ${targetAge}`);
    }
  }

  // 目標資産額の達成予定日を計算
  if (targetAmount) {
    const sortedDates = Object.keys(calendarData).sort();
    let found = false;

    for (const dateString of sortedDates) {
      const data = calendarData[dateString];
      if (data.totalAssets >= targetAmount) {
        targetAchieveDate = dateString;
        const achieveDate = parseDate(dateString);
        const diffTime = achieveDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        targetAchieveYears = Math.floor(diffDays / 365);
        targetAchieveMonths = Math.floor((diffDays % 365) / 30);
        found = true;
        break;
      }
    }

    // 目標達成可否を判定
    isTargetAchievable = found;
  }

  return {
    peakAmount,
    peakDate,
    yearsFromNow,
    monthsFromNow,
    peakAge,
    assetAtTargetAge,
    targetAge,
    targetAchieveDate,
    targetAchieveYears,
    targetAchieveMonths,
    isTargetAchievable,
  };
};
