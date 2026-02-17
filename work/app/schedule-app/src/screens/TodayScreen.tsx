import React, { useEffect, useCallback, useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  RefreshControl, Alert, Modal, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useSchedule } from '../contexts/ScheduleContext';
import { TodayDashboard } from '../components/TodayDashboard';
import { DualTimelineView } from '../components/DualTimelineView';
import { CategoryBreakdownChart } from '../components/CategoryBreakdownChart';
import { CategorySelector } from '../components/CategorySelector';
import { WheelTimePicker } from '../components/WheelTimePicker';
import { Icon } from '../components/Icon';
import { useCurrentTimeBlock } from '../hooks/useCurrentTimeBlock';
import { getCategoryById } from '../constants/categories';
import { ActualRecord } from '../types';
import {
  formatDateDisplay, formatDate, getCurrentTimeString, roundToNearest,
} from '../utils/timeUtils';
import { generateDailyReport } from '../utils/analysisUtils';
import { COLORS, SHADOWS, SPACING, FONT_SIZE, BORDER_RADIUS } from '../constants/theme';

const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

const addMinutesToTime = (time: string, minutes: number): string => {
  const [h, m] = time.split(':').map(Number);
  const total = (h * 60 + m + minutes) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
};

const getMinutesBetween = (start: string, end: string): number => {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  let diff = (eh * 60 + em) - (sh * 60 + sm);
  if (diff <= 0) diff += 1440;
  return diff;
};

const DURATION_PRESETS = [
  { label: '30分', minutes: 30 },
  { label: '1h', minutes: 60 },
  { label: '1.5h', minutes: 90 },
  { label: '2h', minutes: 120 },
];

