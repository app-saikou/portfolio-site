import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import { formatCurrency } from "../utils/calculations";
import { Icon, ICONS } from "../components/Icon";
import { usersApi } from "../lib/supabaseClient";
import { useAuth } from "../hooks/useAuth";

export const TargetSettingsScreen: React.FC = () => {
  const { user } = useAuth();
  const [targetAge, setTargetAge] = useState(65);
  const [targetAmount, setTargetAmount] = useState(50000000);
  const [ageInput, setAgeInput] = useState("65");
  const [amountInput, setAmountInput] = useState("50000000");
  const [loading, setLoading] = useState(true);

  // Supabaseから目標設定を取得
  useEffect(() => {
    const loadTargetSettings = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const userData = await usersApi.getUser(user.id);

        if (userData.target_age) {
          setTargetAge(userData.target_age);
          setAgeInput(userData.target_age.toString());
        }

        if (userData.target_amount) {
          const amount = parseInt(userData.target_amount);
          setTargetAmount(amount);
          setAmountInput(userData.target_amount);
        }
      } catch (error) {
        console.error("目標設定の読み込みに失敗:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTargetSettings();
  }, [user]);

  const handleSaveAge = async () => {
    const age = parseInt(ageInput, 10);

    if (isNaN(age) || age < 18 || age > 120) {
      Alert.alert("エラー", "18歳から120歳の間で入力してください");
      return;
    }

    if (age <= 30) {
      // 仮の現在年齢との比較（実際のユーザー年齢は別途取得）
      Alert.alert("エラー", "現在の年齢より大きい値を入力してください");
      return;
    }

    try {
      await usersApi.updateUser(user!.id, { target_age: age });
      setTargetAge(age);
      Alert.alert("成功", "目標年齢が保存されました");
    } catch (error) {
      console.error("目標年齢の保存に失敗:", error);
      Alert.alert("エラー", "保存に失敗しました");
    }
  };

  const handleSaveAmount = async () => {
    const amount = parseInt(amountInput, 10);

    if (isNaN(amount) || amount < 1000000) {
      Alert.alert("エラー", "100万円以上で入力してください");
      return;
    }

    if (amount > 1000000000) {
      Alert.alert("エラー", "10億円以下で入力してください");
      return;
    }

    try {
      await usersApi.updateUser(user!.id, { target_amount: amount.toString() });
      setTargetAmount(amount);
      Alert.alert("成功", "目標資産額が保存されました");
    } catch (error) {
      console.error("目標資産額の保存に失敗:", error);
      Alert.alert("エラー", "保存に失敗しました");
    }
  };

  const presetAges = [60, 65, 70, 75];
  const presetAmounts = [30000000, 50000000, 100000000, 200000000]; // 3000万、5000万、1億、2億

  const formatAmount = (amount: string): string => {
    const num = parseInt(amount, 10) || 0;
    return formatCurrency(num);
  };

  return (
    <ScrollView style={styles.container}>
      {/* 目標年齢設定セクション */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionTitleContainer}>
          <Icon name={ICONS.TARGET} size={20} color="#333" />
          <Text style={styles.sectionTitle}> 目標年齢設定</Text>
        </View>
        <Text style={styles.sectionSubtitle}>
          資産予測の目標年齢を設定できます
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>目標年齢</Text>
          <TextInput
            style={styles.input}
            value={ageInput}
            onChangeText={setAgeInput}
            placeholder="例: 65"
            keyboardType="numeric"
          />
          <Text style={styles.helperText}>
            この年齢時点での資産額が予測されます
          </Text>
        </View>

        <View style={styles.presetContainer}>
          <Text style={styles.presetLabel}>よく使われる年齢</Text>
          <View style={styles.presetButtons}>
            {presetAges.map((age) => (
              <TouchableOpacity
                key={age}
                style={[
                  styles.presetButton,
                  parseInt(ageInput) === age && styles.presetButtonSelected,
                ]}
                onPress={() => setAgeInput(age.toString())}
              >
                <Text
                  style={[
                    styles.presetButtonText,
                    parseInt(ageInput) === age &&
                      styles.presetButtonTextSelected,
                  ]}
                >
                  {age}歳
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveAge}>
          <Icon name={ICONS.SAVE} size={18} color="#fff" />
          <Text style={styles.saveButtonText}>年齢を保存</Text>
        </TouchableOpacity>
      </View>

      {/* 目標資産額設定セクション */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionTitleContainer}>
          <Icon name={ICONS.MONEY} size={20} color="#333" />
          <Text style={styles.sectionTitle}> 目標資産額設定</Text>
        </View>
        <Text style={styles.sectionSubtitle}>
          達成したい資産額を設定できます
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>目標資産額</Text>
          <TextInput
            style={styles.input}
            value={amountInput}
            onChangeText={setAmountInput}
            placeholder="例: 50000000（5000万円）"
            keyboardType="numeric"
          />
          {amountInput && (
            <Text style={styles.formattedAmount}>
              {formatAmount(amountInput)}
            </Text>
          )}
          <Text style={styles.helperText}>
            いつ達成できるかがホーム画面に表示されます
          </Text>
        </View>

        <View style={styles.presetContainer}>
          <Text style={styles.presetLabel}>よく設定される金額</Text>
          <View style={styles.presetButtons}>
            {presetAmounts.map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.presetButton,
                  parseInt(amountInput) === amount &&
                    styles.presetButtonSelected,
                ]}
                onPress={() => setAmountInput(amount.toString())}
              >
                <Text
                  style={[
                    styles.presetButtonText,
                    parseInt(amountInput) === amount &&
                      styles.presetButtonTextSelected,
                  ]}
                >
                  {formatCurrency(amount)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveAmount}>
          <Icon name={ICONS.SAVE} size={18} color="#fff" />
          <Text style={styles.saveButtonText}>資産額を保存</Text>
        </TouchableOpacity>
      </View>

      {/* 説明セクション */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionTitleContainer}>
          <Icon name={ICONS.SUMMARY} size={20} color="#333" />
          <Text style={styles.sectionTitle}> 目標設定について</Text>
        </View>
        <Text style={styles.explanationText}>
          <Text style={styles.boldText}>目標年齢:</Text>
          {"\n"}•
          ホーム画面の資産ピーク予測で、設定した年齢時点での資産額が表示されます
          {"\n"}• 一般的には退職予定年齢（60-70歳）を設定することが多いです
          {"\n\n"}
          <Text style={styles.boldText}>目標資産額:</Text>
          {"\n"}• ホーム画面で、この金額にいつ到達できるかが表示されます{"\n"}•
          老後資金の目安として設定することをお勧めします{"\n"}•
          どちらもいつでも変更可能です
        </Text>
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
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E9ECEF",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#F8F9FA",
  },
  formattedAmount: {
    fontSize: 14,
    color: "#2196F3",
    marginTop: 4,
    fontWeight: "600",
  },
  helperText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  presetContainer: {
    marginBottom: 20,
  },
  presetLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  presetButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  presetButton: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E9ECEF",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  presetButtonSelected: {
    backgroundColor: "#2196F3",
    borderColor: "#2196F3",
  },
  presetButtonText: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
    textAlign: "center",
  },
  presetButtonTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#2196F3",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  explanationText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
  boldText: {
    fontWeight: "bold",
    color: "#333",
  },
});
