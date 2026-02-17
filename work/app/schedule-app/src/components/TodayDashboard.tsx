import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from './GlassCard';
import { Icon } from './Icon';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '../constants/theme';
import { DailySummary, Category } from '../types';

interface TodayDashboardProps {
  summary: DailySummary | null;
  categories: Category[];
}

interface NudgeItem {
  categoryName: string;
  icon: string;
  color: string;
  diffMinutes: number;
}

interface PositiveItem {
  categoryName: string;
  icon: string;
  color: string;
}

export const TodayDashboard: React.FC<TodayDashboardProps> = ({ summary, categories }) => {
  const totalIdeal = summary?.totalIdealMinutes ?? 0;
  const matched = summary?.matchedMinutes ?? 0;
  const rate = totalIdeal > 0 ? Math.round((matched / totalIdeal) * 100) : 0;
  const matchedHours = Math.round(matched / 60 * 10) / 10;
  const idealHours = Math.round(totalIdeal / 60 * 10) / 10;

  const progressColor = rate >= 80 ? COLORS.success : rate >= 50 ? COLORS.warning : COLORS.primary;
  const progressWidth = totalIdeal > 0 ? `${Math.min(rate, 100)}%` as const : '0%' as const;

  const { nudge, positives } = useMemo(() => {
    if (!summary || summary.categoryBreakdown.length === 0) {
      return { nudge: null as NudgeItem | null, positives: [] as PositiveItem[] };
    }

    let worstNudge: NudgeItem | null = null;
    let worstDiff = 0;
    const positiveList: PositiveItem[] = [];

    for (const b of summary.categoryBreakdown) {
      if (b.idealMinutes === 0) continue;
      const cat = categories.find(c => c.id === b.categoryId);
      if (!cat) continue;

      const catRate = b.matchedMinutes / b.idealMinutes;
      const shortage = b.idealMinutes - b.actualMinutes;

      if (catRate >= 0.8) {
        positiveList.push({ categoryName: cat.name, icon: cat.icon, color: cat.color });
      }

      if (shortage > worstDiff) {
        worstDiff = shortage;
        worstNudge = {
          categoryName: cat.name,
          icon: cat.icon,
          color: cat.color,
          diffMinutes: shortage,
        };
      }
    }

    return { nudge: worstNudge, positives: positiveList };
  }, [summary, categories]);

  const formatDiff = (minutes: number): string => {
    if (minutes >= 60) {
      const h = Math.round(minutes / 60 * 10) / 10;
      return `${h}h`;
    }
    return `${minutes}分`;
  };

  // 記録なし状態
  if (!summary || summary.totalActualMinutes === 0) {
    return (
      <GlassCard style={styles.card} shadow="light">
        {/* プログレスバー（0%） */}
        <View style={styles.progressSection}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '0%', backgroundColor: COLORS.primary }]} />
          </View>
          <Text style={styles.progressLabel}>
            0h / {idealHours}h
          </Text>
        </View>
        <View style={[styles.messageCard, { backgroundColor: COLORS.primary + '12' }]}>
          <View style={[styles.messageIcon, { backgroundColor: COLORS.primary + '20' }]}>
            <Icon name="add" size={16} color={COLORS.primary} />
          </View>
          <Text style={styles.messageText}>活動を記録して理想と比べてみましょう</Text>
        </View>
      </GlassCard>
    );
  }

  return (
    <GlassCard style={styles.card} shadow="light">
      {/* プログレスバー */}
      <View style={styles.progressSection}>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: progressWidth, backgroundColor: progressColor }]}
          />
        </View>
        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>
            {matchedHours}h / {idealHours}h
          </Text>
          <Text style={[styles.progressRate, { color: progressColor }]}>{rate}%</Text>
        </View>
      </View>

      {/* ナッジメッセージ */}
      {nudge && (
        <View style={[styles.messageCard, { backgroundColor: nudge.color + '12' }]}>
          <View style={[styles.messageIcon, { backgroundColor: nudge.color + '20' }]}>
            <Icon name={nudge.icon} size={16} color={nudge.color} />
          </View>
          <Text style={styles.messageText}>
            {nudge.categoryName}が{formatDiff(nudge.diffMinutes)}足りません
          </Text>
        </View>
      )}

      {/* ポジティブ強化 */}
      {positives.map((p, i) => (
        <View key={i} style={[styles.messageCard, { backgroundColor: p.color + '12' }]}>
          <View style={[styles.messageIcon, { backgroundColor: p.color + '20' }]}>
            <Icon name={p.icon} size={16} color={p.color} />
          </View>
          <Text style={styles.messageText}>
            {p.categoryName}は理想通り!
          </Text>
        </View>
      ))}
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  progressSection: {
    marginBottom: SPACING.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
    marginBottom: SPACING.xs,
  },
  progressFill: {
    height: '100%',
    borderRadius: BORDER_RADIUS.round,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
  progressRate: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  messageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    marginTop: SPACING.xs,
  },
  messageIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageText: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    fontWeight: '600',
  },
});
