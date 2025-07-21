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
  Clock,
  Users,
  Star,
  User,
  Info,
  Navigation
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

interface EventDetails {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  address: string;
  image: string;
  organizer: string;
  category: string;
  attendees: number;
  maxAttendees: number;
  rating: number;
  price: string;
  tags: string[];
  highlights: string[];
}

const mockEventDetails: Record<string, EventDetails> = {
  '1': {
    id: '1',
    title: '台北國際音樂節 2025',
    description: '一年一度的台北國際音樂節即將盛大開幕！這次活動將邀請來自世界各地的知名音樂家和樂團，為您帶來一場視聽盛宴。活動包括古典音樂、爵士樂、流行音樂等多種風格，適合所有年齡層的音樂愛好者參與。\n\n現場將設有多個舞台，同時進行不同類型的演出，讓您可以根據個人喜好選擇觀賞。此外，還有音樂工作坊、樂器體驗區等互動活動，讓您更深入了解音樂的魅力。',
    date: '2025-02-15',
    time: '19:00',
    endTime: '23:00',
    location: '台北市信義區',
    address: '台北市信義區信義路五段7號',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
    organizer: '台北市文化局',
    category: '音樂',
    attendees: 1250,
    maxAttendees: 2000,
    rating: 4.8,
    price: 'NT$ 1,200',
    tags: ['音樂節', '國際', '多元風格', '互動體驗'],
    highlights: [
      '國際知名音樂家演出',
      '多個舞台同時演出',
      '音樂工作坊體驗',
      '專業音響設備',
      '美食攤位'
    ],
  },
  '2': {
    id: '2',
    title: 'AI 科技展覽會',
    description: '探索人工智慧的無限可能！本次展覽會將展示最新的 AI 技術發展，包括機器學習、深度學習、自然語言處理等領域的創新應用。\n\n展覽分為多個主題區域，包括 AI 在醫療、教育、交通、娛樂等各個領域的應用展示。參觀者可以親身體驗各種 AI 產品和服務，了解 AI 如何改變我們的生活。',
    date: '2025-02-20',
    time: '10:00',
    endTime: '18:00',
    location: '南港展覽館',
    address: '台北市南港區經貿二路1號',
    image: 'https://images.pexels.com/photos/8761581/pexels-photo-8761581.jpeg',
    organizer: '台灣科技協會',
    category: '科技',
    attendees: 850,
    maxAttendees: 1500,
    rating: 4.6,
    price: '免費',
    tags: ['人工智慧', '科技展', '創新', '免費參觀'],
    highlights: [
      'AI 技術現場展示',
      '互動體驗區',
      '專家講座',
      '新創公司展示',
      '網絡交流機會'
    ],
  },
};

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isLiked, setIsLiked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const event = mockEventDetails[id || '1'];

  if (!event) {
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
    router.push(`/registration?eventId=${event.id}`);
  };

  const availableSpots = event.maxAttendees - event.attendees;
  const availabilityPercentage = (availableSpots / event.maxAttendees) * 100;

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
          <BlurView intensity={80} style={styles.headerOverlay}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
            
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Share size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleLike}
              >
                <Heart 
                  size={24} 
                  color={isLiked ? "#EF4444" : "#fff"}
                  fill={isLiked ? "#EF4444" : "none"}
                />
              </TouchableOpacity>
            </View>
          </BlurView>

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
                <Text style={styles.metaSubtext}>{event.time} - {event.endTime}</Text>
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
                  { width: `${100 - availabilityPercentage}%` }
                ]} 
              />
            </View>
            
            <View style={styles.availabilityInfo}>
              <Text style={styles.attendeesText}>
                已報名：{event.attendees} 人
              </Text>
              <Text style={[
                styles.spotsText,
                { color: availableSpots < 100 ? '#EF4444' : '#10B981' }
              ]}>
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
            <Text style={styles.description} numberOfLines={showFullDescription ? undefined : 4}>
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
            availableSpots === 0 && styles.registerButtonDisabled
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
    bottom: 20,
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