
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function StatusScreen() {
  const router = useRouter();

  const steps = [
    {
      number: 1,
      title: 'Build Your App',
      description: 'You are here! Your app is being built in Natively.',
      status: 'current',
      icon: 'hammer.fill' as const,
    },
    {
      number: 2,
      title: 'Test in TestFlight',
      description: 'Once built, test your app on your iPhone via TestFlight.',
      status: 'upcoming',
      icon: 'airplane' as const,
    },
    {
      number: 3,
      title: 'Submit to App Store',
      description: 'After testing, submit your app to the Apple App Store.',
      status: 'upcoming',
      icon: 'app.badge' as const,
    },
    {
      number: 4,
      title: 'Live in App Store',
      description: 'Your app is live and available for download!',
      status: 'upcoming',
      icon: 'checkmark.circle.fill' as const,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <IconSymbol
            ios_icon_name="chevron.left"
            android_material_icon_name="arrow_back"
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Status</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleSection}>
          <Text style={styles.title}>Where Am I?</Text>
          <Text style={styles.subtitle}>
            Track your progress from development to App Store launch
          </Text>
        </View>

        {steps.map((step, index) => (
          <View key={step.number} style={styles.stepContainer}>
            <View style={styles.stepIndicator}>
              <View
                style={[
                  styles.stepCircle,
                  step.status === 'current' && styles.stepCircleCurrent,
                  step.status === 'completed' && styles.stepCircleCompleted,
                ]}
              >
                <IconSymbol
                  ios_icon_name={step.icon}
                  android_material_icon_name={
                    step.icon === 'hammer.fill' ? 'build' :
                    step.icon === 'airplane' ? 'flight' :
                    step.icon === 'app.badge' ? 'apps' :
                    'check_circle'
                  }
                  size={24}
                  color={
                    step.status === 'current' ? colors.primary :
                    step.status === 'completed' ? colors.background :
                    colors.textSecondary
                  }
                />
              </View>
              {index < steps.length - 1 && (
                <View style={styles.stepLine} />
              )}
            </View>

            <View style={styles.stepContent}>
              <View style={styles.stepHeader}>
                <Text style={styles.stepNumber}>Step {step.number}</Text>
                {step.status === 'current' && (
                  <View style={styles.currentBadge}>
                    <Text style={styles.currentBadgeText}>CURRENT</Text>
                  </View>
                )}
              </View>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </View>
          </View>
        ))}

        <View style={styles.helpSection}>
          <IconSymbol
            ios_icon_name="questionmark.circle.fill"
            android_material_icon_name="help"
            size={32}
            color={colors.primary}
          />
          <View style={styles.helpContent}>
            <Text style={styles.helpTitle}>Need Help?</Text>
            <Text style={styles.helpText}>
              Check out our submission guide for detailed instructions on getting your app into the App Store.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.guideButton}
          onPress={() => router.push('/submission-guide')}
        >
          <Text style={styles.guideButtonText}>View Submission Guide</Text>
          <IconSymbol
            ios_icon_name="arrow.right"
            android_material_icon_name="arrow_forward"
            size={20}
            color={colors.background}
          />
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 48 : 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  titleSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  stepIndicator: {
    alignItems: 'center',
    marginRight: 16,
  },
  stepCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleCurrent: {
    backgroundColor: colors.background,
    borderColor: colors.primary,
    borderWidth: 3,
  },
  stepCircleCompleted: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  stepLine: {
    width: 2,
    flex: 1,
    backgroundColor: colors.secondary,
    marginVertical: 8,
  },
  stepContent: {
    flex: 1,
    paddingTop: 4,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 1,
  },
  currentBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  currentBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.background,
    letterSpacing: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  helpSection: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.secondary,
    gap: 12,
  },
  helpContent: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  helpText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  guideButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  guideButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.background,
  },
});
