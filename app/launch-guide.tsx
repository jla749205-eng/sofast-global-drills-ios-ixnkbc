
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert, Modal } from 'react-native';
import { Stack } from 'expo-router';
import * as MailComposer from 'expo-mail-composer';
import { colors } from '../styles/commonStyles';
import { IconSymbol } from '../components/IconSymbol';

export default function LaunchGuideScreen() {
  const [showEmailInfo, setShowEmailInfo] = useState(false);

  const emailTemplate = `Hi Natively Team,

I'm ready to get my SOFAST Global app into the App Store.

✅ I have an Apple Developer account

My Apple ID email: [ENTER YOUR APPLE ID EMAIL]

✅ I have created 3 simple web pages:

Privacy Policy URL: [ENTER URL]
Support Page URL: [ENTER URL]
Marketing Page URL: [ENTER URL]

Please build my app and help me submit it to the App Store!

Thanks!`;

  const openEmail = async () => {
    try {
      console.log('Checking if mail composer is available...');
      
      // Check if mail composer is available
      const isAvailable = await MailComposer.isAvailableAsync();
      console.log('Mail composer available:', isAvailable);
      
      if (!isAvailable) {
        console.log('Mail composer not available, showing manual email option');
        Alert.alert(
          'Email Setup Required',
          'Your device needs an email account configured to send emails.\n\nWould you like to see the email information so you can send it manually?',
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Show Email Info', 
              onPress: () => setShowEmailInfo(true)
            }
          ]
        );
        return;
      }

      console.log('Opening mail composer...');
      
      // Use native mail composer
      const result = await MailComposer.composeAsync({
        recipients: ['support@natively.app'],
        subject: 'Ready to Launch SOFAST Global',
        body: emailTemplate,
      });

      console.log('Email composer result:', result);
      
      if (result.status === 'sent') {
        Alert.alert(
          'Success! 🎉', 
          'Your email has been sent. We\'ll get back to you within 24 hours!',
          [{ text: 'OK' }]
        );
      } else if (result.status === 'cancelled') {
        console.log('User cancelled email');
      } else if (result.status === 'saved') {
        Alert.alert(
          'Email Saved',
          'Your email has been saved as a draft. Don\'t forget to send it!',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error opening email composer:', error);
      Alert.alert(
        'Unable to Open Email',
        'There was a problem opening your email app.\n\nWould you like to see the email information so you can send it manually?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Show Email Info', 
            onPress: () => setShowEmailInfo(true)
          }
        ]
      );
    }
  };

  const openGoogleSites = async () => {
    const url = 'https://sites.google.com';
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Cannot open Google Sites');
      }
    } catch (error) {
      console.log('Error opening Google Sites:', error);
    }
  };

  const openConfusedEmail = async () => {
    try {
      const isAvailable = await MailComposer.isAvailableAsync();
      
      if (!isAvailable) {
        Alert.alert(
          'Email Setup Required',
          'Please send an email to:\n\nsupport@natively.app\n\nSubject: I\'m Confused About App Store\n\nMessage: Hi, I\'m trying to get my SOFAST Global app in the App Store but I\'m confused. Can you help me?',
          [{ text: 'OK' }]
        );
        return;
      }

      const emailBody = `Hi,

I'm trying to get my SOFAST Global app in the App Store but I'm confused. Can you help me?

Thanks!`;

      await MailComposer.composeAsync({
        recipients: ['support@natively.app'],
        subject: 'I\'m Confused About App Store',
        body: emailBody,
      });
    } catch (error) {
      console.log('Error opening email composer:', error);
      Alert.alert(
        'Error',
        'Please send an email to support@natively.app with subject "I\'m Confused About App Store"'
      );
    }
  };

  const copyToClipboard = (text: string) => {
    // Note: Clipboard API would require expo-clipboard package
    Alert.alert('Copy Manually', 'Please manually copy the information shown above.');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Get in the App Store',
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
          <Text style={styles.title}>You&apos;re Almost There!</Text>
          <Text style={styles.subtitle}>
            Just 2 simple things, then email us. That&apos;s it!
          </Text>
        </View>

        {/* Step 1 */}
        <View style={styles.bigCard}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>
          <Text style={styles.cardTitle}>Apple Developer Account</Text>
          <Text style={styles.cardDescription}>
            You mentioned you already have this! ✓
          </Text>
          <View style={styles.checkmark}>
            <IconSymbol 
              ios_icon_name="checkmark.circle.fill" 
              android_material_icon_name="check_circle"
              size={32}
              color="#34C759"
            />
            <Text style={styles.checkmarkText}>Done!</Text>
          </View>
        </View>

        {/* Step 2 */}
        <View style={styles.bigCard}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>
          <Text style={styles.cardTitle}>Create 3 Simple Web Pages</Text>
          <Text style={styles.cardDescription}>
            Apple requires 3 URLs. They can be SUPER simple - just a few sentences each:
          </Text>
          
          <View style={styles.urlList}>
            <View style={styles.urlItem}>
              <IconSymbol 
                ios_icon_name="1.circle.fill" 
                android_material_icon_name="looks_one"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.urlText}>Privacy Policy (what data you collect)</Text>
            </View>
            <View style={styles.urlItem}>
              <IconSymbol 
                ios_icon_name="2.circle.fill" 
                android_material_icon_name="looks_two"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.urlText}>Support Page (how to contact you)</Text>
            </View>
            <View style={styles.urlItem}>
              <IconSymbol 
                ios_icon_name="3.circle.fill" 
                android_material_icon_name="looks_3"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.urlText}>Marketing Page (what your app does)</Text>
            </View>
          </View>

          <View style={styles.exampleBox}>
            <Text style={styles.exampleTitle}>Example Privacy Policy:</Text>
            <Text style={styles.exampleText}>
              &quot;SOFAST Global does not collect or store any personal data. All training data stays on your device.&quot;
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.createButton}
            onPress={openGoogleSites}
          >
            <IconSymbol 
              ios_icon_name="plus.circle.fill" 
              android_material_icon_name="add_circle"
              size={24}
              color="#fff"
            />
            <Text style={styles.createButtonText}>Create Pages with Google Sites (Free & Easy)</Text>
          </TouchableOpacity>

          <Text style={styles.helpText}>
            💡 Google Sites is the easiest way. Just click &quot;Create&quot; and type a few sentences. Takes 5 minutes total!
          </Text>
        </View>

        {/* Step 3 - Email */}
        <View style={[styles.bigCard, styles.emailCard]}>
          <View style={[styles.stepNumber, styles.stepNumberFinal]}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>
          <Text style={styles.cardTitle}>Email Us Your Info</Text>
          <Text style={styles.cardDescription}>
            Once you have your 3 URLs, just tap the button below. We&apos;ll build your app and submit it to Apple for you!
          </Text>

          <TouchableOpacity 
            style={styles.emailButton}
            onPress={openEmail}
          >
            <IconSymbol 
              ios_icon_name="envelope.fill" 
              android_material_icon_name="email"
              size={32}
              color="#fff"
            />
            <View style={styles.emailButtonText}>
              <Text style={styles.emailButtonTitle}>Email Natively Support</Text>
              <Text style={styles.emailButtonSubtitle}>Template is already filled out for you!</Text>
            </View>
            <IconSymbol 
              ios_icon_name="arrow.right.circle.fill" 
              android_material_icon_name="arrow_circle_right"
              size={32}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.manualEmailButton}
            onPress={() => setShowEmailInfo(true)}
          >
            <Text style={styles.manualEmailButtonText}>
              Or tap here to see email details (if button above doesn&apos;t work)
            </Text>
          </TouchableOpacity>
        </View>

        {/* What Happens Next */}
        <View style={styles.timelineCard}>
          <Text style={styles.timelineTitle}>What Happens After You Email Us?</Text>
          
          <View style={styles.timelineItem}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineStep}>Day 1</Text>
              <Text style={styles.timelineText}>We receive your email and start building your app</Text>
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineStep}>Day 2-3</Text>
              <Text style={styles.timelineText}>We send you a link to test your app</Text>
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineStep}>Day 4</Text>
              <Text style={styles.timelineText}>You approve it, we submit to Apple</Text>
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View style={[styles.timelineDot, styles.timelineDotFinal]} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineStep}>Day 5-12</Text>
              <Text style={styles.timelineText}>Apple reviews and approves your app 🎉</Text>
            </View>
          </View>
        </View>

        {/* Still Confused */}
        <View style={styles.confusedCard}>
          <IconSymbol 
            ios_icon_name="questionmark.circle.fill" 
            android_material_icon_name="help"
            size={48}
            color={colors.primary}
          />
          <Text style={styles.confusedTitle}>Still Confused?</Text>
          <Text style={styles.confusedText}>
            That&apos;s totally okay! Just email us and say &quot;I&apos;m confused, can you help?&quot; - we&apos;ll walk you through it step by step.
          </Text>
          <TouchableOpacity 
            style={styles.confusedButton}
            onPress={openConfusedEmail}
          >
            <Text style={styles.confusedButtonText}>Email: &quot;I Need Help&quot;</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Note */}
        <View style={styles.bottomNote}>
          <Text style={styles.bottomNoteText}>
            🚀 You don&apos;t need to know anything about GitHub, Expo, EAS, or any technical stuff. We handle ALL of that for you!
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Email Info Modal */}
      <Modal
        visible={showEmailInfo}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowEmailInfo(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Email Information</Text>
            <TouchableOpacity onPress={() => setShowEmailInfo(false)}>
              <IconSymbol 
                ios_icon_name="xmark.circle.fill" 
                android_material_icon_name="cancel"
                size={32}
                color={colors.text}
              />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>Send Email To:</Text>
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>support@natively.app</Text>
              </View>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>Subject:</Text>
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>Ready to Launch SOFAST Global</Text>
              </View>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>Message:</Text>
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>{emailTemplate}</Text>
              </View>
            </View>

            <View style={styles.instructionsBox}>
              <IconSymbol 
                ios_icon_name="info.circle.fill" 
                android_material_icon_name="info"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.instructionsText}>
                Copy this information and send it from your email app (Gmail, Outlook, etc.)
              </Text>
            </View>

            <View style={styles.troubleshootingBox}>
              <Text style={styles.troubleshootingTitle}>Troubleshooting Tips:</Text>
              <Text style={styles.troubleshootingText}>
                • Make sure you have an email account set up on your device{'\n'}
                • Try opening your email app (Gmail, Mail, etc.) directly{'\n'}
                • On iPhone, go to Settings → Mail → Accounts to add an email{'\n'}
                • On Android, open Gmail or your email app to sign in{'\n'}
                • If all else fails, send the email from your computer
              </Text>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowEmailInfo(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    fontSize: 34,
    fontWeight: '900',
    color: colors.text,
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 26,
  },
  bigCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.border,
  },
  emailCard: {
    borderColor: '#FF3B30',
    borderWidth: 3,
    backgroundColor: '#FF3B3010',
  },
  stepNumber: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepNumberFinal: {
    backgroundColor: '#FF3B30',
  },
  stepNumberText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 12,
  },
  cardDescription: {
    fontSize: 17,
    color: colors.textSecondary,
    lineHeight: 26,
    marginBottom: 16,
  },
  checkmark: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  checkmarkText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#34C759',
  },
  urlList: {
    marginVertical: 16,
    gap: 12,
  },
  urlItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  urlText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  exampleBox: {
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
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
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: 12,
    gap: 12,
    marginTop: 8,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  helpText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 20,
  },
  emailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF3B30',
    padding: 20,
    borderRadius: 16,
    gap: 16,
    marginTop: 8,
  },
  emailButtonText: {
    flex: 1,
  },
  emailButtonTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 4,
  },
  emailButtonSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    opacity: 0.9,
  },
  manualEmailButton: {
    marginTop: 12,
    padding: 12,
    alignItems: 'center',
  },
  manualEmailButtonText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  timelineCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  timelineTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    marginTop: 4,
    marginRight: 16,
  },
  timelineDotFinal: {
    backgroundColor: '#34C759',
  },
  timelineContent: {
    flex: 1,
  },
  timelineStep: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  timelineText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  confusedCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.border,
  },
  confusedTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    marginTop: 16,
    marginBottom: 12,
  },
  confusedText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  confusedButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  confusedButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
  },
  bottomNote: {
    backgroundColor: '#34C75920',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#34C759',
  },
  bottomNoteText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  infoBox: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  instructionsBox: {
    flexDirection: 'row',
    backgroundColor: colors.primary + '20',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  instructionsText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  troubleshootingBox: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 24,
  },
  troubleshootingTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  troubleshootingText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  closeButton: {
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
  },
});