export const TodayScreen: React.FC = () => {
  const {
    todaySummary, todayRecords, getActiveScheduleBlocks,
    categories, recalculateSummary, refreshToday,
    addActualRecord, deleteActualRecord,
  } = useSchedule();
  const currentBlock = useCurrentTimeBlock();
  const [refreshing, setRefreshing] = useState(false);

  // Record input state
  const [showRecordSheet, setShowRecordSheet] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [startTime, setStartTime] = useState(() => {
    const last = todayRecords.records[todayRecords.records.length - 1];
    return last?.endTime ?? roundToNearest(getCurrentTimeString(), 15);
  });
  const [endTime, setEndTime] = useState(() => roundToNearest(getCurrentTimeString(), 15));
  const [showTimePicker, setShowTimePicker] = useState(false);

  const today = new Date();
  const todayStr = formatDate(today);
  const idealBlocks = getActiveScheduleBlocks(today);
  const lastRecord = todayRecords.records[todayRecords.records.length - 1];

  const recordsKey = todayRecords.records.map(r => r.id).join(',');
  useEffect(() => {
    recalculateSummary(todayStr);
  }, [recordsKey]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshToday();
    setRefreshing(false);
  }, [refreshToday]);

  const currentCat = currentBlock
    ? getCategoryById(categories, currentBlock.categoryId)
    : null;

  const duration = getMinutesBetween(startTime, endTime);
  const durationText = useMemo(() => {
    if (duration >= 60) {
      const h = Math.floor(duration / 60);
      const m = duration % 60;
      return m > 0 ? `${h}時間${m}分` : `${h}時間`;
    }
    return `${duration}分`;
  }, [duration]);

  const doRecord = useCallback(async (catId: string, start: string, end: string) => {
    if (start === end) return;
    const record: ActualRecord = {
      id: generateId(),
      categoryId: catId,
      startTime: start,
      endTime: end,
      recordedAt: new Date().toISOString(),
    };
    await addActualRecord(todayStr, record);
    await recalculateSummary(todayStr);
    setCategoryId('');
    setStartTime(end);
    setEndTime(roundToNearest(getCurrentTimeString(), 15));
    setShowRecordSheet(false);
    setShowTimePicker(false);
  }, [todayStr, addActualRecord, recalculateSummary]);

  // ワンタップ記録: カテゴリ選択で即記録（時間調整モードでない場合）
  const handleCategorySelect = useCallback((cat: { id: string }) => {
    if (showTimePicker) {
      // 時間調整モードならカテゴリ選択のみ
      setCategoryId(cat.id);
    } else {
      // 即記録
      doRecord(cat.id, startTime, endTime);
    }
  }, [showTimePicker, startTime, endTime, doRecord]);

  const handleRecord = useCallback(async () => {
    if (!categoryId) {
      Alert.alert('カテゴリを選択', 'カテゴリを選んでから記録してください');
      return;
    }
    doRecord(categoryId, startTime, endTime);
  }, [categoryId, startTime, endTime, doRecord]);

  const handleDeleteRecord = (recordId: string) => {
    Alert.alert('削除', 'この記録を削除しますか？', [
      { text: 'キャンセル' },
      {
        text: '削除', style: 'destructive',
        onPress: async () => {
          await deleteActualRecord(todayStr, recordId);
          await recalculateSummary(todayStr);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <Text style={styles.dateText}>{formatDateDisplay(today)}</Text>
        <Text style={styles.greeting}>今日</Text>

        {/* Current ideal block banner */}
        {currentCat && (
          <View style={[styles.currentBlock, { borderLeftColor: currentCat.color }]}>
            <Icon name={currentCat.icon} size={20} color={currentCat.color} />
            <View style={{ flex: 1 }}>
              <Text style={styles.currentLabel}>いまの理想</Text>
              <Text style={[styles.currentActivity, { color: currentCat.color }]}>
                {currentCat.name}
              </Text>
            </View>
            <Text style={styles.currentTime}>
              {currentBlock!.startTime} - {currentBlock!.endTime}
            </Text>
          </View>
        )}

        {/* Dashboard */}
        <TodayDashboard summary={todaySummary} categories={categories} />

        {/* ─── Record CTA ─── */}
        <TouchableOpacity
          style={styles.recordCTA}
          onPress={() => {
            const last = todayRecords.records[todayRecords.records.length - 1];
            setStartTime(last?.endTime ?? roundToNearest(getCurrentTimeString(), 15));
            setEndTime(roundToNearest(getCurrentTimeString(), 15));
            setCategoryId('');
            setShowTimePicker(false);
            setShowRecordSheet(true);
          }}
          activeOpacity={0.7}
        >
          <Icon name="add" size={22} color={COLORS.white} />
          <Text style={styles.recordCTAText}>活動を記録</Text>
        </TouchableOpacity>

        {/* ─── Today's records list ─── */}
        {todayRecords.records.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>今日の記録</Text>
            {todayRecords.records.map(record => {
              const cat = getCategoryById(categories, record.categoryId);
              return (
                <TouchableOpacity
                  key={record.id}
                  style={[styles.recordItem, { borderLeftColor: cat?.color ?? '#ccc' }]}
                  onLongPress={() => handleDeleteRecord(record.id)}
                >
                  <View style={[styles.recordIcon, { backgroundColor: (cat?.color ?? '#ccc') + '20' }]}>
                    <Icon name={cat?.icon ?? 'ellipsis-horizontal'} size={16} color={cat?.color ?? '#ccc'} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.recordName}>{cat?.name ?? '不明'}</Text>
                    <Text style={styles.recordTime}>{record.startTime} - {record.endTime}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* ─── Dual timeline ─── */}
        {(idealBlocks.length > 0 || todayRecords.records.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>理想 vs 実績</Text>
            <View style={styles.timelineCard}>
              <DualTimelineView
                idealBlocks={idealBlocks}
                actualRecords={todayRecords.records}
                categories={categories}
                onTapActual={(time) => {
                  setStartTime(time);
                  setEndTime(roundToNearest(getCurrentTimeString(), 15));
                  setCategoryId('');
                  setShowTimePicker(false);
                  setShowRecordSheet(true);
                }}
              />
            </View>
          </View>
        )}

        {/* Category breakdown */}
        {todaySummary && todaySummary.categoryBreakdown.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>カテゴリ別</Text>
            <View style={styles.card}>
              <CategoryBreakdownChart
                breakdown={todaySummary.categoryBreakdown}
                categories={categories}
              />
            </View>
          </View>
        )}

        {/* Daily report */}
        {todaySummary && todayRecords.records.length >= 3 && (() => {
          const report = generateDailyReport(todaySummary, categories);
          return (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>今日のレポート</Text>
              <View style={styles.card}>
                <View style={styles.reportHeader}>
                  <View style={styles.reportStat}>
                    <Text style={styles.reportStatValue}>{report.achievementRate}%</Text>
                    <Text style={styles.reportStatLabel}>達成率</Text>
                  </View>
                  {report.topCategory && (
                    <View style={styles.reportStat}>
                      <Text style={styles.reportStatValue}>{report.topCategory.name}</Text>
                      <Text style={styles.reportStatLabel}>最多カテゴリ</Text>
                    </View>
                  )}
                  <View style={styles.reportStat}>
                    <Text style={styles.reportStatValue}>
                      {Math.round(report.totalRecordedMinutes / 60 * 10) / 10}h
                    </Text>
                    <Text style={styles.reportStatLabel}>記録時間</Text>
                  </View>
                </View>
                {report.highlights.length > 0 && (
                  <View style={styles.reportInsights}>
                    {report.highlights.map((h, i) => (
                      <View key={i} style={styles.insightRow}>
                        <Icon name="information-circle" size={14} color={COLORS.primary} />
                        <Text style={styles.insightText}>{h}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </View>
          );
        })()}

        {/* Empty state */}
        {idealBlocks.length === 0 && todayRecords.records.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="calendar" size={48} color={COLORS.textLight} />
            <Text style={styles.emptyText}>
              「スケジュール」タブで理想の1日を作成し{'\n'}ここで記録をつけましょう
            </Text>
          </View>
        )}

        <View style={{ height: SPACING.xl * 2 }} />
      </ScrollView>

      {/* ─── Record Bottom Sheet ─── */}
      <Modal
        visible={showRecordSheet}
        transparent
        animationType="slide"
        onRequestClose={() => setShowRecordSheet(false)}
      >
        <TouchableOpacity
          style={styles.sheetOverlay}
          activeOpacity={1}
          onPress={() => setShowRecordSheet(false)}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.sheetContainer}
        >
          <View style={styles.recordSheet}>
            <View style={styles.sheetHandle} />
            <View style={styles.recordSheetHeader}>
              <Text style={styles.recordSheetTitle}>
                {showTimePicker ? '時間を調整' : 'カテゴリをタップで記録'}
              </Text>
              <TouchableOpacity
                onPress={() => setShowRecordSheet(false)}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              >
                <Icon name="close" size={22} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </View>

            <CategorySelector
              categories={categories}
              selectedId={categoryId}
              onSelect={handleCategorySelect}
              compact
            />

            <TouchableOpacity
              style={styles.timeDisplay}
              onPress={() => setShowTimePicker(!showTimePicker)}
              activeOpacity={0.7}
            >
              <View style={styles.timeInfo}>
                <Text style={styles.timeValue}>{startTime}</Text>
                <Text style={styles.timeSep}>→</Text>
                <Text style={styles.timeValue}>{endTime}</Text>
                <View style={styles.durationBadge}>
                  <Text style={styles.durationText}>{durationText}</Text>
                </View>
              </View>
              <Icon name={showTimePicker ? 'chevron-up' : 'chevron-down'} size={18} color={COLORS.textSecondary} />
            </TouchableOpacity>
            {!showTimePicker && (
              <Text style={styles.timeHint}>時間を変えたい場合はタップで調整</Text>
            )}

            {showTimePicker && (
              <>
                <View style={styles.presetRow}>
                  {DURATION_PRESETS.map(p => (
                    <TouchableOpacity
                      key={p.minutes}
                      style={[styles.presetChip, duration === p.minutes && styles.presetChipActive]}
                      onPress={() => setEndTime(addMinutesToTime(startTime, p.minutes))}
                    >
                      <Text style={[styles.presetText, duration === p.minutes && styles.presetTextActive]}>
                        {p.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.pickerContainer}>
                  <View style={styles.pickersRow}>
                    <WheelTimePicker label="開始" value={startTime} onChange={setStartTime} />
                    <View style={{ paddingTop: SPACING.md }}>
                      <Icon name="arrow-forward" size={18} color={COLORS.textSecondary} />
                    </View>
                    <WheelTimePicker label="終了" value={endTime} onChange={setEndTime} />
                  </View>
                </View>

                <TouchableOpacity style={styles.recordButton} onPress={handleRecord}>
                  <Icon name="checkmark" size={18} color={COLORS.white} />
                  <Text style={styles.recordButtonText}>記録する</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1, padding: SPACING.md },
  dateText: { fontSize: FONT_SIZE.md, color: COLORS.textSecondary, marginTop: SPACING.sm },
  greeting: { fontSize: FONT_SIZE.title, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.md },

  // Current block
  currentBlock: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    backgroundColor: COLORS.glass, padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg, borderLeftWidth: 4, marginBottom: SPACING.md,
    borderWidth: StyleSheet.hairlineWidth, borderColor: COLORS.glassBorder,
    ...SHADOWS.light,
  },
  currentLabel: { fontSize: FONT_SIZE.xs, color: COLORS.textSecondary },
  currentActivity: { fontSize: FONT_SIZE.lg, fontWeight: '700' },
  currentTime: { fontSize: FONT_SIZE.sm, color: COLORS.textSecondary },

  // Record CTA
  recordCTA: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.sm,
    backgroundColor: COLORS.primary, paddingVertical: 14,
    borderRadius: BORDER_RADIUS.xl, marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  recordCTAText: { color: COLORS.white, fontSize: FONT_SIZE.lg, fontWeight: '700' },

  // Bottom sheet
  sheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sheetContainer: {
    justifyContent: 'flex-end',
  },
  recordSheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: BORDER_RADIUS.xxl,
    borderTopRightRadius: BORDER_RADIUS.xxl,
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
    ...SHADOWS.heavy,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border,
    alignSelf: 'center',
    marginBottom: SPACING.sm,
  },
  recordSheetHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  recordSheetTitle: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: COLORS.text },

  timeHint: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },

  timeDisplay: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: COLORS.background, padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md, marginVertical: SPACING.xs,
  },
  timeInfo: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  timeValue: { fontSize: FONT_SIZE.xl, fontWeight: '700', color: COLORS.text, fontVariant: ['tabular-nums'] },
  timeSep: { fontSize: FONT_SIZE.md, color: COLORS.textSecondary },
  durationBadge: {
    backgroundColor: COLORS.primary + '15', paddingHorizontal: SPACING.sm,
    paddingVertical: 1, borderRadius: BORDER_RADIUS.round,
  },
  durationText: { fontSize: FONT_SIZE.xs, color: COLORS.primary, fontWeight: '600' },

  presetRow: { flexDirection: 'row', gap: SPACING.xs, marginBottom: SPACING.sm },
  presetChip: {
    flex: 1, alignItems: 'center', paddingVertical: SPACING.xs + 2,
    borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.background,
    borderWidth: 1, borderColor: COLORS.border,
  },
  presetChipActive: { backgroundColor: COLORS.primary + '15', borderColor: COLORS.primary },
  presetText: { fontSize: FONT_SIZE.xs, color: COLORS.textSecondary, fontWeight: '500' },
  presetTextActive: { color: COLORS.primary, fontWeight: '700' },

  pickerContainer: {
    backgroundColor: COLORS.background, borderRadius: BORDER_RADIUS.md,
    padding: SPACING.sm, marginBottom: SPACING.sm,
  },
  pickersRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.md,
  },

  recordButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.sm,
    backgroundColor: COLORS.primary, paddingVertical: SPACING.sm + 2,
    borderRadius: BORDER_RADIUS.md,
  },
  recordButtonText: { color: COLORS.white, fontSize: FONT_SIZE.md, fontWeight: '700' },

  // Sections
  section: { marginBottom: SPACING.md },
  sectionTitle: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.sm },

  timelineCard: {
    backgroundColor: COLORS.glass, borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.sm, height: 400,
    borderWidth: StyleSheet.hairlineWidth, borderColor: COLORS.glassBorder,
    ...SHADOWS.light,
  },
  card: {
    backgroundColor: COLORS.glass, borderRadius: BORDER_RADIUS.lg, padding: SPACING.md,
    borderWidth: StyleSheet.hairlineWidth, borderColor: COLORS.glassBorder,
    ...SHADOWS.light,
  },

  recordItem: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    backgroundColor: COLORS.glass, padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg, borderLeftWidth: 3, marginBottom: SPACING.xs,
    borderWidth: StyleSheet.hairlineWidth, borderColor: COLORS.glassBorder,
    ...SHADOWS.light,
  },
  recordIcon: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  recordName: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.text },
  recordTime: { fontSize: FONT_SIZE.sm, color: COLORS.textSecondary },

  // Report
  reportHeader: {
    flexDirection: 'row', justifyContent: 'space-around',
    paddingBottom: SPACING.sm, marginBottom: SPACING.sm,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.border,
  },
  reportStat: { alignItems: 'center' },
  reportStatValue: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: COLORS.text },
  reportStatLabel: { fontSize: FONT_SIZE.xs, color: COLORS.textSecondary, marginTop: 1 },
  reportInsights: { gap: SPACING.xs },
  insightRow: { flexDirection: 'row', alignItems: 'flex-start', gap: SPACING.xs },
  insightText: { flex: 1, fontSize: FONT_SIZE.sm, color: COLORS.text, lineHeight: 18 },

  emptyState: { alignItems: 'center', marginTop: SPACING.xl * 2, gap: SPACING.md },
  emptyText: { fontSize: FONT_SIZE.md, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 22 },
});
