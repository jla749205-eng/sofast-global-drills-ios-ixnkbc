
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Stack } from 'expo-router';
import * as MailComposer from 'expo-mail-composer';
import { colors } from '../styles/commonStyles';
import { IconSymbol } from '../components/IconSymbol';

export default function CredentialsScreen() {
  const [showPasswords, setShowPasswords] = useState(false);

  const credentials = {
    appStoreConnect: {
      apiKey: '53AK4RGW6G',
      appDeveloperTeamId: '8V52T9GNF9',
      developerId: 'dc4dfc57-c00f-4bbc-bf09-3b7fcc319e2'
    },
    expoGo: {
      team: 'Teamsofast',
      password: 'rocduf-vopxyH-sagsu3'
    },
    github: {
      username: 'jla749205-eng',
      token: 'fSx0RMhChzHU30-uTcGmZCWm4mlWwHmAlIiOXx8v'
    },
    robotToken: 'Z_Rish7p16d6GhI1uJ3_fA7L0r52b3xV6UCg48_a'
  };

  const emailBody = `Hi Natively Support Team,

I need help getting my SOFAST Global app submitted to the App Store. Here are my credentials:

APP STORE CONNECT:
- API Key: ${credentials.appStoreConnect.apiKey}
- App Developer Team ID: ${credentials.appStoreConnect.appDeveloperTeamId}
- Developer ID: ${credentials.appStoreConnect.developerId}

EXPO GO:
- Team: ${credentials.expoGo.team}
- Password: ${credentials.expoGo.password}

GITHUB:
- Username: ${credentials.github.username}
- Token: ${credentials.github.token}

ROBOT TOKEN:
${credentials.robotToken}

Please help me get my app submitted to the App Store as soon as possible.

Thank you!`;

  const sendEmail = async () => {
    try {
      const isAvailable = await MailComposer.isAvailableAsync();
      
      if (!isAvailable) {
        Alert.alert(
          'Email Not Available',
          'Please copy the information below and send it manually to support@natively.app',
          [{ text: 'OK' }]
        );
        return;
      }

      const result = await MailComposer.composeAsync({
        recipients: ['support@natively.app'],
        subject: 'URGENT: App Store Submission - SOFAST Global',
        body: emailBody,
      });

      if (result.status === 'sent') {
        Alert.alert(
          'Email Sent! ✅',
          'Your credentials have been sent to Natively support. They will contact you within 24 hours.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error sending email:', error);
      Alert.alert(
        'Error',
        'Could not send email. Please copy the information and send it manually to support@natively.app',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'My Credentials',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <IconSymbol 
            ios_icon_name="key.fill" 
            android_material_icon_name="vpn_key"
            size={60}
            color={colors.primary}
          />
          <Text style={styles.title}>Your App Store Credentials</Text>
          <Text style={styles.subtitle}>
            All your information in one place, ready to send to Natively support
          </Text>
        </View>

        {/* Important Notice */}
        <View style={styles.noticeCard}>
          <IconSymbol 
            ios_icon_name="exclamationmark.triangle.fill" 
            android_material_icon_name="warning"
            size={32}
            color="#FF9500"
          />
          <Text style={styles.noticeText}>
            Keep this information secure! Only share it with Natively support team at support@natively.app
          </Text>
        </View>

        {/* Send Email Button */}
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={sendEmail}
        >
          <IconSymbol 
            ios_icon_name="paperplane.fill" 
            android_material_icon_name="send"
            size={28}
            color="#fff"
          />
          <View style={styles.sendButtonText}>
            <Text style={styles.sendButtonTitle}>Send to Natively Support</Text>
            <Text style={styles.sendButtonSubtitle}>Email all credentials now</Text>
          </View>
          <IconSymbol 
            ios_icon_name="arrow.right.circle.fill" 
            android_material_icon_name="arrow_circle_right"
            size={28}
            color="#fff"
          />
        </TouchableOpacity>

        {/* App Store Connect */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol 
              ios_icon_name="app.badge.fill" 
              android_material_icon_name="apps"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.sectionTitle}>App Store Connect</Text>
          </View>
          
          <View style={styles.credentialCard}>
            <Text style={styles.credentialLabel}>API Key</Text>
            <Text style={styles.credentialValue}>{credentials.appStoreConnect.apiKey}</Text>
          </View>

          <View style={styles.credentialCard}>
            <Text style={styles.credentialLabel}>App Developer Team ID</Text>
            <Text style={styles.credentialValue}>{credentials.appStoreConnect.appDeveloperTeamId}</Text>
          </View>

          <View style={styles.credentialCard}>
            <Text style={styles.credentialLabel}>Developer ID</Text>
            <Text style={styles.credentialValue}>{credentials.appStoreConnect.developerId}</Text>
          </View>
        </View>

        {/* Expo Go */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol 
              ios_icon_name="app.fill" 
              android_material_icon_name="apps"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.sectionTitle}>Expo Go</Text>
          </View>
          
          <View style={styles.credentialCard}>
            <Text style={styles.credentialLabel}>Team</Text>
            <Text style={styles.credentialValue}>{credentials.expoGo.team}</Text>
          </View>

          <View style={styles.credentialCard}>
            <Text style={styles.credentialLabel}>Password</Text>
            <TouchableOpacity 
              onPress={() => setShowPasswords(!showPasswords)}
              style={styles.passwordRow}
            >
              <Text style={styles.credentialValue}>
                {showPasswords ? credentials.expoGo.password : '••••••••••••••'}
              </Text>
              <IconSymbol 
                ios_icon_name={showPasswords ? "eye.slash.fill" : "eye.fill"}
                android_material_icon_name={showPasswords ? "visibility_off" : "visibility"}
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* GitHub */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol 
              ios_icon_name="chevron.left.forwardslash.chevron.right" 
              android_material_icon_name="code"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.sectionTitle}>GitHub</Text>
          </View>
          
          <View style={styles.credentialCard}>
            <Text style={styles.credentialLabel}>Username</Text>
            <Text style={styles.credentialValue}>{credentials.github.username}</Text>
          </View>

          <View style={styles.credentialCard}>
            <Text style={styles.credentialLabel}>Token</Text>
            <TouchableOpacity 
              onPress={() => setShowPasswords(!showPasswords)}
              style={styles.passwordRow}
            >
              <Text style={[styles.credentialValue, styles.tokenValue]}>
                {showPasswords ? credentials.github.token : '••••••••••••••••••••••••••••••••'}
              </Text>
              <IconSymbol 
                ios_icon_name={showPasswords ? "eye.slash.fill" : "eye.fill"}
                android_material_icon_name={showPasswords ? "visibility_off" : "visibility"}
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Robot Token */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol 
              ios_icon_name="gearshape.fill" 
              android_material_icon_name="settings"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.sectionTitle}>Robot Token</Text>
          </View>
          
          <View style={styles.credentialCard}>
            <Text style={styles.credentialLabel}>Token</Text>
            <TouchableOpacity 
              onPress={() => setShowPasswords(!showPasswords)}
              style={styles.passwordRow}
            >
              <Text style={[styles.credentialValue, styles.tokenValue]}>
                {showPasswords ? credentials.robotToken : '••••••••••••••••••••••••••••••••'}
              </Text>
              <IconSymbol 
                ios_icon_name={showPasswords ? "eye.slash.fill" : "eye.fill"}
                android_material_icon_name={showPasswords ? "visibility_off" : "visibility"}
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Show/Hide Toggle */}
        <TouchableOpacity 
          style={styles.toggleButton}
          onPress={() => setShowPasswords(!showPasswords)}
        >
          <IconSymbol 
            ios_icon_name={showPasswords ? "eye.slash.fill" : "eye.fill"}
            android_material_icon_name={showPasswords ? "visibility_off" : "visibility"}
            size={24}
            color={colors.primary}
          />
          <Text style={styles.toggleButtonText}>
            {showPasswords ? 'Hide' : 'Show'} Passwords & Tokens
          </Text>
        </TouchableOpacity>

        {/* Manual Copy Instructions */}
        <View style={styles.manualCard}>
          <Text style={styles.manualTitle}>If Email Button Doesn&apos;t Work:</Text>
          <Text style={styles.manualText}>
            1. Manually send an email to: support@natively.app{'\n'}
            2. Subject: URGENT: App Store Submission - SOFAST Global{'\n'}
            3. Copy all the information shown above{'\n'}
            4. Paste it into your email{'\n'}
            5. Send!
          </Text>
        </View>

        {/* What Happens Next */}
        <View style={styles.nextStepsCard}>
          <Text style={styles.nextStepsTitle}>What Happens After You Send This?</Text>
          
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepText}>
              Natively support receives your credentials
            </Text>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepText}>
              They configure your app for App Store submission
            </Text>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepText}>
              They build and submit your app to Apple
            </Text>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <Text style={styles.stepText}>
              You get notified when your app is live! 🎉
            </Text>
          </View>
        </View>

        {/* Support Contact */}
        <View style={styles.supportCard}>
          <IconSymbol 
            ios_icon_name="envelope.circle.fill" 
            android_material_icon_name="email"
            size={48}
            color={colors.primary}
          />
          <Text style={styles.supportTitle}>Need Help?</Text>
          <Text style={styles.supportText}>
            Contact Natively Support:{'\n'}
            support@natively.app
          </Text>
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
    marginBottom: 24,
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
  noticeCard: {
    flexDirection: 'row',
    backgroundColor: '#FF950020',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FF9500',
  },
  noticeText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    fontWeight: '600',
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF3B30',
    padding: 20,
    borderRadius: 16,
    gap: 16,
    marginBottom: 32,
  },
  sendButtonText: {
    flex: 1,
  },
  sendButtonTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 4,
  },
  sendButtonSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    opacity: 0.9,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.text,
  },
  credentialCard: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  credentialLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  credentialValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
    fontFamily: 'monospace',
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tokenValue: {
    flex: 1,
    marginRight: 12,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    gap: 12,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  manualCard: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  manualTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  manualText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  nextStepsCard: {
    backgroundColor: colors.surface,
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  nextStepsTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#fff',
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  supportCard: {
    backgroundColor: colors.surface,
    padding: 28,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.border,
  },
  supportTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  supportText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});
