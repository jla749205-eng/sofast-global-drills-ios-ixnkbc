
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function LaunchGuideScreen() {
  const router = useRouter();

  const openURL = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Error opening URL:', err));
  };

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
        <Text style={styles.headerTitle}>Launch Guide</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleSection}>
          <IconSymbol
            ios_icon_name="rocket.fill"
            android_material_icon_name="rocket_launch"
            size={48}
            color={colors.primary}
          />
          <Text style={styles.title}>Get in the App Store</Text>
          <Text style={styles.subtitle}>
            Simple 3-step guide to launch your app
          </Text>
        </View>

        {/* Step 1 */}
        <View style={styles.stepCard}>
          <View style={styles.stepHeader}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepTitle}>Create Apple Developer Account</Text>
          </View>
          <Text style={styles.stepDescription}>
            Sign up for an Apple Developer account ($99/year) to publish apps on the App Store.
          </Text>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => openURL('https://developer.apple.com/programs/')}
          >
            <Text style={styles.linkButtonText}>Go to Apple Developer</Text>
            <IconSymbol
              ios_icon_name="arrow.up.right"
              android_material_icon_name="open_in_new"
              size={16}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Step 2 */}
        <View style={styles.stepCard}>
          <View style={styles.stepHeader}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepTitle}>Build Your App</Text>
          </View>
          <Text style={styles.stepDescription}>
            Use Natively to build your app. Once ready, download the build and test it on your device via TestFlight.
          </Text>
          <View style={styles.infoBox}>
            <IconSymbol
              ios_icon_name="info.circle.fill"
              android_material_icon_name="info"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.infoText}>
              TestFlight allows you to test your app before submitting to the App Store.
            </Text>
          </View>
        </View>

        {/* Step 3 */}
        <View style={styles.stepCard}>
          <View style={styles.stepHeader}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepTitle}>Submit to App Store</Text>
          </View>
          <Text style={styles.stepDescription}>
            Create your app listing in App Store Connect with screenshots, description, and metadata. Then submit for review.
          </Text>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => openURL('https://appstoreconnect.apple.com/')}
          >
            <Text style={styles.linkButtonText}>Open App Store Connect</Text>
            <IconSymbol
              ios_icon_name="arrow.up.right"
              android_material_icon_name="open_in_new"
              size={16}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Requirements */}
        <View style={styles.requirementsCard}>
          <Text style={styles.requirementsTitle}>What You&apos;ll Need</Text>
          <View style={styles.requirementItem}>
            <IconSymbol
              ios_icon_name="checkmark.circle.fill"
              android_material_icon_name="check_circle"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.requirementText}>Apple Developer Account ($99/year)</Text>
          </View>
          <View style={styles.requirementItem}>
            <IconSymbol
              ios_icon_name="checkmark.circle.fill"
              android_material_icon_name="check_circle"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.requirementText}>App screenshots (various sizes)</Text>
          </View>
          <View style={styles.requirementItem}>
            <IconSymbol
              ios_icon_name="checkmark.circle.fill"
              android_material_icon_name="check_circle"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.requirementText}>App description and keywords</Text>
          </View>
          <View style={styles.requirementItem}>
            <IconSymbol
              ios_icon_name="checkmark.circle.fill"
              android_material_icon_name="check_circle"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.requirementText}>Privacy Policy URL</Text>
          </View>
          <View style={styles.requirementItem}>
            <IconSymbol
              ios_icon_name="checkmark.circle.fill"
              android_material_icon_name="check_circle"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.requirementText}>Support URL</Text>
          </View>
        </View>

        {/* Help */}
        <TouchableOpacity
          style={styles.helpButton}
          onPress={() => router.push('/submission-guide')}
        >
          <IconSymbol
            ios_icon_name="book.fill"
            android_material_icon_name="menu_book"
            size={24}
            color={colors.primary}
          />
          <View style={styles.helpButtonContent}>
            <Text style={styles.helpButtonTitle}>Detailed Submission Guide</Text>
            <Text style={styles.helpButtonSubtitle}>
              Step-by-step instructions with screenshots
            </Text>
          </View>
          <IconSymbol
            ios_icon_name="chevron.right"
            android_material_icon_name="chevron_right"
            size={24}
            color={colors.textSecondary}
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
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  stepCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.background,
  },
  stepTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  stepDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  linkButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  requirementsCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  requirementsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  requirementText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  helpButtonContent: {
    flex: 1,
  },
  helpButtonTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  helpButtonSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});
