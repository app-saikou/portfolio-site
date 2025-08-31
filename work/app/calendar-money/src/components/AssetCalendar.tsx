import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { Calendar, DateData } from "react-native-calendars";

type MarkedDates = {
  [key: string]: {
    marked?: boolean;
    dotColor?: string;
    selectedColor?: string;
    selected?: boolean;
    customStyles?: {
      container?: object;
      text?: object;
    };
  };
};
import { useAssets } from "../contexts/AssetContext";
import { formatCurrency } from "../utils/calculations";

interface AssetCalendarProps {
  onDayPress?: (date: string) => void;
}

export const AssetCalendar: React.FC<AssetCalendarProps> = ({ onDayPress }) => {
  const { calendarData } = useAssets();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
    onDayPress?.(day.dateString);
  };

  const handleMonthChange = (year: number, month: number) => {
    console.log("Changing to:", year, month);
    const newDate = new Date(year, month - 1, 1);
    setCurrentDate(newDate);
    setShowMonthPicker(false);
  };

  // カレンダーのマーキングデータを生成
  const markedDates: MarkedDates = {};

  Object.keys(calendarData).forEach((date) => {
    const dayData = calendarData[date];
    let dotColor = "#4CAF50"; // 緑（増加）

    // 前日との比較で色を決定
    const prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 1);
    const prevDateString = prevDate.toISOString().split("T")[0];
    const prevDayData = calendarData[prevDateString];

    if (prevDayData && dayData.totalAssets < prevDayData.totalAssets) {
      dotColor = "#F44336"; // 赤（減少）
    }

    if (dayData.isToday) {
      dotColor = "#2196F3"; // 青（今日）
    }

    markedDates[date] = {
      marked: true,
      dotColor,
      selectedColor: selectedDate === date ? "#E3F2FD" : undefined,
      selected: selectedDate === date,
    };
  });



  const renderMonthPicker = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 6; year <= currentYear + 100; year++) {
      years.push(year);
    }

    const months = [];
    for (let month = 1; month <= 12; month++) {
      months.push(month);
    }

    return (
      <Modal
        visible={showMonthPicker}
        animationType="slide"
        transparent
        onRequestClose={() => setShowMonthPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>年月を選択</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowMonthPicker(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.pickerContainer}>
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerLabel}>年</Text>
                <ScrollView style={styles.pickerScrollView}>
                  {years.map((year) => (
                    <TouchableOpacity
                      key={year}
                      style={[
                        styles.pickerItem,
                        selectedYear === year && styles.pickerItemSelected,
                      ]}
                      onPress={() => setSelectedYear(year)}
                    >
                      <Text
                        style={[
                          styles.pickerItemText,
                          selectedYear === year &&
                            styles.pickerItemTextSelected,
                        ]}
                      >
                        {year}年
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.pickerColumn}>
                <Text style={styles.pickerLabel}>月</Text>
                <ScrollView style={styles.pickerScrollView}>
                  {months.map((month) => (
                    <TouchableOpacity
                      key={month}
                      style={[
                        styles.pickerItem,
                        selectedMonth === month && styles.pickerItemSelected,
                      ]}
                      onPress={() => setSelectedMonth(month)}
                    >
                      <Text
                        style={[
                          styles.pickerItemText,
                          selectedMonth === month &&
                            styles.pickerItemTextSelected,
                        ]}
                      >
                        {month}月
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowMonthPicker(false)}
              >
                <Text style={styles.cancelButtonText}>キャンセル</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.okButton}
                onPress={() => handleMonthChange(selectedYear, selectedMonth)}
              >
                <Text style={styles.okButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {/* 年月選択ボタン */}
      <View style={styles.monthSelectorContainer}>
        <TouchableOpacity
          style={styles.monthSelectorButton}
          onPress={() => {
            console.log("Opening picker for:", currentDate.getFullYear(), currentDate.getMonth() + 1);
            setSelectedYear(currentDate.getFullYear());
            setSelectedMonth(currentDate.getMonth() + 1);
            setShowMonthPicker(true);
          }}
        >
          <Text style={styles.monthSelectorText}>
            {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
          </Text>
          <Text style={styles.monthSelectorArrow}>▼</Text>
        </TouchableOpacity>
      </View>

      <Calendar
        key={`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`}
        current={`${currentDate.getFullYear()}-${String(
          currentDate.getMonth() + 1
        ).padStart(2, "0")}-01`}
        onDayPress={handleDayPress}
        onMonthChange={(month) => {
          setCurrentDate(new Date(month.year, month.month - 1, 1));
        }}
        markedDates={markedDates}
        monthFormat={"yyyy年 M月"}
        dayComponent={({ date, state }) => {
          if (!date) return <View style={styles.customDayContainer} />;

          const dayData = calendarData[date.dateString];
          const isSelected = selectedDate === date.dateString;
          const isToday = dayData?.isToday;
          const isPrediction = dayData?.isPrediction;
          const isDisabled = state === "disabled";

          return (
            <TouchableOpacity
              style={[
                styles.customDayContainer,
                isSelected && styles.selectedCustomDay,
                isToday && styles.todayCustomContainer,
                isDisabled && styles.disabledDay,
              ]}
              onPress={() => !isDisabled && date && handleDayPress(date)}
              disabled={isDisabled}
            >
              <Text
                style={[
                  styles.customDayText,
                  isSelected && styles.selectedCustomDayText,
                  isToday && styles.todayCustomText,
                  isPrediction && styles.predictionCustomText,
                  isDisabled && styles.disabledDayText,
                ]}
              >
                {date.day}
              </Text>
              {dayData && !isDisabled && (
                <Text
                  style={[
                    styles.customAssetText,
                    isSelected && styles.selectedCustomAssetText,
                    isPrediction && styles.predictionCustomAssetText,
                  ]}
                >
                  {formatCurrency(dayData.totalAssets)}
                </Text>
              )}
            </TouchableOpacity>
          );
        }}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#b6c1cd",
          arrowColor: "#2196F3",
          disabledArrowColor: "#d9e1e8",
          monthTextColor: "#333",
          indicatorColor: "#2196F3",
          textDayFontFamily: "System",
          textMonthFontFamily: "System",
          textDayHeaderFontFamily: "System",
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "300",
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 13,
        }}
        style={styles.calendar}
      />

      {selectedDate && calendarData[selectedDate] && (
        <View style={styles.dayDetail}>
          <Text style={styles.detailTitle}>
            {new Date(selectedDate).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {calendarData[selectedDate].isPrediction && " (予測)"}
          </Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>総資産:</Text>
            <Text style={styles.detailValue}>
              {formatCurrency(calendarData[selectedDate].totalAssets)}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>現金:</Text>
            <Text style={styles.detailValue}>
              {formatCurrency(calendarData[selectedDate].cashAmount)}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>株式:</Text>
            <Text style={styles.detailValue}>
              {formatCurrency(calendarData[selectedDate].stockAmount)}
            </Text>
          </View>
        </View>
      )}

      {renderMonthPicker()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  calendar: {
    paddingBottom: 10,
  },
  // カスタム日付コンポーネント用のスタイル
  customDayContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 32,
    paddingVertical: 2,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  selectedCustomDay: {
    backgroundColor: "#E3F2FD",
  },
  todayCustomContainer: {
    borderWidth: 2,
    borderColor: "#2196F3",
    backgroundColor: "#F3F8FF",
  },
  disabledDay: {
    opacity: 0.3,
  },
  customDayText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    marginBottom: 1,
  },
  selectedCustomDayText: {
    color: "#1976D2",
    fontWeight: "bold",
  },
  todayCustomText: {
    color: "#2196F3",
    fontWeight: "bold",
  },
  predictionCustomText: {
    color: "#666",
  },
  disabledDayText: {
    color: "#ccc",
  },
  customAssetText: {
    fontSize: 8,
    color: "#666",
    textAlign: "center",
    lineHeight: 8,
  },
  selectedCustomAssetText: {
    color: "#1976D2",
    fontWeight: "500",
  },
  predictionCustomAssetText: {
    fontStyle: "italic",
    color: "#999",
  },
  dayDetail: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  // 年月選択ボタン用スタイル
  monthSelectorContainer: {
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
  },
  monthSelectorButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  monthSelectorText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginRight: 8,
  },
  monthSelectorArrow: {
    fontSize: 12,
    color: "#666",
  },
  // モーダル用スタイル
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "90%",
    maxHeight: "80%",
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
    backgroundColor: "#F8F9FA",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#666",
  },
  pickerContainer: {
    flexDirection: "row",
    padding: 20,
    height: 300,
  },
  pickerColumn: {
    flex: 1,
    alignItems: "center",
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  pickerScrollView: {
    flex: 1,
    width: "100%",
  },
  pickerItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 2,
  },
  pickerItemSelected: {
    backgroundColor: "#E3F2FD",
  },
  pickerItemText: {
    fontSize: 16,
    color: "#333",
  },
  pickerItemTextSelected: {
    color: "#2196F3",
    fontWeight: "600",
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E9ECEF",
    backgroundColor: "#F8F9FA",
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E9ECEF",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
  },
  okButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginLeft: 8,
    backgroundColor: "#2196F3",
    borderRadius: 8,
    alignItems: "center",
  },
  okButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
});
