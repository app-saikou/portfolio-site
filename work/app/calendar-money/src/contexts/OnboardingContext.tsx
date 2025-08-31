import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { OnboardingData } from "../types";
import { useAuth } from "../hooks/useAuth";

interface OnboardingContextType {
  isOnboardingCompleted: boolean;
  onboardingData: OnboardingData | null;
  completeOnboarding: (data: OnboardingData) => Promise<void>;
  resetOnboarding: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};

interface OnboardingProviderProps {
  children: React.ReactNode;
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({
  children,
}) => {
  const { user } = useAuth();
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  // ユーザーが変更されたときにオンボーディング状態を読み込み
  useEffect(() => {
    const loadOnboardingState = async () => {
      if (!user) {
        setIsOnboardingCompleted(false);
        setOnboardingData(null);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("users")
          .select(
            "is_onboarding_completed, name, age, birth_date, target_age, target_amount"
          )
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("オンボーディング状態の読み込みに失敗:", error);
          setIsOnboardingCompleted(false);
        } else if (data) {
          setIsOnboardingCompleted(data.is_onboarding_completed || false);

          // オンボーディングデータを復元
          if (data.is_onboarding_completed && data.name) {
            const restoredData: OnboardingData = {
              name: data.name,
              age: data.age || 0,
              birthDate: data.birth_date || "",
              cashAmount: 0, // データベースから取得する必要がある
              stockAmount: 0, // データベースから取得する必要がある
              stockAnnualReturn: 0.05, // デフォルト値
              monthlyIncome: 0, // データベースから取得する必要がある
              monthlyExpense: 0, // データベースから取得する必要がある
              monthlyStockInvestment: 0, // データベースから取得する必要がある
              targetAge: data.target_age || 65,
              targetAmount: data.target_amount
                ? parseInt(data.target_amount)
                : 50000000,
            };
            setOnboardingData(restoredData);
          }
        }
      } catch (error) {
        console.error("オンボーディング状態の読み込みに失敗:", error);
        setIsOnboardingCompleted(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadOnboardingState();
  }, [user]);

  const completeOnboarding = async (data: OnboardingData) => {
    if (!user) {
      console.error("ユーザーがログインしていません");
      return;
    }

    try {
      // ユーザーテーブルを更新
      const { error: userError } = await supabase
        .from("users")
        .update({
          name: data.name,
          age: data.age,
          birth_date: data.birthDate,
          target_age: data.targetAge,
          target_amount: data.targetAmount.toString(),
          is_onboarding_completed: true,
        })
        .eq("id", user.id);

      if (userError) {
        console.error("ユーザー情報の更新に失敗:", userError);
        return;
      }

      setIsOnboardingCompleted(true);
      setOnboardingData(data);
    } catch (error) {
      console.error("オンボーディング完了の保存に失敗:", error);
    }
  };

  const resetOnboarding = async () => {
    if (!user) {
      console.error("ユーザーがログインしていません");
      return;
    }

    try {
      const { error } = await supabase
        .from("users")
        .update({
          is_onboarding_completed: false,
        })
        .eq("id", user.id);

      if (error) {
        console.error("オンボーディング状態のリセットに失敗:", error);
        return;
      }

      setIsOnboardingCompleted(false);
      setOnboardingData(null);
    } catch (error) {
      console.error("オンボーディング状態のリセットに失敗:", error);
    }
  };

  if (isLoading) {
    return null; // またはローディングコンポーネント
  }

  const value: OnboardingContextType = {
    isOnboardingCompleted,
    onboardingData,
    completeOnboarding,
    resetOnboarding,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};
