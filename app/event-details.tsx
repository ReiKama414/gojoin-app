import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  Share as NativeShare,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, router } from 'expo-router';
import {
  ArrowLeft,
  Share,
  Heart,
  Calendar,
  MapPin,
  Users,
  Star,
  User,
  Navigation,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { mockEventDetails } from '@/lib/data';

const { height } = Dimensions.get('window');

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: any }>();
  const [isLiked, setIsLiked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const eventIndex = parseInt(id) - 1;
  const event = mockEventDetails[eventIndex];

  if (
    isNaN(eventIndex) ||
    eventIndex < 0 ||
    eventIndex >= mockEventDetails.length ||
    !event
  ) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>活動資料載入失敗</Text>
      </View>
    );
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleRegister = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.push(`/registration?eventId=${eventIndex + 1}`);
  };

  const availableSpots = event.maxAttendees - event.attendees;
  const availabilityPercentage = (availableSpots / event.maxAttendees) * 100;

  const handleShare = async () => {
    try {
      const result = await NativeShare.share({
        title: event.title,
        message: `一起來看看這個活動吧！\n\n${event.title}\n${event.description}`,
        // 沒有 WEB 版 或上架 留空
        // url: '/event-details?id=' + event.id,
      });

      if (result.action === NativeShare.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully!');
        }
      } else if (result.action === NativeShare.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('分享失敗', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: event.image }} style={styles.heroImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.6)']}
            style={styles.heroGradient}
          />

          {/* Header Overlay */}
          <View style={styles.headerOverlay}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>

            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Share size={24} color="#fff" onPress={handleShare} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleLike}
              >
                <Heart
                  size={24}
                  color={isLiked ? '#EF4444' : '#fff'}
                  fill={isLiked ? '#EF4444' : 'none'}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Event Badge */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{event.category}</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          {/* Title and Rating */}
          <View style={styles.titleSection}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.rating}>{event.rating}</Text>
              <Text style={styles.ratingCount}>({event.attendees} 評價)</Text>
            </View>
          </View>

          {/* Event Meta Info */}
          <View style={styles.metaSection}>
            <View style={styles.metaItem}>
              <View style={styles.metaIcon}>
                <Calendar size={20} color="#10B981" />
              </View>
              <View style={styles.metaContent}>
                <Text style={styles.metaTitle}>日期時間</Text>
                <Text style={styles.metaText}>{event.date}</Text>
                <Text style={styles.metaSubtext}>
                  {event.time} - {event.endTime}
                </Text>
              </View>
            </View>

            <View style={styles.metaItem}>
              <View style={styles.metaIcon}>
                <MapPin size={20} color="#10B981" />
              </View>
              <View style={styles.metaContent}>
                <Text style={styles.metaTitle}>活動地點</Text>
                <Text style={styles.metaText}>{event.location}</Text>
                <Text style={styles.metaSubtext}>{event.address}</Text>
              </View>
              <TouchableOpacity style={styles.navigationButton}>
                <Navigation size={16} color="#10B981" />
              </TouchableOpacity>
            </View>

            <View style={styles.metaItem}>
              <View style={styles.metaIcon}>
                <User size={20} color="#10B981" />
              </View>
              <View style={styles.metaContent}>
                <Text style={styles.metaTitle}>主辦單位</Text>
                <Text style={styles.metaText}>{event.organizer}</Text>
              </View>
            </View>
          </View>

          {/* Availability Status */}
          <View style={styles.availabilitySection}>
            <View style={styles.availabilityHeader}>
              <Users size={20} color="#6B7280" />
              <Text style={styles.availabilityTitle}>報名狀況</Text>
            </View>

            <View style={styles.availabilityBar}>
              <View
                style={[
                  styles.availabilityFill,
                  { width: `${100 - availabilityPercentage}%` },
                ]}
              />
            </View>

            <View style={styles.availabilityInfo}>
              <Text style={styles.attendeesText}>
                已報名：{event.attendees} 人
              </Text>
              <Text
                style={[
                  styles.spotsText,
                  { color: availableSpots < 100 ? '#EF4444' : '#10B981' },
                ]}
              >
                剩餘：{availableSpots} 個名額
              </Text>
            </View>
          </View>

          {/* Tags */}
          <View style={styles.tagsSection}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {event.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>活動介紹</Text>
            <Text
              style={styles.description}
              numberOfLines={showFullDescription ? undefined : 4}
            >
              {event.description}
            </Text>
            <TouchableOpacity
              style={styles.readMoreButton}
              onPress={() => setShowFullDescription(!showFullDescription)}
            >
              <Text style={styles.readMoreText}>
                {showFullDescription ? '收起' : '查看更多'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Highlights */}
          <View style={styles.highlightsSection}>
            <Text style={styles.sectionTitle}>活動亮點</Text>
            {event.highlights.map((highlight, index) => (
              <View key={index} style={styles.highlightItem}>
                <View style={styles.highlightBullet} />
                <Text style={styles.highlightText}>{highlight}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Fixed Registration Button */}
      <BlurView intensity={100} style={styles.registerContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>價格</Text>
          <Text style={styles.price}>{event.price}</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.registerButton,
            availableSpots === 0 && styles.registerButtonDisabled,
          ]}
          onPress={handleRegister}
          disabled={availableSpots === 0}
        >
          <Text style={styles.registerButtonText}>
            {availableSpots === 0 ? '已額滿' : '立即報名'}
          </Text>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  heroContainer: {
    height: height * 0.4,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  contentContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  titleSection: {
    marginBottom: 24,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 8,
    lineHeight: 32,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    marginLeft: 4,
  },
  ratingCount: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  metaSection: {
    marginBottom: 24,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  metaIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  metaContent: {
    flex: 1,
  },
  metaTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  metaText: {
    fontSize: 16,
    color: '#1E1E1E',
    marginBottom: 2,
  },
  metaSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  navigationButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#ECFDF5',
  },
  availabilitySection: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  availabilityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  availabilityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    marginLeft: 8,
  },
  availabilityBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 12,
    overflow: 'hidden',
  },
  availabilityFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  availabilityInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  attendeesText: {
    fontSize: 14,
    color: '#6B7280',
  },
  spotsText: {
    fontSize: 14,
    fontWeight: '600',
  },
  tagsSection: {
    marginBottom: 24,
  },
  tag: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#0369A1',
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 8,
  },
  readMoreButton: {
    alignSelf: 'flex-start',
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  highlightsSection: {
    marginBottom: 24,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  highlightBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginTop: 7,
    marginRight: 12,
  },
  highlightText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
    lineHeight: 20,
  },
  registerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  priceContainer: {
    marginRight: 16,
  },
  priceLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10B981',
  },
  registerButton: {
    flex: 1,
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  registerButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 50,
  },
});
