import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { BlurView } from 'expo-blur';
import {
  Calendar,
  MapPin,
  Clock,
  QrCode,
  Bell,
  CircleCheck as CheckCircle,
  CircleAlert as AlertCircle,
} from 'lucide-react-native';
import { router } from 'expo-router';
import { mockEventDetails } from '@/lib/data';

const getStatusInfo = (status: string) => {
  switch (status) {
    case 'upcoming':
      return {
        text: '即將開始',
        color: '#10B981',
        icon: Clock,
        backgroundColor: '#ECFDF5',
      };
    case 'ongoing':
      return {
        text: '進行中',
        color: '#F59E0B',
        icon: AlertCircle,
        backgroundColor: '#FFFBEB',
      };
    case 'completed':
      return {
        text: '已結束',
        color: '#6B7280',
        icon: CheckCircle,
        backgroundColor: '#F3F4F6',
      };
    default:
      return {
        text: '未知',
        color: '#6B7280',
        icon: Clock,
        backgroundColor: '#F3F4F6',
      };
  }
};

export default function MyEventsScreen() {
  const [selectedTab, setSelectedTab] = useState<
    'all' | 'upcoming' | 'completed'
  >('all');

  const filteredEvents =
    selectedTab === 'all'
      ? mockEventDetails
      : mockEventDetails.filter((event) =>
          selectedTab === 'upcoming'
            ? event.status === 'upcoming' || event.status === 'ongoing'
            : event.status === 'completed'
        );

  const renderEventCard = (event: RegisteredEvent) => {
    const statusInfo = getStatusInfo(event.status);
    const StatusIcon = statusInfo.icon;

    return (
      <TouchableOpacity
        key={event.id}
        style={styles.eventCard}
        onPress={() => router.push(`/event-details?id=${event.id}`)}
        activeOpacity={0.9}
      >
        <Image source={{ uri: event.image }} style={styles.eventImage} />

        <View style={styles.eventContent}>
          <View style={styles.eventHeader}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: statusInfo.backgroundColor },
              ]}
            >
              <StatusIcon size={12} color={statusInfo.color} />
              <Text style={[styles.statusText, { color: statusInfo.color }]}>
                {statusInfo.text}
              </Text>
            </View>
          </View>

          <View style={styles.eventMeta}>
            <View style={styles.metaItem}>
              <Calendar size={16} color="#6B7280" />
              <Text style={styles.metaText}>
                {event.date} · {event.time}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <MapPin size={16} color="#6B7280" />
              <Text style={styles.metaText}>{event.location}</Text>
            </View>
          </View>

          <View style={styles.eventActions}>
            <TouchableOpacity
              style={styles.qrButton}
              onPress={() => router.push(`/qr-code?eventId=${event.id}`)}
            >
              <QrCode size={18} color="#10B981" />
              <Text style={styles.qrButtonText}>入場憑證</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.reminderButton}>
              <Bell
                size={18}
                color={event.reminderSet ? '#10B981' : '#6B7280'}
              />
              <Text
                style={[
                  styles.reminderButtonText,
                  { color: event.reminderSet ? '#10B981' : '#6B7280' },
                ]}
              >
                {event.reminderSet ? '已設提醒' : '設定提醒'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <BlurView intensity={100} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>我的活動</Text>
        </View>
      </BlurView>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'all' && styles.tabActive]}
          onPress={() => setSelectedTab('all')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'all' && styles.tabTextActive,
            ]}
          >
            全部
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'upcoming' && styles.tabActive]}
          onPress={() => setSelectedTab('upcoming')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'upcoming' && styles.tabTextActive,
            ]}
          >
            即將參加
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'completed' && styles.tabActive]}
          onPress={() => setSelectedTab('completed')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'completed' && styles.tabTextActive,
            ]}
          >
            已參加
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredEvents.length > 0 ? (
          <View style={styles.eventsContainer}>
            {filteredEvents.map(renderEventCard)}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Calendar size={64} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>尚無活動記錄</Text>
            <Text style={styles.emptyDescription}>
              去首頁探索精彩活動並報名參加吧！
            </Text>
            <TouchableOpacity
              style={styles.exploreButton}
              onPress={() => router.push('/')}
            >
              <Text style={styles.exploreButtonText}>探索活動</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  tabActive: {
    backgroundColor: '#10B981',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  eventsContainer: {
    padding: 20,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  eventContent: {
    padding: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  eventMeta: {
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  metaText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  eventActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    flex: 1,
    marginRight: 8,
    justifyContent: 'center',
  },
  qrButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
    marginLeft: 6,
  },
  reminderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    flex: 1,
    marginLeft: 8,
    justifyContent: 'center',
  },
  reminderButtonText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E1E1E',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  exploreButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  exploreButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
