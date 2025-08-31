import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
  Modal,
} from "react-native";

import { useAssets } from "../contexts/AssetContext";
import { Transaction } from "../types";
import { formatCurrency } from "../utils/calculations";
import { Icon, ICONS } from "../components/Icon";

export const TransactionScreen: React.FC = () => {
  const { addTransaction, transactions, deleteTransaction, assets } =
    useAssets();

  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    type: "income" as "income" | "expense" | "stock_investment",
    date: new Date().toISOString().split("T")[0],
    fromAssetId: "",
    toAssetId: "",
  });

  const [showHistory, setShowHistory] = useState(false);
  const [showAssetPicker, setShowAssetPicker] = useState(false);
  const [pickerType, setPickerType] = useState<"from" | "to">("to");

  const resetForm = () => {
    setFormData({
      amount: "",
      description: "",
      type: "income",
      date: new Date().toISOString().split("T")[0],
      fromAssetId: "",
      toAssetId: "",
    });
  };

  const saveTransaction = () => {
    if (!formData.amount || !formData.description) {
      Alert.alert("エラー", "金額と説明を入力してください");
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert("エラー", "有効な金額を入力してください");
      return;
    }

    // 資産選択の検証
    if (formData.type === "income" && !formData.toAssetId) {
      Alert.alert("エラー", "収入先の資産を選択してください");
      return;
    }
    if (formData.type === "expense" && !formData.fromAssetId) {
      Alert.alert("エラー", "支出元の資産を選択してください");
      return;
    }
    if (
      formData.type === "stock_investment" &&
      (!formData.fromAssetId || !formData.toAssetId)
    ) {
      Alert.alert("エラー", "移動元と移動先の資産を選択してください");
      return;
    }

    // 支出と株式投資の場合は負の値にする
    const finalAmount = formData.type === "income" ? amount : -amount;

    addTransaction({
      amount: finalAmount,
      description: formData.description,
      type: formData.type,
      date: formData.date,
      fromAssetId: formData.fromAssetId,
      toAssetId: formData.toAssetId,
    });

    Alert.alert("成功", "取引を記録しました");
    resetForm();
  };

  const confirmDeleteTransaction = (transaction: Transaction) => {
    Alert.alert("削除確認", `「${transaction.description}」を削除しますか？`, [
      { text: "キャンセル", style: "cancel" },
      {
        text: "削除",
        style: "destructive",
        onPress: () => deleteTransaction(transaction.id),
      },
    ]);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "income":
        return { icon: ICONS.INCOME, color: "#4CAF50" };
      case "expense":
        return { icon: ICONS.EXPENSE, color: "#F44336" };
      case "stock_investment":
        return { icon: ICONS.INVESTMENT, color: "#2196F3" };
      default:
        return { icon: ICONS.MONEY, color: "#666" };
    }
  };

  const getTransactionTypeText = (type: string) => {
    switch (type) {
      case "income":
        return "収入";
      case "expense":
        return "支出";
      case "stock_investment":
        return "株式投資";
      default:
        return "不明";
    }
  };

  const renderAssetSelection = () => {
    const cashAssets = assets.filter((asset) => asset.type === "cash");
    const stockAssets = assets.filter((asset) => asset.type === "stock");

    const getSelectedAssetName = (assetId: string) => {
      const asset = assets.find((a) => a.id === assetId);
      return asset
        ? `${asset.name} (${formatCurrency(asset.amount)})`
        : "選択してください";
    };

    const openAssetPicker = (type: "from" | "to") => {
      setPickerType(type);
      setShowAssetPicker(true);
    };

    const getAvailableAssets = () => {
      switch (formData.type) {
        case "income":
          return cashAssets;
        case "expense":
          return cashAssets;
        case "stock_investment":
          return pickerType === "from" ? cashAssets : stockAssets;
        default:
          return [];
      }
    };

    switch (formData.type) {
      case "income":
        return (
          <View style={styles.assetSelectionContainer}>
            <Text style={styles.assetSelectionLabel}>📥 収入先の資産</Text>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => openAssetPicker("to")}
            >
              <Text style={styles.dropdownButtonText}>
                {formData.toAssetId
                  ? getSelectedAssetName(formData.toAssetId)
                  : "選択してください"}
              </Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
          </View>
        );

      case "expense":
        return (
          <View style={styles.assetSelectionContainer}>
            <Text style={styles.assetSelectionLabel}>📤 支出元の資産</Text>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => openAssetPicker("from")}
            >
              <Text style={styles.dropdownButtonText}>
                {formData.fromAssetId
                  ? getSelectedAssetName(formData.fromAssetId)
                  : "選択してください"}
              </Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
          </View>
        );

      case "stock_investment":
        return (
          <View style={styles.assetSelectionContainer}>
            <Text style={styles.assetSelectionLabel}>🔄 資産移動</Text>
            <View style={styles.assetSelectionRow}>
              <View style={styles.assetSelectionColumn}>
                <Text style={styles.assetSelectionSubLabel}>移動元</Text>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={() => openAssetPicker("from")}
                >
                  <Text style={styles.dropdownButtonText}>
                    {formData.fromAssetId
                      ? getSelectedAssetName(formData.fromAssetId)
                      : "選択してください"}
                  </Text>
                  <Text style={styles.dropdownArrow}>▼</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.assetSelectionColumn}>
                <Text style={styles.assetSelectionSubLabel}>移動先</Text>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={() => openAssetPicker("to")}
                >
                  <Text style={styles.dropdownButtonText}>
                    {formData.toAssetId
                      ? getSelectedAssetName(formData.toAssetId)
                      : "選択してください"}
                  </Text>
                  <Text style={styles.dropdownArrow}>▼</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const renderTransactionItem = ({ item }: { item: Transaction }) => {
    const icon = getTransactionIcon(item.type);
    const typeText = getTransactionTypeText(item.type);

    return (
      <View style={styles.transactionItem}>
        <View style={styles.transactionMain}>
          <View style={styles.transactionLeft}>
            <View
              style={[
                styles.transactionIcon,
                { backgroundColor: icon.color + "20" },
              ]}
            >
              <Text style={[styles.transactionIconText, { color: icon.color }]}>
                {icon.icon}
              </Text>
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionDescription}>
                {item.description}
              </Text>
              <Text style={styles.transactionMeta}>
                {new Date(item.date).toLocaleDateString("ja-JP")} • {typeText}
              </Text>
            </View>
          </View>
          <View style={styles.transactionRight}>
            <Text
              style={[
                styles.transactionAmount,
                { color: item.amount >= 0 ? "#4CAF50" : "#F44336" },
              ]}
            >
              {item.amount >= 0 ? "+" : ""}
              {formatCurrency(Math.abs(item.amount))}
            </Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => confirmDeleteTransaction(item)}
            >
              <Icon name={ICONS.DELETE} size={18} color="#F44336" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>収支記録</Text>
        <Text style={styles.subtitle}>
          収入、支出、株式投資を記録して資産推移を正確に追跡します
        </Text>

        {/* 取引入力フォーム */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>新しい取引を記録</Text>

          {/* 取引タイプ選択 */}
          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                formData.type === "income" && styles.typeButtonActive,
              ]}
              onPress={() => setFormData({ ...formData, type: "income" })}
            >
              <Icon
                name={ICONS.INCOME}
                size={20}
                color={formData.type === "income" ? "#fff" : "#4CAF50"}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  formData.type === "income" && styles.typeButtonTextActive,
                ]}
              >
                収入
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                formData.type === "expense" && styles.typeButtonActive,
              ]}
              onPress={() => setFormData({ ...formData, type: "expense" })}
            >
              <Icon
                name={ICONS.EXPENSE}
                size={20}
                color={formData.type === "expense" ? "#fff" : "#F44336"}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  formData.type === "expense" && styles.typeButtonTextActive,
                ]}
              >
                支出
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                formData.type === "stock_investment" && styles.typeButtonActive,
              ]}
              onPress={() =>
                setFormData({ ...formData, type: "stock_investment" })
              }
            >
              <Icon
                name={ICONS.INVESTMENT}
                size={20}
                color={
                  formData.type === "stock_investment" ? "#fff" : "#2196F3"
                }
              />
              <Text
                style={[
                  styles.typeButtonText,
                  formData.type === "stock_investment" &&
                    styles.typeButtonTextActive,
                ]}
              >
                株式投資
              </Text>
            </TouchableOpacity>
          </View>

          {/* 金額入力 */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>金額</Text>
            <TextInput
              style={styles.input}
              value={formData.amount}
              onChangeText={(text) =>
                setFormData({ ...formData, amount: text })
              }
              placeholder="金額を入力"
              keyboardType="numeric"
            />
            {formData.amount && (
              <Text style={styles.formattedAmount}>
                {formatCurrency(parseFloat(formData.amount))}
              </Text>
            )}
          </View>

          {/* 説明入力 */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>説明</Text>
            <TextInput
              style={styles.input}
              value={formData.description}
              onChangeText={(text) =>
                setFormData({ ...formData, description: text })
              }
              placeholder="取引の説明を入力"
            />
          </View>

          {/* 資産選択 */}
          {renderAssetSelection()}

          {/* 資産選択Modal */}
          <Modal
            visible={showAssetPicker}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowAssetPicker(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    {formData.type === "income" &&
                      pickerType === "to" &&
                      "収入先の資産を選択"}
                    {formData.type === "expense" &&
                      pickerType === "from" &&
                      "支出元の資産を選択"}
                    {formData.type === "stock_investment" &&
                      pickerType === "from" &&
                      "移動元の資産を選択"}
                    {formData.type === "stock_investment" &&
                      pickerType === "to" &&
                      "移動先の資産を選択"}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowAssetPicker(false)}
                    style={styles.modalCloseButton}
                  >
                    <Text style={styles.modalCloseText}>✕</Text>
                  </TouchableOpacity>
                </View>
                <ScrollView style={styles.modalBody}>
                  {(() => {
                    const cashAssets = assets.filter(
                      (asset) => asset.type === "cash"
                    );
                    const stockAssets = assets.filter(
                      (asset) => asset.type === "stock"
                    );
                    const availableAssets =
                      formData.type === "stock_investment" &&
                      pickerType === "to"
                        ? stockAssets
                        : cashAssets;

                    return availableAssets.map((asset) => (
                      <TouchableOpacity
                        key={asset.id}
                        style={styles.modalAssetOption}
                        onPress={() => {
                          if (pickerType === "from") {
                            setFormData((prev) => ({
                              ...prev,
                              fromAssetId: asset.id,
                            }));
                          } else {
                            setFormData((prev) => ({
                              ...prev,
                              toAssetId: asset.id,
                            }));
                          }
                          setShowAssetPicker(false);
                        }}
                      >
                        <Text style={styles.modalAssetName}>{asset.name}</Text>
                        <Text style={styles.modalAssetAmount}>
                          {formatCurrency(asset.amount)}
                        </Text>
                      </TouchableOpacity>
                    ));
                  })()}
                </ScrollView>
              </View>
            </View>
          </Modal>

          {/* 日付入力 */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>日付</Text>
            <TextInput
              style={styles.input}
              value={formData.date}
              onChangeText={(text) => setFormData({ ...formData, date: text })}
              placeholder="YYYY-MM-DD"
            />
          </View>

          {/* 保存ボタン */}
          <TouchableOpacity style={styles.saveButton} onPress={saveTransaction}>
            <Text style={styles.saveButtonIcon}>➕</Text>
            <Text style={styles.saveButtonText}>取引を記録</Text>
          </TouchableOpacity>
        </View>

        {/* 取引履歴 */}
        <View style={styles.historySection}>
          <TouchableOpacity
            style={styles.historyHeader}
            onPress={() => setShowHistory(!showHistory)}
          >
            <Text style={styles.sectionTitle}>
              取引履歴 ({transactions.length}件)
            </Text>
            <Text style={styles.historyToggleIcon}>
              {showHistory ? "▼" : "▶"}
            </Text>
          </TouchableOpacity>

          {showHistory && (
            <View style={styles.historyList}>
              {sortedTransactions.length === 0 ? (
                <Text style={styles.emptyText}>取引履歴がありません</Text>
              ) : (
                <FlatList
                  data={sortedTransactions}
                  renderItem={renderTransactionItem}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                />
              )}
            </View>
          )}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 30,
    lineHeight: 20,
  },
  formSection: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  typeSelector: {
    flexDirection: "row",
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
  },
  typeButtonActive: {
    backgroundColor: "#2196F3",
    borderColor: "#2196F3",
  },
  typeButtonText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    fontWeight: "500",
  },
  typeButtonTextActive: {
    color: "#fff",
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  formattedAmount: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    textAlign: "right",
  },
  saveButton: {
    backgroundColor: "#2196F3",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  historySection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  historyList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 20,
  },
  transactionItem: {
    marginBottom: 12,
  },
  transactionMain: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  transactionLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 2,
  },
  transactionMeta: {
    fontSize: 12,
    color: "#666",
  },
  transactionRight: {
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  deleteButton: {
    padding: 4,
  },
  transactionIconText: {
    fontSize: 20,
  },
  typeButtonIcon: {
    fontSize: 20,
  },
  saveButtonIcon: {
    fontSize: 20,
  },
  deleteIcon: {
    fontSize: 16,
  },
  historyToggleIcon: {
    fontSize: 16,
  },
  // 資産選択のスタイル
  assetSelectionContainer: {
    marginTop: 16,
  },
  assetSelectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  assetSelectionSubLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    marginBottom: 8,
  },
  assetOptions: {
    gap: 8,
  },
  assetSelectionRow: {
    flexDirection: "row",
    gap: 16,
  },
  assetSelectionColumn: {
    flex: 1,
  },
  assetOption: {
    padding: 12,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E9ECEF",
    marginBottom: 8,
  },
  assetOptionSelected: {
    backgroundColor: "#E3F2FD",
    borderColor: "#2196F3",
  },
  assetOptionText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  assetOptionTextSelected: {
    color: "#2196F3",
    fontWeight: "600",
  },
  // ドロップダウンボタンのスタイル
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  dropdownButtonText: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 12,
    color: "#666",
    marginLeft: 8,
  },
  // Modalのスタイル
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "90%",
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  modalCloseButton: {
    padding: 4,
  },
  modalCloseText: {
    fontSize: 18,
    color: "#666",
  },
  modalBody: {
    padding: 20,
  },
  modalAssetOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  modalAssetName: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  modalAssetAmount: {
    fontSize: 14,
    color: "#666",
  },
});
