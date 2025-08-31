import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Icon, ICONS } from "../components/Icon";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AssetCalendar } from "../components/AssetCalendar";
import { useAssets } from "../contexts/AssetContext";
import {
  calculatePeakAssetInfo,
  formatCurrency,
  PeakAssetInfo,
} from "../utils/calculations";
import { OnboardingData } from "../types";
import { usersApi } from "../lib/supabaseClient";
import { useAuth } from "../hooks/useAuth";
import { Tables } from "../lib/supabase";

export const HomeScreen: React.FC = () => {
  const { user } = useAuth();
  const [showTooltip, setShowTooltip] = useState(true);
  const [peakAssetInfo, setPeakAssetInfo] = useState<PeakAssetInfo | null>(
    null
  );
  const [userAge, setUserAge] = useState<number | null>(null);
  const [targetAge, setTargetAge] = useState(65);
  const [targetAmount, setTargetAmount] = useState(50000000);
  const { calendarData } = useAssets();

  useEffect(() => {
    checkFirstTime();
    loadUserData();
    loadTargetSettings();
  }, [user]);

  useEffect(() => {
    if (calendarData && Object.keys(calendarData).length > 0) {
      calculatePeakInfo();
    }
  }, [calendarData, userAge, targetAge, targetAmount]);

  const checkFirstTime = async () => {
    try {
      const hasSeenTooltip = await AsyncStorage.getItem(
        "hasSeenCalendarTooltip"
      );
      if (hasSeenTooltip === "true") {
        setShowTooltip(false);
      }
    } catch (error) {
      console.log("Error checking first time:", error);
    }
  };

  const loadUserData = async () => {
    try {
      const onboardingData = await AsyncStorage.getItem("onboardingData");
      console.log("Debug: onboardingData from storage =", onboardingData);
      if (onboardingData) {
        const data: OnboardingData = JSON.parse(onboardingData);
        console.log("Debug: parsed onboarding data =", data);
        if (data.birthDate) {
          const today = new Date();
          const birthDate = new Date(data.birthDate);
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();

          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
          ) {
            age--;
          }
          console.log("Debug: calculated age =", age);
          setUserAge(age);
        } else {
          console.log("Debug: no birthDate in onboarding data");
        }
      } else {
        console.log("Debug: no onboarding data found");
      }
    } catch (error) {
      console.log("Error loading user data:", error);
    }
  };

  // Supabaseから目標設定を取得
  const loadTargetSettings = async () => {
    if (!user) return;

    try {
      const userData: Tables<"users"> = await usersApi.getUser(user.id);

      if (userData.target_age) {
        setTargetAge(userData.target_age);
      }

      if (userData.target_amount) {
        const amount = parseInt(userData.target_amount);
        setTargetAmount(amount);
      }
    } catch (error) {
      console.error("目標設定の読み込みに失敗:", error);
    }
  };

  const calculatePeakInfo = () => {
    if (calendarData && Object.keys(calendarData).length > 0) {
      console.log("Debug: userAge =", userAge);
      console.log("Debug: targetAge =", targetAge);
      console.log("Debug: targetAmount =", targetAmount);
      const info = calculatePeakAssetInfo(
        calendarData,
        userAge || undefined,
        targetAge,
        targetAmount
      );
      console.log("Debug: peakAssetInfo =", info);
      setPeakAssetInfo(info);
    }
  };

  const hideTooltip = async () => {
    try {
      await AsyncStorage.setItem("hasSeenCalendarTooltip", "true");
      setShowTooltip(false);
    } catch (error) {
      console.log("Error hiding tooltip:", error);
    }
  };

  const handleDayPress = () => {
    // 日付がタップされた時の処理（必要に応じて実装）
  };

  return (
    <ScrollView style={styles.container}>
      {/* ピーク資産情報セクション */}
      {peakAssetInfo && (
        <View style={styles.peakAssetContainer}>
          <View style={styles.peakAssetTitleContainer}>
            <Icon name={ICONS.CHART} size={20} color="#333" />
            <Text style={styles.peakAssetTitle}> 資産予測サマリー</Text>
          </View>

          <View style={styles.peakAssetContent}>
            <View style={styles.peakAssetMainInfo}>
              <View style={styles.peakAssetLabelContainer}>
                <Icon
                  name={ICONS.INCOME}
                  size={16}
                  color="#2196F3"
                  style={styles.peakAssetIcon}
                />
                <Text style={styles.peakAssetLabel}> ピーク予測</Text>
              </View>
              <Text style={styles.peakAssetAmount}>
                {formatCurrency(peakAssetInfo.peakAmount)}
              </Text>
              <Text style={styles.peakAssetTiming}>
                {peakAssetInfo.peakAge && `${peakAssetInfo.peakAge}歳 (`}
                {peakAssetInfo.yearsFromNow > 0 &&
                  `${peakAssetInfo.yearsFromNow}年`}
                {peakAssetInfo.monthsFromNow > 0 &&
                  `${peakAssetInfo.monthsFromNow}ヶ月`}
                後{peakAssetInfo.peakAge && ")"}
              </Text>
            </View>

            <View style={styles.targetInfoContainer}>
              {peakAssetInfo.assetAtTargetAge && peakAssetInfo.targetAge && (
                <View style={styles.targetInfo}>
                  <Text style={styles.targetLabel}>
                    {peakAssetInfo.targetAge}歳時点
                  </Text>
                  <Text style={styles.targetAmount}>
                    {formatCurrency(peakAssetInfo.assetAtTargetAge)}
                  </Text>
                </View>
              )}

              {targetAmount && (
                <View style={styles.targetInfo}>
                  <Text style={styles.targetLabel}>
                    目標達成({formatCurrency(targetAmount)})
                  </Text>
                  {peakAssetInfo.isTargetAchievable ? (
                    <>
                      <Text style={styles.targetTiming}>
                        {peakAssetInfo.targetAchieveYears! > 0 &&
                          `${peakAssetInfo.targetAchieveYears}年`}
                        {peakAssetInfo.targetAchieveMonths! > 0 &&
                          `${peakAssetInfo.targetAchieveMonths}ヶ月`}
                        後
                      </Text>
                      <Text style={styles.targetAgeInfo}>
                        {userAge &&
                          peakAssetInfo.targetAchieveYears &&
                          `${userAge + peakAssetInfo.targetAchieveYears}歳${
                            peakAssetInfo.targetAchieveMonths
                          }ヶ月`}
                      </Text>
                    </>
                  ) : (
                    <Text style={styles.targetUnachievable}>
                      達成できません
                    </Text>
                  )}
                </View>
              )}
            </View>
          </View>
        </View>
      )}

      {/* カレンダー */}
      <View style={styles.calendarContainer}>
        {showTooltip && (
          <TouchableOpacity
            style={styles.tooltipContainer}
            onPress={hideTooltip}
          >
            <Text style={styles.tooltipText}>
              💡 日付をタップして詳細を確認できます
            </Text>
            <Text style={styles.tooltipClose}>✕</Text>
          </TouchableOpacity>
        )}
        <AssetCalendar onDayPress={handleDayPress} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  peakAssetContainer: {
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  peakAssetTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 2,
  },
  peakAssetTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  peakAssetLabelContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  peakAssetIcon: {
    marginTop: 2,
  },
  peakAssetContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  peakAssetMainInfo: {
    flex: 1,
  },
  peakAssetLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginLeft: 6,
    marginBottom: 8,
  },
  peakAssetAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2196F3",
    marginBottom: 4,
  },
  peakAssetTiming: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  targetInfoContainer: {
    paddingLeft: 16,
    borderLeftWidth: 1,
    borderLeftColor: "#E9ECEF",
    gap: 12,
  },
  targetInfo: {
    alignItems: "flex-end",
  },
  targetLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  targetAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  targetTiming: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF9800",
  },
  targetAgeInfo: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  targetUnachievable: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F44336",
    marginTop: 4,
  },
  summaryContainer: {
    backgroundColor: "#fff",
    margin: 15,
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  mainAssetSection: {
    marginBottom: 16,
  },
  totalAssetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  totalAssetLabel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  periodSelector: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  periodText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  totalAssetAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  changeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  changeIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  changeText: {
    fontSize: 14,
    fontWeight: "600",
  },
  changePercent: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  assetBreakdown: {
    flexDirection: "row",
    gap: 8,
  },
  assetCard: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  assetCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  assetIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  assetIconText: {
    fontSize: 16,
  },
  assetType: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  assetAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  assetPercentage: {
    height: 4,
    backgroundColor: "#E9ECEF",
    borderRadius: 2,
    marginBottom: 4,
    overflow: "hidden",
  },
  percentageBar: {
    height: "100%",
    borderRadius: 2,
  },
  percentageText: {
    fontSize: 11,
    color: "#666",
    fontWeight: "500",
  },
  breakdownToggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  breakdownToggleText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  breakdownToggleIcon: {
    fontSize: 12,
    color: "#666",
    fontWeight: "bold",
  },

  calendarContainer: {
    marginHorizontal: 0,
    marginBottom: 10,
    backgroundColor: "transparent",
    padding: 0,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  calendarSubtitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  spacer: {
    height: 20,
  },
  tooltipContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#E3F2FD",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  tooltipText: {
    flex: 1,
    fontSize: 12,
    color: "#1976D2",
    fontWeight: "500",
  },
  tooltipClose: {
    fontSize: 16,
    color: "#1976D2",
    fontWeight: "bold",
    marginLeft: 8,
  },
});
