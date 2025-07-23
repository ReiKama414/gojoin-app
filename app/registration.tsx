import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { useLocalSearchParams, router } from 'expo-router';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  CircleCheck as CheckCircle,
  Info,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

interface TicketType {
  id: string;
  name: string;
  price: string;
  description: string;
  available: number;
}

const ticketTypes: TicketType[] = [
  {
    id: 'general',
    name: '一般票',
    price: 'NT$ 1,200',
    description: '標準入場門票',
    available: 500,
  },
  {
    id: 'student',
    name: '學生票',
    price: 'NT$ 800',
    description: '需出示學生證',
    available: 200,
  },
  {
    id: 'vip',
    name: 'VIP票',
    price: 'NT$ 2,500',
    description: '包含專屬座位區及餐點',
    available: 50,
  },
];

const steps = [
  { id: 1, title: '填寫資料', description: '基本個人資料' },
  { id: 2, title: '選擇票種', description: '選擇適合的票券' },
  { id: 3, title: '確認報名', description: '檢查資料並完成' },
];

export default function RegistrationScreen() {
  const { eventId } = useLocalSearchParams<{ eventId: string }>();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    emergencyContact: '',
    specialRequirements: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    specialRequirements: false,
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequirements: '',
  });

  const validateName = (name: string) => {
    if (!name.trim()) return '姓名為必填';
    if (name.length > 50) return '姓名不可超過 50 字';
    return '';
  };

  const validateEmail = (email: string) => {
    if (!email.trim()) return '電子郵件為必填';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return '電子郵件格式錯誤';
    return '';
  };

  const validatePhone = (phone: string) => {
    if (!phone.trim()) return '手機號碼為必填';
    const phoneRegex = /^[+\d][\d\s-]{6,}$/;
    if (!phoneRegex.test(phone)) return '手機號碼格式錯誤';
    return '';
  };

  const validateSpecialRequirements = (text: string) => {
    if (text.length > 200) return '特殊需求不可超過 200 字';
    return '';
  };

  useEffect(() => {
    setErrors({
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      specialRequirements: validateSpecialRequirements(
        formData.specialRequirements
      ),
    });
  }, [formData]);

  const handleNext = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete registration
      router.push('/registration-success');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const isStepValid = () => {
    if (currentStep === 1) {
      return (
        !errors.name &&
        !errors.email &&
        !errors.phone &&
        formData.name.trim() !== '' &&
        formData.email.trim() !== '' &&
        formData.phone.trim() !== ''
      );
    } else if (currentStep === 2) {
      return selectedTicket !== null;
    } else if (currentStep === 3) {
      return true;
    }
    return false;
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {steps.map((step, index) => (
        <View key={step.id} style={styles.stepItem}>
          <View
            style={[
              styles.stepCircle,
              currentStep >= step.id && styles.stepCircleActive,
              currentStep > step.id && styles.stepCircleCompleted,
            ]}
          >
            {currentStep > step.id ? (
              <CheckCircle size={16} color="#fff" />
            ) : (
              <Text
                style={[
                  styles.stepNumber,
                  currentStep >= step.id && styles.stepNumberActive,
                ]}
              >
                {step.id}
              </Text>
            )}
          </View>
          <View style={styles.stepText}>
            <Text
              style={[
                styles.stepTitle,
                currentStep >= step.id && styles.stepTitleActive,
              ]}
            >
              {step.title}
            </Text>
            <Text style={styles.stepDescription}>{step.description}</Text>
          </View>
          {index < steps.length - 1 && (
            <View
              style={[
                styles.stepConnector,
                currentStep > step.id && styles.stepConnectorActive,
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepContentTitle}>填寫個人資料</Text>
      <Text style={styles.stepContentDescription}>
        請填寫完整的個人資料以完成報名
      </Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>姓名 *</Text>
        <View style={styles.inputContainer}>
          <User size={20} color="#6B7280" />
          <TextInput
            style={styles.input}
            placeholder="請輸入您的姓名"
            placeholderTextColor="#b9bfc9ff"
            underlineColorAndroid="transparent"
            value={formData.name}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, name: text }))
            }
            onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
          />
        </View>
        {!!errors.name && touched.name && (
          <Text style={styles.errorText}>{errors.name}</Text>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>電子郵件 *</Text>
        <View style={styles.inputContainer}>
          <Mail size={20} color="#6B7280" />
          <TextInput
            style={styles.input}
            placeholder="example@email.com"
            placeholderTextColor="#b9bfc9ff"
            underlineColorAndroid="transparent"
            value={formData.email}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, email: text }))
            }
            keyboardType="email-address"
            autoCapitalize="none"
            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
          />
        </View>
        {!!errors.email && touched.email && (
          <Text style={styles.errorText}>{errors.email}</Text>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>手機號碼 *</Text>
        <View style={styles.inputContainer}>
          <Phone size={20} color="#6B7280" />
          <TextInput
            style={styles.input}
            placeholder="0912-345-678"
            placeholderTextColor="#b9bfc9ff"
            underlineColorAndroid="transparent"
            value={formData.phone}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, phone: text }))
            }
            keyboardType="phone-pad"
            onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
          />
        </View>
        {!!errors.phone && touched.phone && (
          <Text style={styles.errorText}>{errors.phone}</Text>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>緊急聯絡人</Text>
        <View style={styles.inputContainer}>
          <Phone size={20} color="#6B7280" />
          <TextInput
            style={styles.input}
            placeholder="緊急聯絡人電話"
            placeholderTextColor="#b9bfc9ff"
            underlineColorAndroid="transparent"
            value={formData.emergencyContact}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, emergencyContact: text }))
            }
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>特殊需求</Text>
        <View style={[styles.inputContainer, styles.textAreaContainer]}>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="如有特殊需求請告知（輪椅通道、素食等）"
            placeholderTextColor="#b9bfc9ff"
            underlineColorAndroid="transparent"
            value={formData.specialRequirements}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, specialRequirements: text }))
            }
            multiline
            numberOfLines={3}
            onBlur={() =>
              setTouched((prev) => ({
                ...prev,
                specialRequirements: true,
              }))
            }
          />
        </View>
        {!!errors.specialRequirements && touched.specialRequirements && (
          <Text style={styles.errorText}>{errors.specialRequirements}</Text>
        )}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepContentTitle}>選擇票種</Text>
      <Text style={styles.stepContentDescription}>請選擇適合的票券類型</Text>

      {ticketTypes.map((ticket) => (
        <TouchableOpacity
          key={ticket.id}
          style={[
            styles.ticketOption,
            selectedTicket === ticket.id && styles.ticketOptionSelected,
          ]}
          onPress={() => setSelectedTicket(ticket.id)}
        >
          <View style={styles.ticketInfo}>
            <Text style={styles.ticketName}>{ticket.name}</Text>
            <Text style={styles.ticketDescription}>{ticket.description}</Text>
            <Text style={styles.ticketAvailable}>
              剩餘 {ticket.available} 張
            </Text>
          </View>
          <View style={styles.ticketPrice}>
            <Text style={styles.ticketPriceText}>{ticket.price}</Text>
          </View>
          <View
            style={[
              styles.radioButton,
              selectedTicket === ticket.id && styles.radioButtonSelected,
            ]}
          >
            {selectedTicket === ticket.id && (
              <View style={styles.radioButtonInner} />
            )}
          </View>
        </TouchableOpacity>
      ))}

      <View style={styles.infoBox}>
        <Info size={16} color="#3B82F6" />
        <Text style={styles.infoText}>學生票需於現場出示有效學生證件</Text>
      </View>
    </View>
  );

  const renderStep3 = () => {
    const selectedTicketData = ticketTypes.find((t) => t.id === selectedTicket);

    return (
      <View style={styles.stepContent}>
        <Text style={styles.stepContentTitle}>確認報名資料</Text>
        <Text style={styles.stepContentDescription}>
          請檢查以下資料是否正確
        </Text>

        <View style={styles.confirmationSection}>
          <Text style={styles.confirmationSectionTitle}>個人資料</Text>
          <View style={styles.confirmationItem}>
            <Text style={styles.confirmationLabel}>姓名</Text>
            <Text style={styles.confirmationValue}>{formData.name}</Text>
          </View>
          <View style={styles.confirmationItem}>
            <Text style={styles.confirmationLabel}>電子郵件</Text>
            <Text style={styles.confirmationValue}>{formData.email}</Text>
          </View>
          <View style={styles.confirmationItem}>
            <Text style={styles.confirmationLabel}>手機號碼</Text>
            <Text style={styles.confirmationValue}>{formData.phone}</Text>
          </View>
        </View>

        <View style={styles.confirmationSection}>
          <Text style={styles.confirmationSectionTitle}>票券資訊</Text>
          <View style={styles.confirmationItem}>
            <Text style={styles.confirmationLabel}>票種</Text>
            <Text style={styles.confirmationValue}>
              {selectedTicketData?.name}
            </Text>
          </View>
          <View style={styles.confirmationItem}>
            <Text style={styles.confirmationLabel}>價格</Text>
            <Text style={styles.confirmationValue}>
              {selectedTicketData?.price}
            </Text>
          </View>
        </View>

        <View style={styles.termsContainer}>
          <View style={styles.termsCheckbox}>
            <CheckCircle size={20} color="#10B981" />
          </View>
          <Text style={styles.termsText}>
            我已閱讀並同意 <Text style={styles.termsLink}>服務條款</Text> 和{' '}
            <Text style={styles.termsLink}>隱私政策</Text>
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <BlurView intensity={100} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#1E1E1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>活動報名</Text>
        <View style={styles.headerRight} />
      </BlurView>

      {/* Step Indicator */}
      {renderStepIndicator()}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            !isStepValid() && styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={!isStepValid()}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === 3 ? '完成報名' : '下一步'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  headerRight: {
    width: 40,
  },
  stepIndicator: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepCircleActive: {
    backgroundColor: '#10B981',
  },
  stepCircleCompleted: {
    backgroundColor: '#10B981',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  stepNumberActive: {
    color: '#fff',
  },
  stepText: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 2,
  },
  stepTitleActive: {
    color: '#1E1E1E',
  },
  stepDescription: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  stepConnector: {
    position: 'absolute',
    left: 16,
    top: 32,
    width: 2,
    height: 32,
    backgroundColor: '#E5E7EB',
  },
  stepConnectorActive: {
    backgroundColor: '#10B981',
  },
  content: {
    flex: 1,
  },
  stepContent: {
    padding: 20,
  },
  stepContentTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  stepContentDescription: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
    lineHeight: 24,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textAreaContainer: {
    alignItems: 'flex-start',
    paddingVertical: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1E1E1E',
    marginLeft: 12,
    padding: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,

    ...(Platform.OS === 'web' && {
      outlineWidth: 0,
      outlineColor: 'transparent',
    }),
  },
  textArea: {
    marginLeft: 0,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  ticketOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  ticketOptionSelected: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  ticketInfo: {
    flex: 1,
    marginRight: 12,
  },
  ticketName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  ticketDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  ticketAvailable: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  ticketPrice: {
    marginRight: 12,
  },
  ticketPriceText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10B981',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#10B981',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EBF8FF',
    padding: 12,
    borderRadius: 12,
    marginTop: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#1E40AF',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  confirmationSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  confirmationSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 12,
  },
  confirmationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  confirmationLabel: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  confirmationValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E1E1E',
    flex: 2,
    textAlign: 'right',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F0FDF4',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  termsCheckbox: {
    marginRight: 12,
    marginTop: 2,
  },
  termsText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
    lineHeight: 20,
  },
  termsLink: {
    color: '#10B981',
    fontWeight: '600',
  },
  actionContainer: {
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  nextButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
