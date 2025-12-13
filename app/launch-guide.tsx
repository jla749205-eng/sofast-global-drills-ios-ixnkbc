
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { colors } from '../styles/commonStyles';
import { IconSymbol } from '../components/IconSymbol';

export default function LaunchGuideScreen() {
  const openEmail = async () => {
    const email = 'mailto:support@natively.app?subject=Ready%20to%20Launch%20SOFAST%20Global&body=Hi%20Natively%20Team%2C%0A%0AI%27m%20ready%20to%20get%20my%20SOFAST%20Global%20app%20into%20the%20App%20Store.%0A%0A%E2%9C%85%20I%20have%20an%20Apple%20Developer%20account%0A%0AMy%20Apple%20ID%20email%3A%20%5BENTER%20YOUR%20APPLE%20ID%20EMAIL%5D%0A%0A%E2%9C%85%20I%20have%20created%203%20simple%20web%20pages%3A%0A%0APrivacy%20Policy%20URL%3A%20%5BENTER%20URL%5D%0ASupport%20Page%20URL%3A%20%5BENTER%20URL%5D%0AMarketing%20Page%20URL%3A%20%5BENTER%20URL%5D%0A%0APlease%20build%20my%20app%20and%20help%20me%20submit%20it%20to%20the%20App%20Store!%0A%0AThanks%21';
    
    try {
      const supported = await Linking.canOpenURL(email);
      if (supported) {
        await Linking.openURL(email);
      } else {
        Alert.alert('Email Not Available', 'Please email support@natively.app manually with your information.');
      }
    } catch (error) {
      console.log('Error opening email:', error);
      Alert.alert('Error', 'Please email support@natively.app manually.');
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
            onPress={() => {
              Linking.openURL('mailto:support@natively.app?subject=I%27m%20Confused%20About%20App%20Store&body=Hi%2C%0A%0AI%27m%20trying%20to%20get%20my%20SOFAST%20Global%20app%20in%20the%20App%20Store%20but%20I%27m%20confused.%20Can%20you%20help%20me%3F%0A%0AThanks%21');
            }}
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
});
