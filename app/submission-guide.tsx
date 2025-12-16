
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Stack } from 'expo-router';
import { colors } from '../styles/commonStyles';
import { IconSymbol } from '../components/IconSymbol';

export default function SubmissionGuideScreen() {
  const openURL = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.log('Error opening URL:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'App Store Submission Guide',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <IconSymbol 
            ios_icon_name="app.badge.checkmark.fill" 
            android_material_icon_name="verified"
            size={80}
            color={colors.primary}
          />
          <Text style={styles.title}>Submit Your App to the App Store</Text>
          <Text style={styles.subtitle}>
            Follow these steps to get SOFAST Global live
          </Text>
        </View>

        {/* Important Note */}
        <View style={styles.importantCard}>
          <IconSymbol 
            ios_icon_name="exclamationmark.triangle.fill" 
            android_material_icon_name="warning"
            size={32}
            color="#FF9500"
          />
          <Text style={styles.importantText}>
            <Text style={styles.importantBold}>Important:</Text> You will need to submit this app yourself using your Apple Developer account. This guide will walk you through the exact steps.
          </Text>
        </View>

        {/* Prerequisites */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Before You Start</Text>
          
          <View style={styles.checklistItem}>
            <IconSymbol 
              ios_icon_name="checkmark.circle.fill" 
              android_material_icon_name="check_circle"
              size={24}
              color="#34C759"
            />
            <Text style={styles.checklistText}>
              Apple Developer Account (Team ID: 8V52T9GNF9) ✓
            </Text>
          </View>

          <View style={styles.checklistItem}>
            <IconSymbol 
              ios_icon_name="circle" 
              android_material_icon_name="radio_button_unchecked"
              size={24}
              color={colors.textSecondary}
            />
            <Text style={styles.checklistText}>
              Privacy Policy URL (required by Apple)
            </Text>
          </View>

          <View style={styles.checklistItem}>
            <IconSymbol 
              ios_icon_name="circle" 
              android_material_icon_name="radio_button_unchecked"
              size={24}
              color={colors.textSecondary}
            />
            <Text style={styles.checklistText}>
              Support URL (required by Apple)
            </Text>
          </View>

          <View style={styles.checklistItem}>
            <IconSymbol 
              ios_icon_name="circle" 
              android_material_icon_name="radio_button_unchecked"
              size={24}
              color={colors.textSecondary}
            />
            <Text style={styles.checklistText}>
              Marketing URL (optional but recommended)
            </Text>
          </View>
        </View>

        {/* Step 1: Create Required Pages */}
        <View style={styles.stepCard}>
          <View style={styles.stepHeader}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepTitle}>Create Required Web Pages</Text>
          </View>

          <Text style={styles.stepDescription}>
            Apple requires a Privacy Policy and Support page. You can create simple pages using Google Sites (free):
          </Text>

          <View style={styles.exampleBox}>
            <Text style={styles.exampleTitle}>Example Privacy Policy:</Text>
            <Text style={styles.exampleText}>
              &quot;SOFAST Global Drills is a marksmanship training app. We do not collect, store, or share any personal data. All training data stays on your device. For questions, contact: [your email]&quot;
            </Text>
          </View>

          <View style={styles.exampleBox}>
            <Text style={styles.exampleTitle}>Example Support Page:</Text>
            <Text style={styles.exampleText}>
              &quot;For support with SOFAST Global Drills, please email: [your email]. We typically respond within 24-48 hours.&quot;
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => openURL('https://sites.google.com')}
          >
            <Text style={styles.actionButtonText}>Create Pages with Google Sites</Text>
            <IconSymbol 
              ios_icon_name="arrow.up.right" 
              android_material_icon_name="open_in_new"
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        {/* Step 2: Create App in App Store Connect */}
        <View style={styles.stepCard}>
          <View style={styles.stepHeader}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepTitle}>Create App in App Store Connect</Text>
          </View>

          <Text style={styles.stepDescription}>
            Go to App Store Connect and create a new app:
          </Text>

          <View style={styles.infoList}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Bundle ID:</Text>
              <Text style={styles.infoValue}>com.teamsofast.sofastglobal</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>App Name:</Text>
              <Text style={styles.infoValue}>SOFAST Global Drills</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Primary Language:</Text>
              <Text style={styles.infoValue}>English (U.S.)</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>SKU:</Text>
              <Text style={styles.infoValue}>SOFAST-GLOBAL-001</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => openURL('https://appstoreconnect.apple.com')}
          >
            <Text style={styles.actionButtonText}>Open App Store Connect</Text>
            <IconSymbol 
              ios_icon_name="arrow.up.right" 
              android_material_icon_name="open_in_new"
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        {/* Step 3: Build with EAS */}
        <View style={styles.stepCard}>
          <View style={styles.stepHeader}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepTitle}>Build Your App with EAS</Text>
          </View>

          <Text style={styles.stepDescription}>
            You need to build your app using Expo Application Services (EAS). Run these commands in your terminal:
          </Text>

          <View style={styles.codeBox}>
            <Text style={styles.codeText}>
              # Install EAS CLI{'\n'}
              npm install -g eas-cli{'\n\n'}
              # Login to Expo{'\n'}
              eas login{'\n\n'}
              # Configure your project{'\n'}
              eas build:configure{'\n\n'}
              # Build for iOS{'\n'}
              eas build --platform ios
            </Text>
          </View>

          <View style={styles.noteBox}>
            <IconSymbol 
              ios_icon_name="info.circle.fill" 
              android_material_icon_name="info"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.noteText}>
              The build process takes 15-30 minutes. You&apos;ll get a link to download the .ipa file when it&apos;s done.
            </Text>
          </View>
        </View>

        {/* Step 4: Upload to App Store Connect */}
        <View style={styles.stepCard}>
          <View style={styles.stepHeader}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <Text style={styles.stepTitle}>Upload to App Store Connect</Text>
          </View>

          <Text style={styles.stepDescription}>
            Once your build is complete, submit it to App Store Connect:
          </Text>

          <View style={styles.codeBox}>
            <Text style={styles.codeText}>
              eas submit --platform ios
            </Text>
          </View>

          <Text style={styles.stepDescription}>
            Or download the .ipa file and upload it manually using Transporter app.
          </Text>
        </View>

        {/* Step 5: Fill Out App Information */}
        <View style={styles.stepCard}>
          <View style={styles.stepHeader}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>5</Text>
            </View>
            <Text style={styles.stepTitle}>Complete App Store Listing</Text>
          </View>

          <Text style={styles.stepDescription}>
            In App Store Connect, fill out all required information:
          </Text>

          <View style={styles.requirementsList}>
            <Text style={styles.requirementItem}>- App description</Text>
            <Text style={styles.requirementItem}>- Screenshots (at least 3)</Text>
            <Text style={styles.requirementItem}>- App icon (1024x1024)</Text>
            <Text style={styles.requirementItem}>- Privacy Policy URL</Text>
            <Text style={styles.requirementItem}>- Support URL</Text>
            <Text style={styles.requirementItem}>- Age rating</Text>
            <Text style={styles.requirementItem}>- Pricing ($4.99/month subscription)</Text>
          </View>
        </View>

        {/* Step 6: Submit for Review */}
        <View style={styles.stepCard}>
          <View style={styles.stepHeader}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>6</Text>
            </View>
            <Text style={styles.stepTitle}>Submit for Review</Text>
          </View>

          <Text style={styles.stepDescription}>
            Once everything is filled out, click &quot;Submit for Review&quot; in App Store Connect. Apple typically reviews apps within 24-48 hours.
          </Text>

          <View style={styles.successBox}>
            <IconSymbol 
              ios_icon_name="checkmark.circle.fill" 
              android_material_icon_name="check_circle"
              size={32}
              color="#34C759"
            />
            <Text style={styles.successText}>
              After approval, your app will be live on the App Store!
            </Text>
          </View>
        </View>

        {/* Need Help Section */}
        <View style={styles.helpCard}>
          <IconSymbol 
            ios_icon_name="questionmark.circle.fill" 
            android_material_icon_name="help"
            size={48}
            color={colors.primary}
          />
          <Text style={styles.helpTitle}>Need Professional Help?</Text>
          <Text style={styles.helpText}>
            If this seems overwhelming, consider hiring a developer or using a service like:
          </Text>
          <View style={styles.servicesList}>
            <Text style={styles.serviceItem}>- Upwork or Fiverr (hire a developer)</Text>
            <Text style={styles.serviceItem}>- Expo&apos;s EAS Submit service</Text>
            <Text style={styles.serviceItem}>- App submission services (Google &quot;iOS app submission service&quot;)</Text>
          </View>
        </View>

        {/* Resources */}
        <View style={styles.resourcesCard}>
          <Text style={styles.resourcesTitle}>Helpful Resources</Text>
          
          <TouchableOpacity 
            style={styles.resourceButton}
            onPress={() => openURL('https://docs.expo.dev/submit/ios/')}
          >
            <IconSymbol 
              ios_icon_name="book.fill" 
              android_material_icon_name="menu_book"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.resourceButtonText}>Expo iOS Submission Guide</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.resourceButton}
            onPress={() => openURL('https://developer.apple.com/app-store/submissions/')}
          >
            <IconSymbol 
              ios_icon_name="book.fill" 
              android_material_icon_name="menu_book"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.resourceButtonText}>Apple App Store Guidelines</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.resourceButton}
            onPress={() => openURL('https://www.youtube.com/results?search_query=expo+eas+submit+ios')}
          >
            <IconSymbol 
              ios_icon_name="play.circle.fill" 
              android_material_icon_name="play_circle"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.resourceButtonText}>Video Tutorials on YouTube</Text>
          </TouchableOpacity>
        </View>

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
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 24,
  },
  importantCard: {
    flexDirection: 'row',
    backgroundColor: '#FF950020',
    padding: 20,
    borderRadius: 16,
    gap: 16,
    marginBottom: 32,
    borderWidth: 2,
    borderColor: '#FF9500',
  },
  importantText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  importantBold: {
    fontWeight: '900',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 16,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
    paddingVertical: 8,
  },
  checklistText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    lineHeight: 22,
  },
  stepCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.border,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
  },
  stepTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
  },
  stepDescription: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 16,
  },
  exampleBox: {
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  exampleTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  exampleText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  infoList: {
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    fontFamily: 'monospace',
  },
  codeBox: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  codeText: {
    fontSize: 13,
    color: '#D4D4D4',
    fontFamily: 'monospace',
    lineHeight: 20,
  },
  noteBox: {
    flexDirection: 'row',
    backgroundColor: colors.primary + '20',
    padding: 12,
    borderRadius: 8,
    gap: 12,
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
    lineHeight: 20,
  },
  requirementsList: {
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 12,
  },
  requirementItem: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 28,
  },
  successBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34C75920',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    borderWidth: 2,
    borderColor: '#34C759',
  },
  successText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 22,
  },
  helpCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.border,
  },
  helpTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.text,
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  helpText: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
  servicesList: {
    width: '100%',
  },
  serviceItem: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 28,
    paddingLeft: 8,
  },
  resourcesCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  resourcesTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 16,
  },
  resourceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 12,
    gap: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resourceButtonText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
});
