import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Search, MapPin, Calendar, Users, Star } from 'lucide-react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  attendees: number;
  maxAttendees: number;
  rating: number;
  price: string;
  featured?: boolean;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: '台北國際音樂節 2025',
    date: '2025-02-15',
    time: '19:00',
    location: '台北市信義區',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
    category: '音樂',
    attendees: 1250,
    maxAttendees: 2000,
    rating: 4.8,
    price: 'NT$ 1,200',
    featured: true,
  },
  {
    id: '2',
    title: 'AI 科技展覽會',
    date: '2025-02-20',
    time: '10:00',
    location: '南港展覽館',
    image: 'https://images.pexels.com/photos/8761581/pexels-photo-8761581.jpeg',
    category: '科技',
    attendees: 850,
    maxAttendees: 1500,
    rating: 4.6,
    price: '免費',
  },
  {
    id: '3',
    title: '當代藝術特展',
    date: '2025-02-25',
    time: '14:00',
    location: '台北當代藝術館',
    image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg',
    category: '展覽',
    attendees: 320,
    maxAttendees: 500,
    rating: 4.9,
    price: 'NT$ 350',
  },
];

const categories = ['全部', '音樂', '科技', '展覽', '運動', '美食', '教育'];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const filteredEvents = selectedCategory === '全部' 
    ? mockEvents 
    : mockEvents.filter(event => event.category === selectedCategory);

  const featuredEvents = mockEvents.filter(event => event.featured);

  const renderFeaturedEvent = ({ item }: { item: Event }) => (
    <TouchableOpacity
      style={styles.featuredCard}
      onPress={() => router.push(`/event-details?id=${item.id}`)}
      activeOpacity={0.9}
    >
      <Image source={{ uri: item.image }} style={styles.featuredImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.featuredGradient}
      />
      <View style={styles.featuredContent}>
        <Text style={styles.featuredTitle}>{item.title}</Text>
        <View style={styles.featuredInfo}>
          <Calendar size={16} color="#fff" />
          <Text style={styles.featuredDate}>{item.date} · {item.time}</Text>
        </View>
        <View style={styles.featuredInfo}>
          <MapPin size={16} color="#fff" />
          <Text style={styles.featuredLocation}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEventCard = ({ item }: { item: Event }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => router.push(`/event-details?id=${item.id}`)}
      activeOpacity={0.9}
    >
      <Image source={{ uri: item.image }} style={styles.eventImage} />
      <View style={styles.eventContent}>
        <View style={styles.eventHeader}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>
        
        <View style={styles.eventMeta}>
          <View style={styles.metaItem}>
            <Calendar size={14} color="#6B7280" />
            <Text style={styles.metaText}>{item.date}</Text>
          </View>
          <View style={styles.metaItem}>
            <MapPin size={14} color="#6B7280" />
            <Text style={styles.metaText}>{item.location}</Text>
          </View>
        </View>

        <View style={styles.eventFooter}>
          <View style={styles.attendeesContainer}>
            <Users size={14} color="#6B7280" />
            <Text style={styles.attendeesText}>
              {item.attendees}/{item.maxAttendees} 人
            </Text>
          </View>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <BlurView intensity={100} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>GoJoin 活動通</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Search size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </BlurView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Featured Events Carousel */}
        {featuredEvents.length > 0 && (
          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>精選活動</Text>
            <FlatList
              data={featuredEvents}
              renderItem={renderFeaturedEvent}
              keyExtractor={(item) => `featured-${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredList}
              snapToInterval={width - 60}
              decelerationRate="fast"
            />
          </View>
        )}

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categories}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category && styles.categoryTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Events List */}
        <View style={styles.eventsSection}>
          <Text style={styles.sectionTitle}>最新活動</Text>
          {filteredEvents.map((event) => (
            <View key={event.id}>
              {renderEventCard({ item: event })}
            </View>
          ))}
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  searchButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  content: {
    flex: 1,
  },
  featuredSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E1E1E',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  featuredList: {
    paddingHorizontal: 20,
  },
  featuredCard: {
    width: width - 80,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  featuredContent: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  featuredInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  featuredDate: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 6,
  },
  featuredLocation: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 6,
  },
  categoriesSection: {
    marginTop: 24,
  },
  categories: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryButtonActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  categoryTextActive: {
    color: '#fff',
  },
  eventsSection: {
    marginTop: 24,
    paddingBottom: 100,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 180,
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginLeft: 4,
  },
  eventMeta: {
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  metaText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeesText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10B981',
  },
});