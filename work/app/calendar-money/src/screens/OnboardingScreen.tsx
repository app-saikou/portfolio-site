import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { OnboardingData } from "../types";
import {
  budgetCategoriesApi,
  stockInvestmentsApi,
} from "../lib/supabaseClient";
import { useAuth } from "../hooks/useAuth";

interface OnboardingScreenProps {
  onComplete: (data: OnboardingData) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<Partial<OnboardingData>>({});
  const { user } = useAuth();

  // ステップ1: 名前・生年月日
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState(new Date(1990, 0, 1)); // デフォルト: 1990年1月1日
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempBirthDate, setTempBirthDate] = useState(new Date(1990, 0, 1)); // 一時的な選択値

  // ステップ2: 資産額
  const [cashAmount, setCashAmount] = useState("");
  const [stockAmount, setStockAmount] = useState("");
  const [stockAnnualReturn, setStockAnnualReturn] = useState("5");

  // ステップ3: 予算
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyExpense, setMonthlyExpense] = useState("");
  const [monthlyStockInvestment, setMonthlyStockInvestment] = useState("");

  // ステップ4: 目標設定
  const [targetAge, setTargetAge] = useState("65");
  const [targetAmount, setTargetAmount] = useState("50000000");

  // 年齢計算関数
  const calculateAge = (birthDate: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  // 日付フォーマット関数
  const formatBirthDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}年${month}月${day}日`;
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      if (!name) {
        Alert.alert("エラー", "名前を入力してください");
        return;
      }
      const age = calculateAge(birthDate);
      setData({ ...data, name, age });
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!cashAmount || !stockAmount) {
        Alert.alert("エラー", "現金と株式の金額を入力してください");
        return;
      }
      setData({
        ...data,
        cashAmount: parseFloat(cashAmount),
        stockAmount: parseFloat(stockAmount),
        stockAnnualReturn: parseFloat(stockAnnualReturn) / 100,
      });
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!monthlyIncome || !monthlyExpense) {
        Alert.alert("エラー", "収入と支出を入力してください");
        return;
      }
      setData({
        ...data,
        monthlyIncome: parseFloat(monthlyIncome),
        monthlyExpense: parseFloat(monthlyExpense),
        monthlyStockInvestment: parseFloat(monthlyStockInvestment) || 0,
      });
      setCurrentStep(4);
    } else {
      if (!targetAge || !targetAmount) {
        Alert.alert("エラー", "目標年齢と目標資産額を入力してください");
        return;
      }
      const finalData: OnboardingData = {
        name,
        age: calculateAge(birthDate),
        birthDate: birthDate.toISOString().split("T")[0], // YYYY-MM-DD format
        cashAmount: parseFloat(cashAmount),
        stockAmount: parseFloat(stockAmount),
        stockAnnualReturn: parseFloat(stockAnnualReturn) / 100,
        monthlyIncome: parseFloat(monthlyIncome),
        monthlyExpense: parseFloat(monthlyExpense),
        monthlyStockInvestment: parseFloat(monthlyStockInvestment) || 0,
        targetAge: parseInt(targetAge),
        targetAmount: parseInt(targetAmount),
      };

      // オンボーディング完了時に予算データを自動登録
      await registerBudgetFromOnboarding(finalData);

      onComplete(finalData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const formatCurrency = (amount: number): string => {
    if (amount >= 10000) {
      return `${Math.round(amount / 10000)}万円`;
    }
    return `${Math.round(amount)}円`;
  };

  // オンボーディング完了時に予算データを自動登録
  const registerBudgetFromOnboarding = async (
    onboardingData: OnboardingData
  ) => {
    if (!user) {
      console.error("ユーザーがログインしていません");
      return;
    }

    const today = new Date();
    const todayString = today.toISOString().split("T")[0]; // YYYY-MM-DD format

    try {
      // 収入カテゴリを作成
      await budgetCategoriesApi.createBudgetCategory({
        user_id: user.id,
        name: "収入",
        amount: onboardingData.monthlyIncome.toString(),
        type: "income",
        start_date: todayString,
        end_date: null, // 無期限
      });

      // 支出カテゴリを作成
      await budgetCategoriesApi.createBudgetCategory({
        user_id: user.id,
        name: "支出",
        amount: onboardingData.monthlyExpense.toString(),
        type: "expense",
        start_date: todayString,
        end_date: null, // 無期限
      });

      // 株式投資設定を作成（月次積立額が0より大きい場合のみ）
      if (onboardingData.monthlyStockInvestment > 0) {
        await stockInvestmentsApi.createStockInvestment({
          user_id: user.id,
          name: "月次積立",
          amount: onboardingData.monthlyStockInvestment.toString(),
          start_date: todayString,
          end_date: null, // 無期限
        });
      }

      console.log("オンボーディング予算データの登録が完了しました");
    } catch (error) {
      console.error("オンボーディング予算データの登録に失敗:", error);
    }
  };

  const renderStep1 = () => {
    const currentAge = calculateAge(birthDate);

    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>👋 はじめまして！</Text>
        <Text style={styles.stepSubtitle}>あなたのことを教えてください</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>👤 お名前（ニックネーム可）</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="例: 太郎、タロウ"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>🎂 生年月日</Text>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => {
              setTempBirthDate(birthDate);
              setShowDatePicker(true);
            }}
          >
            <Text style={styles.datePickerText}>
              {formatBirthDate(birthDate)}
            </Text>
            <Text style={styles.datePickerIcon}>📅</Text>
          </TouchableOpacity>
          <Text style={styles.ageDisplay}>現在の年齢: {currentAge}歳</Text>
        </View>

        {Platform.OS === "ios" ? (
          <Modal
            visible={showDatePicker}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>生年月日を選択</Text>
                </View>
                <DateTimePicker
                  value={tempBirthDate}
                  mode="date"
                  display="spinner"
                  locale="ja-JP"
                  onChange={(event, selectedDate) => {
                    if (selectedDate) {
                      setTempBirthDate(selectedDate);
                    }
                  }}
                  maximumDate={new Date()}
                  minimumDate={new Date(1900, 0, 1)}
                />
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setShowDatePicker(false)}
                  >
                    <Text style={styles.cancelButtonText}>キャンセル</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.okButton}
                    onPress={() => {
                      setBirthDate(tempBirthDate);
                      setShowDatePicker(false);
                    }}
                  >
                    <Text style={styles.okButtonText}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        ) : (
          showDatePicker && (
            <DateTimePicker
              value={birthDate}
              mode="date"
              display="default"
              locale="ja-JP"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate && event.type !== "dismissed") {
                  setBirthDate(selectedDate);
                }
              }}
              maximumDate={new Date()}
              minimumDate={new Date(1900, 0, 1)}
            />
          )
        )}
      </View>
    );
  };

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>💰 現在の資産</Text>
      <Text style={styles.stepSubtitle}>現在お持ちの資産を教えてください</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>💵 現金・預金</Text>
        <TextInput
          style={styles.input}
          value={cashAmount}
          onChangeText={setCashAmount}
          placeholder="例: 1000000（100万円）"
          keyboardType="numeric"
        />
        {cashAmount && (
          <Text style={styles.formattedAmount}>
            {formatCurrency(parseFloat(cashAmount))}
          </Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>📈 株式・投資信託</Text>
        <TextInput
          style={styles.input}
          value={stockAmount}
          onChangeText={setStockAmount}
          placeholder="例: 500000（50万円）"
          keyboardType="numeric"
        />
        {stockAmount && (
          <Text style={styles.formattedAmount}>
            {formatCurrency(parseFloat(stockAmount))}
          </Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>📊 株式の想定年利（%）</Text>
        <TextInput
          style={styles.input}
          value={stockAnnualReturn}
          onChangeText={setStockAnnualReturn}
          placeholder="例: 5（5%）"
          keyboardType="numeric"
        />
        <Text style={styles.helperText}>
          将来予測に使用します。一般的には3-7%程度です。
        </Text>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>📋 毎月の予算</Text>
      <Text style={styles.stepSubtitle}>毎月の収支予算を設定しましょう</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>📈 月収入</Text>
        <TextInput
          style={styles.input}
          value={monthlyIncome}
          onChangeText={setMonthlyIncome}
          placeholder="例: 300000（30万円）"
          keyboardType="numeric"
        />
        {monthlyIncome && (
          <Text style={styles.formattedAmount}>
            {formatCurrency(parseFloat(monthlyIncome))}
          </Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>📉 月支出</Text>
        <TextInput
          style={styles.input}
          value={monthlyExpense}
          onChangeText={setMonthlyExpense}
          placeholder="例: 200000（20万円）"
          keyboardType="numeric"
        />
        {monthlyExpense && (
          <Text style={styles.formattedAmount}>
            {formatCurrency(parseFloat(monthlyExpense))}
          </Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>📊 月次株式投資額</Text>
        <TextInput
          style={styles.input}
          value={monthlyStockInvestment}
          onChangeText={setMonthlyStockInvestment}
          placeholder="例: 50000（5万円）"
          keyboardType="numeric"
        />
        {monthlyStockInvestment && (
          <Text style={styles.formattedAmount}>
            {formatCurrency(parseFloat(monthlyStockInvestment))}
          </Text>
        )}
        <Text style={styles.helperText}>毎月積立投資する金額（任意）</Text>
      </View>
    </View>
  );

  const renderStep4 = () => {
    const presetAges = [60, 65, 70, 75];
    const presetAmounts = [30000000, 50000000, 100000000, 200000000];

    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>🎯 目標設定</Text>
        <Text style={styles.stepSubtitle}>将来の目標を設定しましょう</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>🎂 目標年齢</Text>
          <TextInput
            style={styles.input}
            value={targetAge}
            onChangeText={setTargetAge}
            placeholder="例: 65"
            keyboardType="numeric"
          />
          <Text style={styles.helperText}>
            この年齢時点での資産額が予測されます
          </Text>

          <View style={styles.presetContainer}>
            {presetAges.map((age) => (
              <TouchableOpacity
                key={age}
                style={[
                  styles.presetButton,
                  parseInt(targetAge) === age && styles.presetButtonSelected,
                ]}
                onPress={() => setTargetAge(age.toString())}
              >
                <Text
                  style={[
                    styles.presetButtonText,
                    parseInt(targetAge) === age &&
                      styles.presetButtonTextSelected,
                  ]}
                >
                  {age}歳
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>💰 目標資産額</Text>
          <TextInput
            style={styles.input}
            value={targetAmount}
            onChangeText={setTargetAmount}
            placeholder="例: 50000000（5000万円）"
            keyboardType="numeric"
          />
          {targetAmount && (
            <Text style={styles.formattedAmount}>
              {formatCurrency(parseFloat(targetAmount))}
            </Text>
          )}
          <Text style={styles.helperText}>
            いつ達成できるかがホーム画面に表示されます
          </Text>

          <View style={styles.presetContainer}>
            {presetAmounts.map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.presetButton,
                  parseInt(targetAmount) === amount &&
                    styles.presetButtonSelected,
                ]}
                onPress={() => setTargetAmount(amount.toString())}
              >
                <Text
                  style={[
                    styles.presetButtonText,
                    parseInt(targetAmount) === amount &&
                      styles.presetButtonTextSelected,
                  ]}
                >
                  {formatCurrency(amount)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* ヘッダー */}
        <View style={styles.header}>
          <Text style={styles.title}>初期設定</Text>
          <View style={styles.progressContainer}>
            {[1, 2, 3, 4].map((step) => (
              <View
                key={step}
                style={[
                  styles.progressDot,
                  currentStep >= step && styles.progressDotActive,
                ]}
              />
            ))}
          </View>
          <Text style={styles.stepIndicator}>ステップ {currentStep} / 4</Text>
        </View>

        {/* ステップコンテンツ */}
        <View style={styles.formContainer}>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </View>

        {/* ナビゲーションボタン */}
        <View style={styles.navigationContainer}>
          {currentStep > 1 && (
            <TouchableOpacity
              style={styles.previousButton}
              onPress={handlePrevious}
            >
              <Text style={styles.previousButtonText}>← 前へ</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentStep === 3 ? "完了 🎉" : "次へ →"}
            </Text>
          </TouchableOpacity>
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
  content: {
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2196F3",
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#E9ECEF",
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: "#2196F3",
  },
  stepIndicator: {
    fontSize: 14,
    color: "#666",
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  stepContainer: {
    minHeight: 300,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  stepSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 32,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
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
    fontSize: 12,
    color: "#2196F3",
    marginTop: 4,
    fontWeight: "600",
  },
  helperText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  previousButton: {
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    padding: 16,
    minWidth: 100,
  },
  previousButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  nextButton: {
    backgroundColor: "#2196F3",
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginLeft: 12,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: "#E9ECEF",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#F8F9FA",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  datePickerText: {
    fontSize: 16,
    color: "#333",
  },
  datePickerIcon: {
    fontSize: 16,
  },
  ageDisplay: {
    fontSize: 14,
    color: "#2196F3",
    marginTop: 8,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "90%",
    maxWidth: 400,
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    padding: 12,
    flex: 1,
    marginRight: 8,
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  okButton: {
    backgroundColor: "#2196F3",
    borderRadius: 12,
    padding: 12,
    flex: 1,
    marginLeft: 8,
  },
  okButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  presetContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
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
});
