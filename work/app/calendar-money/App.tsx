import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Text, View, ActivityIndicator, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { AssetProvider } from "./src/contexts/AssetContext";
import { SettingsProvider } from "./src/contexts/SettingsContext";
import {
  OnboardingProvider,
  useOnboarding,
} from "./src/contexts/OnboardingContext";
import { useAuth } from "./src/hooks/useAuth";
import { HomeScreen } from "./src/screens/HomeScreen";
import { AssetManagementScreen } from "./src/screens/AssetManagementScreen";
import { SettingsScreen } from "./src/screens/SettingsScreen";
import { AccountSettingsScreen } from "./src/screens/AccountSettingsScreen";
import { BudgetSettingsScreen } from "./src/screens/BudgetSettingsScreen";
import { TargetSettingsScreen } from "./src/screens/TargetSettingsScreen";
import { TransactionScreen } from "./src/screens/TransactionScreen";
import { AuthScreen } from "./src/screens/AuthScreen";
import { OnboardingScreen } from "./src/screens/OnboardingScreen";

const Tab = createBottomTabNavigator();
const SettingsStack = createNativeStackNavigator();

// 設定関連のスタックナビゲーター
const SettingsStackScreen: React.FC = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#2196F3",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <SettingsStack.Screen
        name="SettingsMain"
        component={SettingsScreen}
        options={{
          title: "設定",
        }}
      />
      <SettingsStack.Screen
        name="AccountSettings"
        component={AccountSettingsScreen}
        options={{
          title: "アカウント設定",
        }}
      />
      <SettingsStack.Screen
        name="BudgetSettings"
        component={BudgetSettingsScreen}
        options={{
          title: "予算設定",
        }}
      />
      <SettingsStack.Screen
        name="TargetSettings"
        component={TargetSettingsScreen}
        options={{
          title: "目標設定",
        }}
      />
    </SettingsStack.Navigator>
  );
};

// メインアプリコンポーネント（認証状態に基づいて表示を切り替え）
const MainApp: React.FC = () => {
  const { user, loading } = useAuth();
  const { isOnboardingCompleted, completeOnboarding } = useOnboarding();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>読み込み中...</Text>
      </View>
    );
  }

  // 未ログインの場合
  if (!user) {
    return <AuthScreen />;
  }

  // ログイン済みだがオンボーディング未完了の場合
  if (!isOnboardingCompleted) {
    return <OnboardingScreen onComplete={completeOnboarding} />;
  }

  // ログイン済みでオンボーディング完了の場合
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Assets") {
              iconName = focused ? "wallet" : "wallet-outline";
            } else if (route.name === "Transaction") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            } else {
              iconName = "help-circle-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#2196F3",
          tabBarInactiveTintColor: "#8E8E93",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#E5E5EA",
            paddingBottom: 8,
            paddingTop: 8,
            height: 88,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
            marginTop: 4,
          },
          headerStyle: {
            backgroundColor: "#2196F3",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "ホーム",
            tabBarLabel: "ホーム",
          }}
        />
        <Tab.Screen
          name="Assets"
          component={AssetManagementScreen}
          options={{
            title: "資産管理",
            tabBarLabel: "資産",
          }}
        />
        <Tab.Screen
          name="Transaction"
          component={TransactionScreen}
          options={{
            title: "収支登録",
            tabBarLabel: "取引",
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsStackScreen}
          options={{
            title: "設定",
            tabBarLabel: "設定",
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
});

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AssetProvider>
        <SettingsProvider>
          <OnboardingProvider>
            <MainApp />
          </OnboardingProvider>
        </SettingsProvider>
      </AssetProvider>
    </>
  );
}
