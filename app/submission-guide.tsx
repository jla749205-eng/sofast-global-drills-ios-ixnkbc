
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
          title: 'Policies & Support',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <IconSymbol 
            ios_icon_name="doc.text.fill" 
            android_material_icon_name="description"
            size={80}
            color={colors.primary}
          />
          <Text style={styles.title}>SOFAST Global Policies</Text>
          <Text style={styles.subtitle}>
            Privacy Policy and Support Information
          </Text>
        </View>

        {/* Privacy Policy */}
        <View style={styles.policyCard}>
          <View style={styles.policyHeader}>
            <IconSymbol 
              ios_icon_name="lock.shield.fill" 
              android_material_icon_name="security"
              size={32}
              color={colors.primary}
            />
            <Text style={styles.policyTitle}>Privacy Policy</Text>
          </View>
          
          <View style={styles.policyContent}>
            <Text style={styles.policyText}>
              <Text style={styles.policyBold}>Privacy Policy for SOFAST Global Drills</Text>
              {'\n\n'}
              Team SOFAST LLC operates the SOFAST Global Drills app.
              {'\n\n'}
              <Text style={styles.policyBold}>What We Collect:</Text>
              {'\n'}
              - Your drill scores and times
              {'\n'}
              - Device information for the leaderboard
              {'\n'}
              - Camera and microphone during drills only
              {'\n\n'}
              <Text style={styles.policyBold}>What We Don&apos;t Do:</Text>
              {'\n'}
              - We don&apos;t sell your data
              {'\n'}
              - We don&apos;t share your personal info
              {'\n'}
              - Videos stay on your device unless you share them
              {'\n\n'}
              <Text style={styles.policyBold}>Your Rights:</Text>
              {'\n'}
              You can delete your account anytime. Email us to request your data or ask questions.
              {'\n\n'}
              <Text style={styles.policyBold}>Contact:</Text>
              {'\n'}
              Email: info@tmsofast.com
              {'\n'}
              Website: https://www.tmsofast.com
              {'\n\n'}
              Last Updated: {new Date().toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Support Information */}
        <View style={styles.policyCard}>
          <View style={styles.policyHeader}>
            <IconSymbol 
              ios_icon_name="questionmark.circle.fill" 
              android_material_icon_name="help"
              size={32}
              color={colors.primary}
            />
            <Text style={styles.policyTitle}>Support</Text>
          </View>
          
          <View style={styles.policyContent}>
            <Text style={styles.policyText}>
              <Text style={styles.policyBold}>SOFAST Global Drills Support</Text>
              {'\n\n'}
              Need help with the app? We&apos;re here for you!
              {'\n\n'}
              <Text style={styles.policyBold}>Common Questions:</Text>
              {'\n\n'}
              <Text style={styles.policyBold}>Q: How do I start a drill?</Text>
              {'\n'}
              A: Tap any drill from the home screen, prop your phone on a bench, and tap Start.
              {'\n\n'}
              <Text style={styles.policyBold}>Q: How does scoring work?</Text>
              {'\n'}
              A: The app uses your camera and microphone to detect shots and calculate your time and accuracy.
              {'\n\n'}
              <Text style={styles.policyBold}>Q: How do I cancel my subscription?</Text>
              {'\n'}
              A: Go to iPhone Settings → Your Name → Subscriptions → SOFAST Global Drills → Cancel.
              {'\n\n'}
              <Text style={styles.policyBold}>Contact Us:</Text>
              {'\n'}
              Email: info@tmsofast.com
              {'\n'}
              We typically respond within 24 hours.
              {'\n\n'}
              Website: https://www.tmsofast.com
            </Text>
          </View>
        </View>

        {/* Contact Card */}
        <View style={styles.contactCard}>
          <IconSymbol 
            ios_icon_name="envelope.fill" 
            android_material_icon_name="email"
            size={40}
            color={colors.primary}
          />
          <Text style={styles.contactTitle}>Need Help?</Text>
          <Text style={styles.contactText}>
            Contact us at info@tmsofast.com
          </Text>
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => openURL('mailto:info@tmsofast.com')}
          >
            <Text style={styles.contactButtonText}>Send Email</Text>
            <IconSymbol 
              ios_icon_name="arrow.right" 
              android_material_icon_name="arrow_forward"
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        {/* Website Link */}
        <TouchableOpacity 
          style={styles.websiteCard}
          onPress={() => openURL('https://www.tmsofast.com')}
        >
          <IconSymbol 
            ios_icon_name="globe" 
            android_material_icon_name="language"
            size={32}
            color={colors.primary}
          />
          <View style={styles.websiteContent}>
            <Text style={styles.websiteTitle}>Visit Our Website</Text>
            <Text style={styles.websiteUrl}>www.tmsofast.com</Text>
          </View>
          <IconSymbol 
            ios_icon_name="arrow.up.right" 
            android_material_icon_name="open_in_new"
            size={24}
            color={colors.textSecondary}
          />
        </TouchableOpacity>

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
  policyCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.border,
  },
  policyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
  },
  policyTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
  },
  policyContent: {
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  policyText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 24,
  },
  policyBold: {
    fontWeight: '900',
    color: colors.text,
  },
  contactCard: {
    backgroundColor: colors.surface,
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  contactTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  contactText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 12,
  },
  contactButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
  },
  websiteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.border,
    gap: 16,
  },
  websiteContent: {
    flex: 1,
  },
  websiteTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  websiteUrl: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
});
