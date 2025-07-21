import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { BlurView } from 'expo-blur';
import { FlipHorizontal, Flashlight, QrCode, CircleCheck as CheckCircle, X } from 'lucide-react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';

export default function QRScannerScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [flashOn, setFlashOn] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (scanned) {
      const timer = setTimeout(() => setScanned(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [scanned]);

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>正在獲取相機權限...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <QrCode size={64} color="#10B981" />
          <Text style={styles.permissionTitle}>需要相機權限</Text>
          <Text style={styles.permissionDescription}>
            請允許相機權限以掃描 QR Code 進行入場驗證
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>授權相機</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (scanned) return;
    
    setScanned(true);
    
    // Haptic feedback (only on mobile)
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    // Simulate validation
    if (data.includes('MUSIC2025') || data.includes('TECH2025')) {
      Alert.alert(
        '入場成功 ✅',
        `已成功驗證入場憑證\n\n活動：${data.includes('MUSIC2025') ? '台北國際音樂節' : 'AI 科技展覽會'}\n時間：${new Date().toLocaleString()}`,
        [
          {
            text: '確定',
            onPress: () => {
              setScanned(false);
              router.back();
            },
          },
        ]
      );
    } else {
      Alert.alert(
        '掃描失敗 ❌',
        '無效的 QR Code，請確認是否為有效的活動入場憑證',
        [
          { text: '重新掃描', onPress: () => setScanned(false) },
        ]
      );
    }
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    setFlashOn(!flashOn);
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
      >
        {/* Header */}
        <BlurView intensity={80} style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.back()}
          >
            <X size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>掃碼入場</Text>
          <View style={styles.headerButton} />
        </BlurView>

        {/* Scanning Frame */}
        <View style={styles.scanningArea}>
          <View style={styles.scanFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
          
          {!scanned && (
            <Text style={styles.instructionText}>
              將 QR Code 對準框內進行掃描
            </Text>
          )}

          {scanned && (
            <View style={styles.successIndicator}>
              <CheckCircle size={32} color="#10B981" />
              <Text style={styles.successText}>掃描成功</Text>
            </View>
          )}
        </View>

        {/* Controls */}
        <BlurView intensity={80} style={styles.controls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={toggleFlash}
          >
            <Flashlight 
              size={24} 
              color={flashOn ? "#10B981" : "#fff"} 
              fill={flashOn ? "#10B981" : "none"}
            />
            <Text style={[styles.controlText, { color: flashOn ? "#10B981" : "#fff" }]}>
              閃光燈
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={toggleCameraFacing}
          >
            <FlipHorizontal size={24} color="#fff" />
            <Text style={styles.controlText}>翻轉</Text>
          </TouchableOpacity>
        </BlurView>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  scanningArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanFrame: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#10B981',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 12,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 12,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 12,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 12,
  },
  instructionText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 32,
    paddingHorizontal: 40,
    lineHeight: 24,
  },
  successIndicator: {
    alignItems: 'center',
    marginTop: 32,
  },
  successText: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: '600',
    marginTop: 8,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 24,
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  controlButton: {
    alignItems: 'center',
    padding: 12,
  },
  controlText: {
    fontSize: 12,
    color: '#fff',
    marginTop: 6,
    fontWeight: '500',
  },
  permissionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    backgroundColor: '#F9FAFB',
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E1E1E',
    marginTop: 16,
    marginBottom: 8,
  },
  permissionDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  permissionButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 24,
  },
  permissionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  permissionText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});