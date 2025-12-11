
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { colors } from '../styles/commonStyles';
import { IconSymbol } from '../components/IconSymbol';

export default function LaunchGuideScreen() {
  const [completedSteps, setCompletedSteps] = useState<{ [key: number]: boolean }>({});

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };

  const openLink = async (url: string, title: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', `Cannot open ${title}`);
      }
    } catch (error) {
      console.log('Error opening link:', error);
      Alert.alert('Error', 'Failed to open link. Please copy the URL manually.');
    }
  };

  const steps = [
    {
      number: 1,
      title: 'You Already Have Apple Developer ✓',
      description: 'Great! You mentioned you already have an Apple Developer account and App Store Connect access. That\'s the hardest part done!',
      buttonText: 'Check My Apple Developer',
      url: 'https://developer.apple.com/account',
      showCheckbox: true
    },
    {
      number: 2,
      title: 'Create 3 Simple Web Pages',
      description: 'Apple requires 3 URLs: Privacy Policy, Support Page, and Marketing Page. These can be VERY simple - just a few sentences each!',
      buttonText: 'Create Free Pages (GitHub)',
      url: 'https://pages.github.com',
      tip: 'Alternative: Use Google Sites (google.com/sites) - it\'s even easier! Just create 3 pages with basic text.',
      showCheckbox: true
    },
    {
      number: 3,
      title: 'Email Natively Support',
      description: 'This is the EASIEST step. Just click the button below to email the Natively team. They will build your app and help you submit it to the App Store. They do all the technical work!',
      buttonText: 'Email Natively Support Now',
      url: 'mailto:support@natively.app?subject=Ready%20to%20Submit%20SOFAST%20Global%20to%20App%20Store&body=Hi%20Natively%20Team%2C%0A%0AI%27m%20ready%20to%20get%20my%20SOFAST%20Global%20app%20into%20the%20App%20Store.%20%0A%0AMy%20Apple%20Developer%20Account%20Email%3A%20%5BYOUR%20EMAIL%5D%0A%0AMy%203%20URLs%3A%0APrivacy%20Policy%3A%20%5BYOUR%20URL%5D%0ASupport%20Page%3A%20%5BYOUR%20URL%5D%0AMarketing%20Page%3A%20%5BYOUR%20URL%5D%0A%0APlease%20help%20me%20build%20and%20submit%20my%20app!%0A%0AThanks%21',
      tip: 'The email template is already filled out for you! Just add your information and send it.',
      showCheckbox: false
    }
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Get Your App in the Store',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <IconSymbol 
            ios_icon_name="rocket.fill" 
            android_material_icon_name="rocket_launch"
            size={64}
            color="#FF3B30"
          />
          <Text style={styles.title}>3 Simple Steps</Text>
          <Text style={styles.subtitle}>
            Just tap the buttons below. They open automatically - no technical knowledge needed!
          </Text>
        </View>

        <View style={styles.importantBox}>
          <IconSymbol 
            ios_icon_name="exclamationmark.triangle.fill" 
            android_material_icon_name="warning"
            size={24}
            color="#FF9500"
          />
          <Text style={styles.importantText}>
            <Text style={styles.importantBold}>IMPORTANT: </Text>
            You don&apos;t build the app yourself! The Natively team builds it for you. You just need to provide the 3 URLs and they handle everything else.
          </Text>
        </View>

        {steps.map((step, index) => (
          <View key={index} style={styles.stepCard}>
            <View style={styles.stepHeader}>
              <View style={styles.stepNumberCircle}>
                <Text style={styles.stepNumberText}>{step.number}</Text>
              </View>
              {step.showCheckbox && (
                <TouchableOpacity 
                  style={[styles.checkbox, completedSteps[step.number] && styles.checkboxChecked]}
                  onPress={() => toggleStep(step.number)}
                >
                  {completedSteps[step.number] && (
                    <IconSymbol 
                      ios_icon_name="checkmark" 
                      android_material_icon_name="check"
                      size={18}
                      color="#fff"
                    />
                  )}
                </TouchableOpacity>
              )}
            </View>

            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDescription}>{step.description}</Text>

            {step.tip && (
              <View style={styles.tipBox}>
                <IconSymbol 
                  ios_icon_name="lightbulb.fill" 
                  android_material_icon_name="lightbulb"
                  size={16}
                  color={colors.primary}
                />
                <Text style={styles.tipText}>{step.tip}</Text>
              </View>
            )}

            <TouchableOpacity 
              style={[styles.actionButton, step.number === 3 && styles.actionButtonHighlight]}
              onPress={() => openLink(step.url, step.title)}
            >
              <Text style={styles.actionButtonText}>{step.buttonText}</Text>
              <IconSymbol 
                ios_icon_name="arrow.right.circle.fill" 
                android_material_icon_name="arrow_circle_right"
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.helpCard}>
          <IconSymbol 
            ios_icon_name="person.fill.checkmark" 
            android_material_icon_name="support_agent"
            size={48}
            color={colors.primary}
          />
          <Text style={styles.helpTitle}>Still Confused? That&apos;s OK!</Text>
          <Text style={styles.helpText}>
            Seriously, don&apos;t worry. Just email the support team and tell them you&apos;re confused. They&apos;ll walk you through it step by step. That&apos;s what they&apos;re there for!
          </Text>
          <TouchableOpacity 
            style={styles.helpButton}
            onPress={() => openLink('mailto:support@natively.app?subject=I%27m%20Confused%20About%20App%20Store%20Submission&body=Hi%2C%0A%0AI%27m%20trying%20to%20get%20my%20SOFAST%20Global%20app%20into%20the%20App%20Store%20but%20I%27m%20confused.%20Can%20you%20help%20me%3F%0A%0AThanks%21', 'Email Support')}
          >
            <Text style={styles.helpButtonText}>Email: &quot;I&apos;m Confused, Help!&quot;</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>What Happens Next?</Text>
          <Text style={styles.footerText}>
            1. You send the email to Natively support{'\n'}
            2. They build your app (takes 1-2 days){'\n'}
            3. They send you a link to review it{'\n'}
            4. You approve it{'\n'}
            5. They submit it to Apple{'\n'}
            6. Apple reviews it (takes 1-7 days){'\n'}
            7. Your app is LIVE in the App Store! 🎉
          </Text>
        </View>

        <View style={styles.finalNote}>
          <Text style={styles.finalNoteText}>
            💡 You don&apos;t need to understand any technical terms. You don&apos;t need to know what &quot;app.json&quot; or &quot;eas.json&quot; means. The support team handles ALL of that!
          </Text>
        </View>
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
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.text,
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 17,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  importantBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF3CD',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#FF9500',
  },
  importantText: {
    flex: 1,
    fontSize: 15,
    color: '#856404',
    marginLeft: 12,
    lineHeight: 22,
  },
  importantBold: {
    fontWeight: '900',
  },
  stepCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.border,
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumberCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#fff',
  },
  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 10,
    lineHeight: 28,
  },
  stepDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 12,
  },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: `${colors.primary}15`,
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    marginLeft: 10,
    lineHeight: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: 12,
    marginTop: 8,
  },
  actionButtonHighlight: {
    backgroundColor: '#FF3B30',
    borderWidth: 2,
    borderColor: '#FF6B60',
  },
  actionButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
  },
  helpCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  helpTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  helpText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  helpButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  helpButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
  },
  footer: {
    marginTop: 30,
    padding: 24,
    backgroundColor: `${colors.primary}10`,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  footerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
  },
  footerText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 26,
  },
  finalNote: {
    marginTop: 20,
    padding: 20,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
  },
  finalNoteText: {
    fontSize: 15,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: 'italic',
  },
});
