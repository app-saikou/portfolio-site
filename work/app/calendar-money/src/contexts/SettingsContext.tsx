import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SettingsContextType {
  targetAge: number;
  setTargetAge: (age: number) => Promise<void>;
  targetAmount: number;
  setTargetAmount: (amount: number) => Promise<void>;
  isLoading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

interface SettingsProviderProps {
  children: React.ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  children,
}) => {
  const [targetAge, setTargetAgeState] = useState<number>(65); // デフォルトは65歳
  const [targetAmount, setTargetAmountState] = useState<number>(50000000); // デフォルトは5000万円
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedTargetAge = await AsyncStorage.getItem("targetAge");
      console.log("Debug: savedTargetAge =", savedTargetAge);
      if (savedTargetAge) {
        setTargetAgeState(parseInt(savedTargetAge, 10));
      }

      const savedTargetAmount = await AsyncStorage.getItem("targetAmount");
      console.log("Debug: savedTargetAmount =", savedTargetAmount);
      if (savedTargetAmount) {
        setTargetAmountState(parseInt(savedTargetAmount, 10));
      }
    } catch (error) {
      console.log("Error loading settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const setTargetAge = async (age: number) => {
    try {
      console.log("Debug: saving targetAge =", age);
      await AsyncStorage.setItem("targetAge", age.toString());
      setTargetAgeState(age);
    } catch (error) {
      console.log("Error saving target age:", error);
    }
  };

  const setTargetAmount = async (amount: number) => {
    try {
      console.log("Debug: saving targetAmount =", amount);
      await AsyncStorage.setItem("targetAmount", amount.toString());
      setTargetAmountState(amount);
    } catch (error) {
      console.log("Error saving target amount:", error);
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        targetAge,
        setTargetAge,
        targetAmount,
        setTargetAmount,
        isLoading,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
