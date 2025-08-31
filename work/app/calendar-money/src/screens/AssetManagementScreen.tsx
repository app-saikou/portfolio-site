import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";

import { useAssets } from "../contexts/AssetContext";
import { Asset } from "../types";
import { formatCurrency } from "../utils/calculations";
import { Icon, ICONS } from "../components/Icon";

export const AssetManagementScreen: React.FC = () => {
  const {
    assets,
    addAsset,
    updateAsset,
    deleteAsset,
    getTotalAssets,
    getCashAmount,
    getStockAmount,
  } = useAssets();

  const [modalVisible, setModalVisible] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "cash" as "cash" | "stock",
    amount: "",
    annualReturn: "",
  });

  const openModal = (asset?: Asset) => {
    if (asset) {
      setEditingAsset(asset);
      setFormData({
        name: asset.name,
        type: asset.type,
        amount: asset.amount.toString(),
        annualReturn: asset.annualReturn?.toString() || "",
      });
    } else {
      setEditingAsset(null);
      setFormData({
        name: "",
        type: "cash",
        amount: "",
        annualReturn: "",
      });
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingAsset(null);
  };

  const saveAsset = () => {
    if (!formData.name || !formData.amount) {
      Alert.alert("エラー", "名前と金額を入力してください");
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount < 0) {
      Alert.alert("エラー", "有効な金額を入力してください");
      return;
    }

    const annualReturn = formData.annualReturn
      ? parseFloat(formData.annualReturn) / 100
      : undefined;

    if (
      formData.type === "stock" &&
      (annualReturn === undefined || isNaN(annualReturn))
    ) {
      Alert.alert("エラー", "株式の場合は年利を入力してください");
      return;
    }

    const assetData = {
      name: formData.name,
      type: formData.type,
      amount,
      ...(formData.type === "stock" && { annualReturn }),
    };

    if (editingAsset) {
      updateAsset(editingAsset.id, assetData);
    } else {
      addAsset(assetData);
    }

    closeModal();
  };

  const confirmDeleteAsset = (asset: Asset) => {
    Alert.alert("削除確認", `「${asset.name}」を削除しますか？`, [
      { text: "キャンセル", style: "cancel" },
      {
        text: "削除",
        style: "destructive",
        onPress: () => deleteAsset(asset.id),
      },
    ]);
  };

  const renderAssetItem = ({ item }: { item: Asset }) => (
    <View style={styles.assetItem}>
      <View style={styles.assetInfo}>
        <View style={styles.assetHeader}>
          <Text style={styles.assetName}>{item.name}</Text>
          <View
            style={[
              styles.assetTypeBadge,
              { backgroundColor: item.type === "cash" ? "#4CAF50" : "#2196F3" },
            ]}
          >
            <Text style={styles.assetTypeBadgeText}>
              {item.type === "cash" ? "現金" : "株式"}
            </Text>
          </View>
        </View>
        <Text style={styles.assetAmount}>{formatCurrency(item.amount)}</Text>
        {item.type === "stock" && item.annualReturn && (
          <Text style={styles.assetReturn}>
            年利: {(item.annualReturn * 100).toFixed(1)}%
          </Text>
        )}
      </View>
      <View style={styles.assetActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => openModal(item)}
        >
          <Icon name={ICONS.EDIT} size={18} color="#2196F3" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => confirmDeleteAsset(item)}
        >
          <Icon name={ICONS.DELETE} size={18} color="#F44336" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 資産サマリー */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>資産サマリー</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>総資産</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(getTotalAssets())}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>現金</Text>
            <Text style={[styles.summaryValue, { color: "#4CAF50" }]}>
              {formatCurrency(getCashAmount())}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>株式</Text>
            <Text style={[styles.summaryValue, { color: "#2196F3" }]}>
              {formatCurrency(getStockAmount())}
            </Text>
          </View>
        </View>
      </View>

      {/* 資産一覧 */}
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>資産一覧</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => openModal()}
          >
            <Text style={styles.addButtonIcon}>➕</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={assets}
          renderItem={renderAssetItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* 資産編集モーダル */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingAsset ? "資産を編集" : "新しい資産を追加"}
              </Text>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeButtonIcon}>❌</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>名前</Text>
              <TextInput
                style={styles.formInput}
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
                placeholder="資産名を入力"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>種類</Text>
              <View style={styles.typeSelector}>
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    formData.type === "cash" && styles.typeButtonActive,
                  ]}
                  onPress={() => setFormData({ ...formData, type: "cash" })}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      formData.type === "cash" && styles.typeButtonTextActive,
                    ]}
                  >
                    現金
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    formData.type === "stock" && styles.typeButtonActive,
                  ]}
                  onPress={() => setFormData({ ...formData, type: "stock" })}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      formData.type === "stock" && styles.typeButtonTextActive,
                    ]}
                  >
                    株式
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>金額</Text>
              <TextInput
                style={styles.formInput}
                value={formData.amount}
                onChangeText={(text) =>
                  setFormData({ ...formData, amount: text })
                }
                placeholder="金額を入力"
                keyboardType="numeric"
              />
            </View>

            {formData.type === "stock" && (
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>年利 (%)</Text>
                <TextInput
                  style={styles.formInput}
                  value={formData.annualReturn}
                  onChangeText={(text) =>
                    setFormData({ ...formData, annualReturn: text })
                  }
                  placeholder="年利を入力 (例: 5.0)"
                  keyboardType="numeric"
                />
              </View>
            )}

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={closeModal}
              >
                <Text style={styles.cancelButtonText}>キャンセル</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={saveAsset}>
                <Text style={styles.saveButtonText}>保存</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  summaryContainer: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  summaryGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  listContainer: {
    flex: 1,
    margin: 15,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#2196F3",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    flex: 1,
  },
  assetItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  assetInfo: {
    flex: 1,
  },
  assetHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  assetName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginRight: 10,
  },
  assetTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  assetTypeBadgeText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "500",
  },
  assetAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  assetReturn: {
    fontSize: 12,
    color: "#666",
  },
  assetActions: {
    flexDirection: "row",
  },
  actionButton: {
    padding: 8,
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 12,
    padding: 20,
    width: "90%",
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  formGroup: {
    marginBottom: 15,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 5,
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  typeSelector: {
    flexDirection: "row",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  typeButton: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  typeButtonActive: {
    backgroundColor: "#2196F3",
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  typeButtonTextActive: {
    color: "#fff",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#666",
  },
  saveButton: {
    flex: 1,
    padding: 12,
    marginLeft: 10,
    borderRadius: 8,
    backgroundColor: "#2196F3",
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
  addButtonIcon: {
    fontSize: 24,
    color: "#fff",
  },
  closeButtonIcon: {
    fontSize: 24,
    color: "#666",
  },
});
