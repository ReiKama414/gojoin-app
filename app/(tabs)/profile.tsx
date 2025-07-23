import React, { useState } from 'react';
import {
  Animated,
  Easing,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Linking,
} from 'react-native';
import { BlurView } from 'expo-blur';
import {
  User,
  Settings,
  Bell,
  Shield,
  CircleHelp as HelpCircle,
  LogOut,
  ChevronRight,
  Mail,
  Phone,
  Pizza,
  Github,
} from 'lucide-react-native';
import { user } from '@/lib/data';

import * as Notifications from 'expo-notifications';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const [helpExpanded, setHelpExpanded] = useState(false);
  const [helpAnim] = useState(new Animated.Value(0));
  const [helpContentHeight, setHelpContentHeight] = useState(0);

  const [privacyExpanded, setPrivacyExpanded] = useState(false);
  const [privacyAnim] = useState(new Animated.Value(0));
  const [privacyContentHeight, setPrivacyContentHeight] = useState(0);

  const [shareData, setShareData] = useState(false);
  const [adPersonalization, setAdPersonalization] = useState(true);

  const renderDropdown = (
    animatedValue: Animated.Value,
    expanded: boolean,
    setExpanded: (value: boolean) => void,
    setContentHeight: (value: number) => void,
    contentHeight: number,
    content: React.ReactNode
  ) => (
    <Animated.View
      style={{
        height: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, contentHeight],
        }),
        opacity: animatedValue,
        overflow: 'hidden',
        backgroundColor: '#F3F4F6',
      }}
    >
      {expanded && (
        <View
          style={{ paddingVertical: 12, paddingHorizontal: 20 }}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            if (height > 0 && contentHeight === 0) {
              setContentHeight(height);
            }
          }}
        >
          {content}
        </View>
      )}
    </Animated.View>
  );

  const toggleHelp = () => {
    if (helpExpanded) {
      Animated.timing(helpAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start(() => setHelpExpanded(false));
    } else {
      if (!helpExpanded) {
        setHelpExpanded(true);
      }
      Animated.timing(helpAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    }
  };

  const togglePrivacy = () => {
    if (privacyExpanded) {
      Animated.timing(privacyAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start(() => setPrivacyExpanded(false));
    } else {
      if (!privacyExpanded) {
        setPrivacyExpanded(true);
      }
      Animated.timing(privacyAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    }
  };

  async function toggleNotifications(enabled: boolean) {
    if (enabled) {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } =
          await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          alert('請啟用通知權限以接收提醒');
          return;
        }
      }
      setNotificationsEnabled(true);
    } else {
      // 通知取消的 UI 開關，不會真正取消授權（只能引導使用者）
      setNotificationsEnabled(false);
      alert('如需完全關閉通知，請前往系統設定');
    }
  }

  const menuItems = [
    {
      icon: Bell,
      title: '推播通知',
      subtitle: '活動提醒與重要通知',
      type: 'switch' as const,
      value: notificationsEnabled,
      onPress: () => toggleNotifications(!notificationsEnabled),
    },
    {
      icon: Shield,
      title: '隱私設定',
      subtitle: '資料保護與安全',
      type: 'navigate' as const,
      onPress: togglePrivacy,
    },
    {
      icon: HelpCircle,
      title: '幫助中心',
      subtitle: '常見問題與支援',
      type: 'navigate' as const,
      onPress: toggleHelp,
    },
    {
      icon: Github,
      title: 'Github',
      subtitle: '訪問我的 GitHub 頁面',
      type: 'link' as const,
      onPress: () => Linking.openURL('https://github.com/ReiKama414'),
    },
    {
      // icon: () => <Text style={{ fontSize: 20 }}>🐾</Text>,
      icon: Pizza,
      title: 'ReiKama414 Site',
      subtitle: '訪問我的個人網站',
      type: 'link' as const,
      onPress: () => Linking.openURL('https://reikama-414-site-v3.vercel.app'),
    },
  ];

  const renderMenuItem = (item: any) => (
    <View key={item.title}>
      <TouchableOpacity
        key={item.title}
        style={styles.menuItem}
        onPress={item.onPress}
        activeOpacity={0.7}
      >
        <View style={styles.menuItemLeft}>
          <View style={styles.menuIcon}>
            {typeof item.icon === 'function' ? (
              item.icon()
            ) : (
              <item.icon size={20} color="#10B981" />
            )}
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>{item.title}</Text>
            <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
          </View>
        </View>

        {item.type === 'switch' ? (
          <Switch
            value={item.value}
            onValueChange={item.onPress}
            trackColor={{ false: '#E5E7EB', true: '#10B981' }}
            thumbColor="#fff"
          />
        ) : (
          <ChevronRight size={20} color="#9CA3AF" />
        )}
      </TouchableOpacity>
      {item.title === '幫助中心' &&
        renderDropdown(
          helpAnim,
          helpExpanded,
          setHelpExpanded,
          setHelpContentHeight,
          helpContentHeight,
          <>
            <Text style={styles.dropdownItem}>Q：如何參加活動？</Text>
            <Text style={styles.dropdownAnswer}>
              A：前往活動頁面，點選「立即參加」，並完成報名流程即可。
            </Text>

            <Text style={styles.dropdownItem}>
              Q：我沒有收到推播通知，怎麼辦？
            </Text>
            <Text style={styles.dropdownAnswer}>
              A：請確認您已在手機系統中允許本 App 發送通知，並開啟推播功能。
            </Text>

            <Text style={styles.dropdownItem}>Q：聯絡方式？</Text>
            <Text style={styles.dropdownAnswer}>
              A：如有任何問題，歡迎來信：support@gojoin.app
            </Text>
          </>
        )}

      {item.title === '隱私設定' &&
        renderDropdown(
          privacyAnim,
          privacyExpanded,
          setPrivacyExpanded,
          setPrivacyContentHeight,
          privacyContentHeight,
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <Text style={styles.dropdownItem}>允許分享資料給第三方</Text>
              <Switch
                value={shareData}
                onValueChange={setShareData}
                trackColor={{ false: '#E5E7EB', true: '#10B981' }}
                thumbColor="#fff"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={styles.dropdownItem}>廣告個人化設定</Text>
              <Switch
                value={adPersonalization}
                onValueChange={setAdPersonalization}
                trackColor={{ false: '#E5E7EB', true: '#10B981' }}
                thumbColor="#fff"
              />
            </View>
          </>
        )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <BlurView intensity={100} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>個人檔案</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </BlurView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.editAvatarButton}>
              <User size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>{user.name}</Text>

          <View style={styles.userInfo}>
            <View style={styles.userInfoItem}>
              <Mail size={16} color="#6B7280" />
              <Text style={styles.userInfoText}>{user.email}</Text>
            </View>
            <View style={styles.userInfoItem}>
              <Phone size={16} color="#6B7280" />
              <Text style={styles.userInfoText}>{user.phone}</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.eventsAttended}</Text>
              <Text style={styles.statLabel}>參加活動</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.memberSince}</Text>
              <Text style={styles.statLabel}>加入時間</Text>
            </View>
          </View>
        </View>

        {/* Menu Section */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <View key={item.title}>{renderMenuItem(item)}</View>
          ))}
        </View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton}>
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.logoutText}>登出</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>GoJoin 活動通 v1.0.0</Text>
          <Text style={styles.footerSubtext}>
            © {new Date().getFullYear()} GoJoin. All rights reserved.
          </Text>
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
  settingsButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 32,
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 12,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  userInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  userInfoText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10B981',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  menuSection: {
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  languageSelector: {
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  languageOptionSelected: {
    backgroundColor: '#ECFDF5',
  },
  languageFlag: {
    fontSize: 20,
    marginRight: 12,
  },
  languageName: {
    fontSize: 16,
    color: '#1E1E1E',
    flex: 1,
  },
  languageNameSelected: {
    color: '#10B981',
    fontWeight: '600',
  },
  selectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  logoutSection: {
    backgroundColor: '#fff',
    marginBottom: 32,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  dropdownContainer: {
    backgroundColor: '#F3F4F6',
  },
  dropdownItem: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
    marginTop: 12,
  },
  dropdownAnswer: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
});
