
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import * as MailComposer from 'expo-mail-composer';
import { colors } from '../styles/commonStyles';
import { IconSymbol } from '../components/IconSymbol';

export default function StatusScreen() {
  const router = useRouter();
  const [showEmailInfo, setShowEmailInfo] = useState(false);

  const emailTemplate = `Hi Natively Team,

I noticed my SOFAST Global app is not showing up in App Store Connect or App Developer Portal yet.

Here's my information:

Apple Developer Team ID: 8V52T9GNF9
Bundle Identifier: com.teamsofast.sofastglobal
App Name: SOFAST Global Drills

Can you help me understand what needs to happen next to get my app registered in App Store Connect?

Thanks!`;

  const openEmail = async () => {
    try {
      console.log('Checking if mail composer is available...');
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
      const result = await MailComposer.composeAsync({
        recipients: ['support@natively.app'],
        subject: 'App Not in App Store Connect - SOFAST Global',
        body: emailTemplate,
      });

      console.log('Email composer result:', result);
      
      if (result.status === 'sent') {
        Alert.alert(
          'Success! 🎉', 
          'Your email has been sent. We\'ll get back to you soon!',
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

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'App Status',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <IconSymbol 
            ios_icon_name="exclamationmark.triangle.fill" 
            android_material_icon_name="warning"
            size={80}
            color="#FF9500"
          />
          <Text style={styles.title}>App Not in App Store Connect</Text>
          <Text style={styles.subtitle}>
            This is normal - let&apos;s fix it together!
          </Text>
        </View>

        {/* Current Situation */}
        <View style={styles.situationCard}>
          <Text style={styles.cardTitle}>What&apos;s Happening?</Text>
          <Text style={styles.cardDescription}>
            Your app is built and working on your device, but it hasn&apos;t been registered in Apple&apos;s App Store Connect system yet. This is a normal step in the process.
          </Text>
          
          <View style={styles.statusList}>
            <View style={styles.statusItem}>
              <IconSymbol 
                ios_icon_name="checkmark.circle.fill" 
                android_material_icon_name="check_circle"
                size={24}
                color="#34C759"
              />
              <Text style={styles.statusText}>App is built and working</Text>
            </View>
            <View style={styles.statusItem}>
              <IconSymbol 
                ios_icon_name="checkmark.circle.fill" 
                android_material_icon_name="check_circle"
                size={24}
                color="#34C759"
              />
              <Text style={styles.statusText}>You have Apple Developer account</Text>
            </View>
            <View style={styles.statusItem}>
              <IconSymbol 
                ios_icon_name="xmark.circle.fill" 
                android_material_icon_name="cancel"
                size={24}
                color="#FF9500"
              />
              <Text style={styles.statusText}>App not registered in App Store Connect</Text>
            </View>
          </View>
        </View>

        {/* Why This Happens */}
        <View style={styles.explainCard}>
          <IconSymbol 
            ios_icon_name="info.circle.fill" 
            android_material_icon_name="info"
            size={48}
            color={colors.primary}
          />
          <Text style={styles.explainTitle}>Why Isn&apos;t It There Yet?</Text>
          <Text style={styles.explainText}>
            Before an app can be submitted to the App Store, it needs to be created as an &quot;App Record&quot; in App Store Connect. This is a one-time setup that requires:
          </Text>
          
          <View style={styles.requirementsList}>
            <View style={styles.requirementItem}>
              <View style={styles.requirementDot} />
              <Text style={styles.requirementText}>Bundle Identifier (you have this: com.teamsofast.sofastglobal)</Text>
            </View>
            <View style={styles.requirementItem}>
              <View style={styles.requirementDot} />
              <Text style={styles.requirementText}>App Name (you have this: SOFAST Global Drills)</Text>
            </View>
            <View style={styles.requirementItem}>
              <View style={styles.requirementDot} />
              <Text style={styles.requirementText}>Privacy Policy URL (you need to create this)</Text>
            </View>
            <View style={styles.requirementItem}>
              <View style={styles.requirementDot} />
              <Text style={styles.requirementText}>Support URL (you need to create this)</Text>
            </View>
            <View style={styles.requirementItem}>
              <View style={styles.requirementDot} />
              <Text style={styles.requirementText}>Marketing URL (you need to create this)</Text>
            </View>
          </View>
        </View>

        {/* What You Need to Do */}
        <View style={styles.actionCard}>
          <Text style={styles.actionTitle}>What You Need to Do:</Text>
          
          <View style={styles.actionStep}>
            <View style={styles.actionNumber}>
              <Text style={styles.actionNumberText}>1</Text>
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionStepTitle}>Create 3 Simple Web Pages</Text>
              <Text style={styles.actionStepDesc}>
                Use Google Sites (free) to create:
                {'\n'}• Privacy Policy page
                {'\n'}• Support page
                {'\n'}• Marketing page
                {'\n\n'}Each can be just a few sentences!
              </Text>
            </View>
          </View>

          <View style={styles.actionStep}>
            <View style={styles.actionNumber}>
              <Text style={styles.actionNumberText}>2</Text>
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionStepTitle}>Email Natively Support</Text>
              <Text style={styles.actionStepDesc}>
                Send your 3 URLs to Natively. They will:
                {'\n'}• Create your app in App Store Connect
                {'\n'}• Configure everything properly
                {'\n'}• Submit it to Apple for review
              </Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.guideButton}
            onPress={() => router.push('/launch-guide')}
          >
            <Text style={styles.guideButtonText}>View Complete Step-by-Step Guide</Text>
            <IconSymbol 
              ios_icon_name="arrow.right.circle.fill" 
              android_material_icon_name="arrow_circle_right"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        {/* Quick Email */}
        <View style={styles.emailCard}>
          <Text style={styles.emailTitle}>Need Help Right Now?</Text>
          <Text style={styles.emailDescription}>
            Email Natively support and they&apos;ll walk you through exactly what you need to do.
          </Text>
          
          <TouchableOpacity 
            style={styles.emailButton}
            onPress={openEmail}
          >
            <IconSymbol 
              ios_icon_name="envelope.fill" 
              android_material_icon_name="email"
              size={24}
              color="#fff"
            />
            <Text style={styles.emailButtonText}>Email Support Now</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.manualEmailButton}
            onPress={() => setShowEmailInfo(true)}
          >
            <Text style={styles.manualEmailButtonText}>
              Or tap here to see email details
            </Text>
          </TouchableOpacity>
        </View>

        {/* Important Note */}
        <View style={styles.noteCard}>
          <IconSymbol 
            ios_icon_name="lightbulb.fill" 
            android_material_icon_name="lightbulb"
            size={32}
            color="#FFD60A"
          />
          <Text style={styles.noteText}>
            <Text style={styles.noteBold}>Important:</Text> You don&apos;t need to create the app in App Store Connect yourself. Natively will do this for you once you provide the 3 required URLs. This is part of their service!
          </Text>
        </View>

        {/* Timeline */}
        <View style={styles.timelineCard}>
          <Text style={styles.timelineTitle}>What Happens Next:</Text>
          
          <View style={styles.timelineRow}>
            <View style={styles.timelineIcon}>
              <IconSymbol 
                ios_icon_name="1.circle.fill" 
                android_material_icon_name="looks_one"
                size={32}
                color={colors.primary}
              />
            </View>
            <View style={styles.timelineInfo}>
              <Text style={styles.timelineLabel}>Today</Text>
              <Text style={styles.timelineDesc}>Create your 3 web pages (5-10 minutes)</Text>
            </View>
          </View>

          <View style={styles.timelineRow}>
            <View style={styles.timelineIcon}>
              <IconSymbol 
                ios_icon_name="2.circle.fill" 
                android_material_icon_name="looks_two"
                size={32}
                color={colors.textSecondary}
              />
            </View>
            <View style={styles.timelineInfo}>
              <Text style={styles.timelineLabel}>Today</Text>
              <Text style={styles.timelineDesc}>Email your URLs to Natively</Text>
            </View>
          </View>

          <View style={styles.timelineRow}>
            <View style={styles.timelineIcon}>
              <IconSymbol 
                ios_icon_name="3.circle.fill" 
                android_material_icon_name="looks_3"
                size={32}
                color={colors.textSecondary}
              />
            </View>
            <View style={styles.timelineInfo}>
              <Text style={styles.timelineLabel}>1-2 Days</Text>
              <Text style={styles.timelineDesc}>Natively creates app in App Store Connect</Text>
            </View>
          </View>

          <View style={styles.timelineRow}>
            <View style={styles.timelineIcon}>
              <IconSymbol 
                ios_icon_name="4.circle.fill" 
                android_material_icon_name="looks_4"
                size={32}
                color={colors.textSecondary}
              />
            </View>
            <View style={styles.timelineInfo}>
              <Text style={styles.timelineLabel}>3-4 Days</Text>
              <Text style={styles.timelineDesc}>Natively submits to Apple</Text>
            </View>
          </View>

          <View style={styles.timelineRow}>
            <View style={styles.timelineIcon}>
              <IconSymbol 
                ios_icon_name="checkmark.circle.fill" 
                android_material_icon_name="check_circle"
                size={32}
                color="#34C759"
              />
            </View>
            <View style={styles.timelineInfo}>
              <Text style={styles.timelineLabel}>7-14 Days</Text>
              <Text style={styles.timelineDesc}>App is live in App Store! 🎉</Text>
            </View>
          </View>
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
                <Text style={styles.infoText}>App Not in App Store Connect - SOFAST Global</Text>
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
    fontSize: 28,
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
  },
  situationCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FF9500',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 12,
  },
  cardDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 20,
  },
  statusList: {
    gap: 12,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  explainCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
  },
  explainTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.text,
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  explainText: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  requirementsList: {
    width: '100%',
    gap: 12,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  requirementDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginTop: 6,
    marginRight: 12,
  },
  requirementText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  actionCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  actionTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 20,
  },
  actionStep: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  actionNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionNumberText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
  },
  actionContent: {
    flex: 1,
  },
  actionStepTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  actionStepDesc: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  guideButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: 12,
    marginTop: 8,
  },
  guideButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
  },
  emailCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.border,
  },
  emailTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 12,
  },
  emailDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 20,
  },
  emailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: 12,
    gap: 12,
  },
  emailButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
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
  noteCard: {
    flexDirection: 'row',
    backgroundColor: '#FFD60A20',
    padding: 20,
    borderRadius: 12,
    gap: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FFD60A',
  },
  noteText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  noteBold: {
    fontWeight: '900',
  },
  timelineCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.border,
  },
  timelineTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 20,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  timelineIcon: {
    marginRight: 16,
  },
  timelineInfo: {
    flex: 1,
  },
  timelineLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  timelineDesc: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
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
