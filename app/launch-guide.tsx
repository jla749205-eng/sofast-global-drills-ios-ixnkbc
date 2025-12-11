
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
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
      title: 'Check Your Apple Developer Account',
      description: 'Make sure you\'re signed in to your Apple Developer account (you already have this!)',
      buttonText: 'Open Apple Developer',
      url: 'https://developer.apple.com/account',
      showCheckbox: true
    },
    {
      number: 2,
      title: 'Check App Store Connect',
      description: 'Make sure you can access App Store Connect (you already have this too!)',
      buttonText: 'Open App Store Connect',
      url: 'https://appstoreconnect.apple.com',
      showCheckbox: true
    },
    {
      number: 3,
      title: 'Create URLs for Your App',
      description: 'You need 3 simple web pages: Privacy Policy, Support Page, and Marketing Page. You can create these for free.',
      buttonText: 'How to Create Free Pages',
      url: 'https://pages.github.com',
      tip: 'Tip: Use GitHub Pages (free) or Google Sites (free) to create these pages. They can be very simple!',
      showCheckbox: true
    },
    {
      number: 4,
      title: 'Contact Natively Support for Build',
      description: 'The Natively team will help you build and submit your app. They handle all the technical stuff!',
      buttonText: 'Get Build Help',
      url: 'mailto:support@natively.app?subject=Help%20with%20SOFAST%20Global%20App%20Submission',
      tip: 'Just email them and they\'ll walk you through it step by step.',
      showCheckbox: false
    }
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Launch Your App',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <IconSymbol 
            ios_icon_name="rocket.fill" 
            android_material_icon_name="rocket_launch"
            size={48}
            color={colors.primary}
          />
          <Text style={styles.title}>Simple Launch Guide</Text>
          <Text style={styles.subtitle}>
            Just click the buttons below - they'll take you exactly where you need to go!
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
              style={styles.actionButton}
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
            ios_icon_name="person.fill.questionmark" 
            android_material_icon_name="help"
            size={32}
            color={colors.primary}
          />
          <Text style={styles.helpTitle}>Still Confused?</Text>
          <Text style={styles.helpText}>
            That's totally okay! Just email the Natively support team and they'll help you through every single step.
          </Text>
          <TouchableOpacity 
            style={styles.helpButton}
            onPress={() => openLink('mailto:support@natively.app?subject=Need%20Help%20Launching%20My%20App', 'Email Support')}
          >
            <Text style={styles.helpButtonText}>Email Support</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            💡 Remember: You don't need to understand the technical stuff. The support team will handle it!
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
    fontSize: 28,
    fontWeight: 'bold',
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 6,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 12,
  },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: `${colors.primary}15`,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
    lineHeight: 20,
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
    fontWeight: '600',
    color: '#fff',
  },
  helpCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  helpTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 12,
    marginBottom: 8,
  },
  helpText: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
  },
  helpButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  helpButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  footer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: `${colors.primary}10`,
    borderRadius: 12,
  },
  footerText: {
    fontSize: 15,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 22,
  },
});
