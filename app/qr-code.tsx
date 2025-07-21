import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, router } from 'expo-router';
import { 
  ArrowLeft,
  QrCode,
  Sun,
  Download,
  Share,
  Calendar,
  MapPin,
  Clock
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

export default function QRCodeScreen() {
  const { eventId } = useLocalSearchParams<{ eventId: string }>();
  const [brightness, setBrightness] = useState(false);
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, []);

  const eventData = {
    id: eventId || '1',
    title: '台北國際音樂節 2025',
    date: '2025-02-15',
    time: '19:00-23:00',
    location: '台北市信義區信義路五段7號',
    qrCode: 'MUSIC2025-USER123-EVENT001',
    countdown: '2天 14小時 32分',
  };

  const toggleBrightness = () => {
    setBrightness(!brightness);
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <View style={[styles.container, brightness && styles.containerBright]}>
      <LinearGradient
        colors={brightness ? ['#fff', '#fff'] : ['#10B981', '#059669']}
        style={styles.background}
      />

      {/* Header */}
      <BlurView 
        intensity={brightness ? 50 : 80} 
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={brightness ? "#1E1E1E" : "#fff"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, brightness && styles.headerTitleBright]}>
          入場憑證
        </Text>
        <TouchableOpacity
          style={styles.brightnessButton}
          onPress={toggleBrightness}
        >
          <Sun size={24} color={brightness ? "#F59E0B" : "#fff"} />
        </TouchableOpacity>
      </BlurView>

      <View style={styles.content}>
        {/* Event Info */}
        <View style={[styles.eventInfo, brightness && styles.eventInfoBright]}>
          <Text style={[styles.eventTitle, brightness && styles.textBright]}>
            {eventData.title}
          </Text>
          
          <View style={styles.eventDetails}>
            <View style={styles.eventDetailItem}>
              <Calendar size={16} color={brightness ? "#6B7280" : "rgba(255,255,255,0.8)"} />
              <Text style={[styles.eventDetailText, brightness && styles.textBright]}>
                {eventData.date} · {eventData.time}
              </Text>
            </View>
            
            <View style={styles.eventDetailItem}>
              <MapPin size={16} color={brightness ? "#6B7280" : "rgba(255,255,255,0.8)"} />
              <Text style={[styles.eventDetailText, brightness && styles.textBright]}>
                {eventData.location}
              </Text>
            </View>
            
            <View style={styles.eventDetailItem}>
              <Clock size={16} color={brightness ? "#F59E0B" : "#FCD34D"} />
              <Text style={[styles.countdownText, brightness && styles.countdownTextBright]}>
                距離活動開始：{eventData.countdown}
              </Text>
            </View>
          </View>
        </View>

        {/* QR Code */}
        <Animated.View 
          style={[
            styles.qrContainer,
            brightness && styles.qrContainerBright,
            { transform: [{ scale: pulseAnim }] }
          ]}
        >
          <View style={[styles.qrCodeWrapper, brightness && styles.qrCodeWrapperBright]}>
            <QrCode 
              size={200} 
              color={brightness ? "#1E1E1E" : "#000"} 
              strokeWidth={1}
            />
            <Text style={[styles.qrCodeData, brightness && styles.qrCodeDataBright]}>
              {eventData.qrCode}
            </Text>
          </View>
          
          <Text style={[styles.qrInstructions, brightness && styles.textBright]}>
            請在入場時出示此 QR Code
          </Text>
        </Animated.View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, brightness && styles.actionButtonBright]}
          >
            <Download size={20} color={brightness ? "#10B981" : "#fff"} />
            <Text style={[styles.actionButtonText, brightness && styles.actionButtonTextBright]}>
              儲存圖片
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, brightness && styles.actionButtonBright]}
          >
            <Share size={20} color={brightness ? "#10B981" : "#fff"} />
            <Text style={[styles.actionButtonText, brightness && styles.actionButtonTextBright]}>
              分享憑證
            </Text>
          </TouchableOpacity>
        </View>

        {/* Important Notes */}
        <View style={[styles.notesContainer, brightness && styles.notesContainerBright]}>
          <Text style={[styles.notesTitle, brightness && styles.textBright]}>
            重要提醒
          </Text>
          <Text style={[styles.notesText, brightness && styles.textBright]}>
            • 請確保手機電量充足{'\n'}
            • 建議提前下載或截圖保存{'\n'}
            • 入場時需同時出示身分證件{'\n'}
            • QR Code 僅限本人使用，請勿轉讓
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerBright: {
    backgroundColor: '#fff',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  headerTitleBright: {
    color: '#1E1E1E',
  },
  brightnessButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  eventInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  eventInfoBright: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  eventDetails: {
    alignItems: 'center',
  },
  eventDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventDetailText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginLeft: 8,
  },
  countdownText: {
    fontSize: 14,
    color: '#FCD34D',
    fontWeight: '600',
    marginLeft: 8,
  },
  countdownTextBright: {
    color: '#F59E0B',
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  qrContainerBright: {
    // No additional styles needed
  },
  qrCodeWrapper: {
    backgroundColor: '#fff',
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  qrCodeWrapperBright: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  qrCodeData: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 12,
    fontFamily: 'monospace',
  },
  qrCodeDataBright: {
    color: '#6B7280',
  },
  qrInstructions: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    marginHorizontal: 8,
  },
  actionButtonBright: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
  actionButtonTextBright: {
    color: '#10B981',
  },
  notesContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
  },
  notesContainerBright: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  notesText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
  },
  textBright: {
    color: '#1E1E1E',
  },
});