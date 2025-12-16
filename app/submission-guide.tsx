
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
          title: 'Simple Submission Guide',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <IconSymbol 
            ios_icon_name="checkmark.circle.fill" 
            android_material_icon_name="check_circle"
            size={80}
            color="#34C759"
          />
          <Text style={styles.title}>Don&apos;t Worry - This is Simple!</Text>
          <Text style={styles.subtitle}>
            Just 2 easy steps to get your app ready for the App Store
          </Text>
        </View>

        {/* What You Need */}
        <View style={styles.bigCard}>
          <Text style={styles.bigCardTitle}>What Apple Needs From You:</Text>
          <View style={styles.needItem}>
            <Text style={styles.needNumber}>1.</Text>
            <Text style={styles.needText}>A simple Privacy Policy page (I&apos;ll give you the text)</Text>
          </View>
          <View style={styles.needItem}>
            <Text style={styles.needNumber}>2.</Text>
            <Text style={styles.needText}>A simple Support page (I&apos;ll give you the text)</Text>
          </View>
          <Text style={styles.bigCardNote}>
            That&apos;s it! Both can be on the same free website.
          </Text>
        </View>

        {/* Step 1: Create Pages */}
        <View style={styles.stepCard}>
          <View style={styles.stepHeader}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>STEP 1</Text>
            </View>
          </View>
          
          <Text style={styles.stepTitle}>Create 2 Simple Pages (5 Minutes)</Text>
          
          <Text style={styles.stepInstructions}>
            Use Google Sites - it&apos;s 100% FREE and super easy:
          </Text>

          <View style={styles.instructionBox}>
            <Text style={styles.instructionStep}>1. Go to sites.google.com</Text>
            <Text style={styles.instructionStep}>2. Click &quot;Create&quot; (blank site)</Text>
            <Text style={styles.instructionStep}>3. Name it &quot;SOFAST Global&quot;</Text>
            <Text style={styles.instructionStep}>4. Create 2 pages: &quot;Privacy&quot; and &quot;Support&quot;</Text>
          </View>

          <TouchableOpacity 
            style={styles.bigButton}
            onPress={() => openURL('https://sites.google.com/new')}
          >
            <Text style={styles.bigButtonText}>Open Google Sites (Free)</Text>
            <IconSymbol 
              ios_icon_name="arrow.right.circle.fill" 
              android_material_icon_name="arrow_forward"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        {/* Privacy Policy Text */}
        <View style={styles.textCard}>
          <View style={styles.textCardHeader}>
            <IconSymbol 
              ios_icon_name="doc.text.fill" 
              android_material_icon_name="description"
              size={32}
              color={colors.primary}
            />
            <Text style={styles.textCardTitle}>Privacy Policy Text</Text>
          </View>
          
          <Text style={styles.textCardSubtitle}>
            Copy this text and paste it into your Privacy page:
          </Text>

          <View style={styles.copyBox}>
            <Text style={styles.copyText}>
              <Text style={styles.copyBold}>Privacy Policy for SOFAST Global Drills</Text>
              {'\n\n'}
              Team SOFAST LLC operates the SOFAST Global Drills app.
              {'\n\n'}
              <Text style={styles.copyBold}>What We Collect:</Text>
              {'\n'}
              - Your drill scores and times
              {'\n'}
              - Device information for the leaderboard
              {'\n'}
              - Camera and microphone during drills only
              {'\n\n'}
              <Text style={styles.copyBold}>What We Don&apos;t Do:</Text>
              {'\n'}
              - We don&apos;t sell your data
              {'\n'}
              - We don&apos;t share your personal info
              {'\n'}
              - Videos stay on your device unless you share them
              {'\n\n'}
              <Text style={styles.copyBold}>Your Rights:</Text>
              {'\n'}
              You can delete your account anytime. Email us to request your data or ask questions.
              {'\n\n'}
              <Text style={styles.copyBold}>Contact:</Text>
              {'\n'}
              Email: [YOUR EMAIL HERE]
              {'\n'}
              Website: https://tmsofast.com
              {'\n\n'}
              Last Updated: {new Date().toLocaleDateString()}
            </Text>
          </View>

          <Text style={styles.replaceNote}>
            ⚠️ Replace [YOUR EMAIL HERE] with your actual email address
          </Text>
        </View>

        {/* Support Page Text */}
        <View style={styles.textCard}>
          <View style={styles.textCardHeader}>
            <IconSymbol 
              ios_icon_name="questionmark.circle.fill" 
              android_material_icon_name="help"
              size={32}
              color={colors.primary}
            />
            <Text style={styles.textCardTitle}>Support Page Text</Text>
          </View>
          
          <Text style={styles.textCardSubtitle}>
            Copy this text and paste it into your Support page:
          </Text>

          <View style={styles.copyBox}>
            <Text style={styles.copyText}>
              <Text style={styles.copyBold}>SOFAST Global Drills Support</Text>
              {'\n\n'}
              Need help with the app? We&apos;re here for you!
              {'\n\n'}
              <Text style={styles.copyBold}>Common Questions:</Text>
              {'\n\n'}
              <Text style={styles.copyBold}>Q: How do I start a drill?</Text>
              {'\n'}
              A: Tap any drill from the home screen, prop your phone on a bench, and tap Start.
              {'\n\n'}
              <Text style={styles.copyBold}>Q: How does scoring work?</Text>
              {'\n'}
              A: The app uses your camera and microphone to detect shots and calculate your time and accuracy.
              {'\n\n'}
              <Text style={styles.copyBold}>Q: How do I cancel my subscription?</Text>
              {'\n'}
              A: Go to iPhone Settings → Your Name → Subscriptions → SOFAST Global Drills → Cancel.
              {'\n\n'}
              <Text style={styles.copyBold}>Contact Us:</Text>
              {'\n'}
              Email: [YOUR EMAIL HERE]
              {'\n'}
              We typically respond within 24 hours.
              {'\n\n'}
              Website: https://tmsofast.com
            </Text>
          </View>

          <Text style={styles.replaceNote}>
            ⚠️ Replace [YOUR EMAIL HERE] with your actual email address
          </Text>
        </View>

        {/* Step 2: Publish */}
        <View style={styles.stepCard}>
          <View style={styles.stepHeader}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>STEP 2</Text>
            </View>
          </View>
          
          <Text style={styles.stepTitle}>Publish Your Pages</Text>
          
          <View style={styles.instructionBox}>
            <Text style={styles.instructionStep}>1. In Google Sites, click &quot;Publish&quot; (top right)</Text>
            <Text style={styles.instructionStep}>2. You&apos;ll get 2 URLs like:</Text>
            <Text style={styles.urlExample}>   sites.google.com/view/sofast-global/privacy</Text>
            <Text style={styles.urlExample}>   sites.google.com/view/sofast-global/support</Text>
            <Text style={styles.instructionStep}>3. Write these URLs down - you&apos;ll need them!</Text>
          </View>
        </View>

        {/* What's Next */}
        <View style={styles.successCard}>
          <IconSymbol 
            ios_icon_name="checkmark.seal.fill" 
            android_material_icon_name="verified"
            size={64}
            color="#34C759"
          />
          <Text style={styles.successTitle}>You&apos;re Done!</Text>
          <Text style={styles.successText}>
            Once you have those 2 URLs, you&apos;re ready to submit your app to Apple.
          </Text>
          <Text style={styles.successSubtext}>
            The actual submission to Apple is done through App Store Connect. If you need help with that part, there are many affordable services on Fiverr ($20-50) that will do it for you.
          </Text>
        </View>

        {/* Alternative Option */}
        <View style={styles.alternativeCard}>
          <Text style={styles.alternativeTitle}>💡 Too Busy? Hire Someone</Text>
          <Text style={styles.alternativeText}>
            If you don&apos;t want to do this yourself, you can hire someone on Fiverr or Upwork to:
          </Text>
          <View style={styles.alternativeList}>
            <Text style={styles.alternativeItem}>✓ Create the 2 pages for you</Text>
            <Text style={styles.alternativeItem}>✓ Submit your app to Apple</Text>
            <Text style={styles.alternativeItem}>✓ Handle the whole process</Text>
          </View>
          <Text style={styles.alternativePrice}>
            Cost: Usually $50-150 total
          </Text>
          
          <TouchableOpacity 
            style={styles.alternativeButton}
            onPress={() => openURL('https://www.fiverr.com/search/gigs?query=ios%20app%20submission')}
          >
            <Text style={styles.alternativeButtonText}>Find Help on Fiverr</Text>
            <IconSymbol 
              ios_icon_name="arrow.up.right" 
              android_material_icon_name="open_in_new"
              size={20}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Your Credentials */}
        <View style={styles.credentialsCard}>
          <IconSymbol 
            ios_icon_name="key.fill" 
            android_material_icon_name="vpn_key"
            size={40}
            color={colors.primary}
          />
          <Text style={styles.credentialsTitle}>Need Your Apple Credentials?</Text>
          <Text style={styles.credentialsText}>
            If you hire someone or need your Apple Developer info, tap below to see all your credentials.
          </Text>
          <TouchableOpacity 
            style={styles.credentialsButton}
            onPress={() => openURL('/credentials')}
          >
            <Text style={styles.credentialsButtonText}>View My Credentials</Text>
            <IconSymbol 
              ios_icon_name="arrow.right" 
              android_material_icon_name="arrow_forward"
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 60 }} />
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
    fontSize: 32,
    fontWeight: '900',
    color: colors.text,
    marginTop: 16,
    textAlign: 'center',
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    marginTop: 12,
    textAlign: 'center',
    lineHeight: 26,
  },
  bigCard: {
    backgroundColor: colors.primary + '20',
    padding: 28,
    borderRadius: 20,
    marginBottom: 32,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  bigCardTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 20,
  },
  needItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  needNumber: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.primary,
    marginRight: 16,
    width: 40,
  },
  needText: {
    flex: 1,
    fontSize: 18,
    color: colors.text,
    lineHeight: 28,
    fontWeight: '600',
  },
  bigCardNote: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    fontWeight: '600',
  },
  stepCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 28,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.border,
  },
  stepHeader: {
    marginBottom: 16,
  },
  stepBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  stepBadgeText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 1,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 16,
    lineHeight: 32,
  },
  stepInstructions: {
    fontSize: 17,
    color: colors.textSecondary,
    marginBottom: 20,
    lineHeight: 26,
  },
  instructionBox: {
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  instructionStep: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 28,
    marginBottom: 8,
    fontWeight: '500',
  },
  urlExample: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'monospace',
    marginLeft: 16,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  bigButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 16,
  },
  bigButtonText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#fff',
  },
  textCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.border,
  },
  textCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  textCardTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.text,
  },
  textCardSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 24,
  },
  copyBox: {
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  copyText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 24,
  },
  copyBold: {
    fontWeight: '900',
  },
  replaceNote: {
    fontSize: 14,
    color: '#FF9500',
    fontWeight: '700',
    textAlign: 'center',
  },
  successCard: {
    backgroundColor: '#34C75920',
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 3,
    borderColor: '#34C759',
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    marginTop: 16,
    marginBottom: 12,
  },
  successText: {
    fontSize: 17,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 12,
    fontWeight: '600',
  },
  successSubtext: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  alternativeCard: {
    backgroundColor: '#FF950020',
    padding: 28,
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#FF9500',
  },
  alternativeTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 12,
  },
  alternativeText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 24,
  },
  alternativeList: {
    marginBottom: 16,
  },
  alternativeItem: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 32,
    fontWeight: '600',
  },
  alternativePrice: {
    fontSize: 18,
    color: colors.text,
    fontWeight: '900',
    marginBottom: 20,
    textAlign: 'center',
  },
  alternativeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    padding: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  alternativeButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.primary,
  },
  credentialsCard: {
    backgroundColor: colors.surface,
    padding: 28,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.border,
  },
  credentialsTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  credentialsText: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  credentialsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 12,
  },
  credentialsButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
  },
});
