import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { useAuth } from "../hooks/useAuth";
import { Icon, ICONS } from "../components/Icon";

export const AccountSettingsScreen: React.FC = () => {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container}>
      {/* ユーザー情報セクション */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionTitleContainer}>
          <Icon name={ICONS.USER} size={20} color="#333" />
          <Text style={styles.sectionTitle}> ユーザー情報</Text>
        </View>
        <Text style={styles.sectionSubtitle}>現在のアカウント情報</Text>

        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoLabel}>📧 メールアドレス</Text>
          <Text style={styles.userInfoValue}>{user?.email || "未設定"}</Text>
        </View>

        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoLabel}>🆔 ユーザーID</Text>
          <Text style={styles.userInfoValue}>{user?.id || "未設定"}</Text>
        </View>

        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoLabel}>✅ オンボーディング状況</Text>
          <Text style={styles.userInfoValue}>
            {user?.isOnboardingCompleted ? "完了" : "未完了"}
          </Text>
        </View>
      </View>

      {/* アカウント管理セクション */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionTitleContainer}>
          <Icon name={ICONS.SETTINGS} size={20} color="#333" />
          <Text style={styles.sectionTitle}> アカウント管理</Text>
        </View>
        <Text style={styles.sectionSubtitle}>アカウントの操作</Text>

        <View style={styles.comingSoonContainer}>
          <Text style={styles.comingSoonText}>🚧 近日追加予定</Text>
          <Text style={styles.comingSoonSubtext}>
            • パスワード変更{"\n"}• プロフィール編集{"\n"}• データエクスポート
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  sectionContainer: {
    backgroundColor: "#fff",
    margin: 15,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 8,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  userInfoContainer: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  userInfoLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  userInfoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  comingSoonContainer: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E9ECEF",
    borderStyle: "dashed",
    marginBottom: 20,
  },
  comingSoonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  comingSoonSubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    lineHeight: 20,
  },
});
