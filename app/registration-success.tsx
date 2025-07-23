import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
  CircleCheck as CheckCircle,
  Calendar,
  MapPin,
  QrCode,
  Share,
  Download,
  ArrowLeft,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import QRCode from 'react-native-qrcode-svg';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function RegistrationSuccessScreen() {
  const qrRef = useRef<any>(null);
  const scaleAnim = new Animated.Value(0);
  const fadeAnim = new Animated.Value(0);

  const handleDownload = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('無法下載', '目前不支援在瀏覽器下載圖片，請使用手機 App');
      return;
    }

    if (!qrRef.current) return;

    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('需要媒體庫權限才能儲存圖片');
      return;
    }

    qrRef.current.toDataURL(async (dataURL: string) => {
      const fileUri = FileSystem.documentDirectory + 'qrcode.png';
      await FileSystem.writeAsStringAsync(fileUri, dataURL, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync('Download', asset, false);
      alert('圖片已儲存至相簿');
    });
  };

  const handleShare = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('無法分享', '目前不支援在瀏覽器分享圖片，請使用手機 App');
      return;
    }
    if (!qrRef.current) return;

    qrRef.current.toDataURL(async (dataURL: string) => {
      const fileUri = FileSystem.documentDirectory + 'qrcode.png';
      await FileSystem.writeAsStringAsync(fileUri, dataURL, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await Sharing.shareAsync(fileUri);
    });
  };

  useEffect(() => {
    // Success haptic feedback
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    // Animations
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const qrCodeData = 'MUSIC2025-USER123-EVENT001-CONFIRMED';

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#10B981', '#059669']}
        style={styles.background}
      />

      {/* Header */}
      <BlurView intensity={80} style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace('/')}
        >
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>報名成功</Text>
        <View style={styles.headerRight} />
      </BlurView>

      <View style={styles.content}>
        {/* Success Animation */}
        <Animated.View
          style={[
            styles.successContainer,
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          <View style={styles.successCircle}>
            <CheckCircle size={64} color="#fff" fill="#10B981" />
          </View>
          <Text style={styles.successTitle}>報名成功！</Text>
          <Text style={styles.successSubtitle}>
            您已成功報名台北國際音樂節 2025
          </Text>
        </Animated.View>

        {/* Event Info */}
        <Animated.View style={[styles.eventInfo, { opacity: fadeAnim }]}>
          <View style={styles.eventItem}>
            <Calendar size={20} color="#10B981" />
            <View style={styles.eventItemContent}>
              <Text style={styles.eventItemTitle}>活動時間</Text>
              <Text style={styles.eventItemText}>
                2025年2月15日 19:00-23:00
              </Text>
            </View>
          </View>

          <View style={styles.eventItem}>
            <MapPin size={20} color="#10B981" />
            <View style={styles.eventItemContent}>
              <Text style={styles.eventItemTitle}>活動地點</Text>
              <Text style={styles.eventItemText}>
                台北市信義區信義路五段7號
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* QR Code Section */}
        <Animated.View style={[styles.qrSection, { opacity: fadeAnim }]}>
          <Text style={styles.qrTitle}>入場憑證</Text>
          <Text style={styles.qrDescription}>
            請妥善保存此 QR Code，入場時需要出示
          </Text>

          <View style={styles.qrContainer}>
            <View style={styles.qrCodePlaceholder}>
              <QRCode
                value={qrCodeData}
                size={120}
                color="#1E1E1E"
                backgroundColor="#FFFFFF"
                getRef={(c) => {
                  qrRef.current = c;
                }}
              />
              <Text style={styles.qrCodeText}>{qrCodeData}</Text>
            </View>
          </View>

          <View style={styles.qrActions}>
            <TouchableOpacity
              style={styles.qrActionButton}
              onPress={handleDownload}
            >
              <Download size={20} color="#10B981" />
              <Text style={styles.qrActionText}>下載圖片</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.qrActionButton}
              onPress={handleShare}
            >
              <Share size={20} color="#10B981" />
              <Text style={styles.qrActionText}>分享</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Important Notice */}
        <Animated.View style={[styles.noticeContainer, { opacity: fadeAnim }]}>
          <Text style={styles.noticeTitle}>重要提醒</Text>
          <View style={styles.noticeItem}>
            <Text style={styles.noticeBullet}>•</Text>
            <Text style={styles.noticeText}>活動開始前1小時會發送推播通知</Text>
          </View>
          <View style={styles.noticeItem}>
            <Text style={styles.noticeBullet}>•</Text>
            <Text style={styles.noticeText}>
              請提前30分鐘到場，避免排隊等候
            </Text>
          </View>
          <View style={styles.noticeItem}>
            <Text style={styles.noticeBullet}>•</Text>
            <Text style={styles.noticeText}>
              入場時請出示此 QR Code 及身分證件
            </Text>
          </View>
        </Animated.View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/my-events')}
        >
          <Text style={styles.primaryButtonText}>查看我的活動</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.replace('/')}
        >
          <Text style={styles.secondaryButtonText}>返回首頁</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
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
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },
  eventInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  eventItemContent: {
    marginLeft: 12,
    flex: 1,
  },
  eventItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 2,
  },
  eventItemText: {
    fontSize: 16,
    color: '#1E1E1E',
  },
  qrSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  qrDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  qrContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  qrCodePlaceholder: {
    alignItems: 'center',
  },
  qrCodeText: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 12,
    fontFamily: 'monospace',
  },
  qrActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  qrActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#F0FDF4',
    marginHorizontal: 8,
  },
  qrActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
    marginLeft: 6,
  },
  noticeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 12,
  },
  noticeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  noticeBullet: {
    fontSize: 16,
    color: '#10B981',
    marginRight: 8,
    marginTop: 2,
  },
  noticeText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
    lineHeight: 20,
  },
  actionContainer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  primaryButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10B981',
  },
  secondaryButton: {
    color: '#fff',
    backgroundColor: 'rgba(85, 85, 85, 0.64)',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
