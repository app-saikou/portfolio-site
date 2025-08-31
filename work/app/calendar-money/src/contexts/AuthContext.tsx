import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, OnboardingData } from "../types";

interface User {
  id: string;
  name: string;
  age: number;
  email: string;
  isOnboardingCompleted: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (userId: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: (userData: {
    name: string;
    age: number;
    cashAmount: number;
    stockAmount: number;
    stockAnnualReturn: number;
    monthlyIncome: number;
    monthlyExpense: number;
    monthlyStockInvestment: number;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.log("Error checking auth state:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userId: string, email: string) => {
    try {
      // TODO: 実際の認証処理をSupabaseで実装
      const newUser: User = {
        id: userId,
        name: "",
        age: 0,
        email,
        isOnboardingCompleted: false,
      };

      await AsyncStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.log("Error during login:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  const completeOnboarding = async (userData: OnboardingData) => {
    try {
      if (!user) return;

      const updatedUser: User = {
        ...user,
        name: userData.name,
        age: userData.age,
        isOnboardingCompleted: true,
      };

      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));

      // オンボーディングデータを保存
      await AsyncStorage.setItem("onboardingData", JSON.stringify(userData));

      // 目標値もSettingsContextで使えるように保存
      if (userData.targetAge) {
        await AsyncStorage.setItem("targetAge", userData.targetAge.toString());
      }
      if (userData.targetAmount) {
        await AsyncStorage.setItem(
          "targetAmount",
          userData.targetAmount.toString()
        );
      }

      setUser(updatedUser);
    } catch (error) {
      console.log("Error completing onboarding:", error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    completeOnboarding,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
