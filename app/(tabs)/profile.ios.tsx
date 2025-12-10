
import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { GlassView } from "expo-glass-effect";
import { useTheme } from "@react-navigation/native";
import * as Linking from 'expo-linking';

export default function ProfileScreen() {
  const theme = useTheme();

  const handleInstagramPress = async () => {
    const instagramUsername = 'team_sofast';
    const instagramAppUrl = `instagram://user?username=${instagramUsername}`;
    const instagramWebUrl = `https://www.instagram.com/${instagramUsername}`;

    try {
      const canOpen = await Linking.canOpenURL(instagramAppUrl);
      if (canOpen) {
        await Linking.openURL(instagramAppUrl);
      } else {
        await Linking.openURL(instagramWebUrl);
      }
    } catch (error) {
      console.log('Error opening Instagram:', error);
      Alert.alert('Error', 'Could not open Instagram. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <GlassView style={styles.profileHeader} glassEffectStyle="regular">
          <IconSymbol ios_icon_name="person.circle.fill" android_material_icon_name="person" size={80} color={theme.colors.primary} />
          <Text style={[styles.name, { color: theme.colors.text }]}>SOFAST Global</Text>
          <Text style={[styles.email, { color: theme.dark ? '#98989D' : '#666' }]}>Team SOFAST LLC</Text>
        </GlassView>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.dark ? '#98989D' : '#666' }]}>CONNECT WITH US</Text>
        </View>

        <TouchableOpacity onPress={handleInstagramPress} activeOpacity={0.7}>
          <GlassView style={styles.socialCard} glassEffectStyle="regular">
            <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary + '20' }]}>
              <IconSymbol 
                ios_icon_name="camera.fill" 
                android_material_icon_name="photo_camera" 
                size={32} 
                color={theme.colors.primary} 
              />
            </View>
            <View style={styles.socialContent}>
              <Text style={[styles.socialTitle, { color: theme.colors.text }]}>Follow us on Instagram</Text>
              <Text style={[styles.socialHandle, { color: theme.colors.primary }]}>@team_sofast</Text>
              <Text style={[styles.socialDescription, { color: theme.dark ? '#98989D' : '#666' }]}>
                Get training tips, competition updates, and connect with the SOFAST community
              </Text>
            </View>
            <IconSymbol 
              ios_icon_name="chevron.right" 
              android_material_icon_name="chevron_right" 
              size={24} 
              color={theme.dark ? '#98989D' : '#666'} 
            />
          </GlassView>
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.dark ? '#98989D' : '#666' }]}>INFORMATION</Text>
        </View>

        <GlassView style={styles.section} glassEffectStyle="regular">
          <View style={styles.infoRow}>
            <IconSymbol ios_icon_name="globe" android_material_icon_name="language" size={24} color={theme.dark ? '#98989D' : '#666'} />
            <Text style={[styles.infoText, { color: theme.colors.text }]}>tmsofast.com</Text>
          </View>
          <View style={styles.infoRow}>
            <IconSymbol ios_icon_name="envelope.fill" android_material_icon_name="email" size={24} color={theme.dark ? '#98989D' : '#666'} />
            <Text style={[styles.infoText, { color: theme.colors.text }]}>contact@tmsofast.com</Text>
          </View>
        </GlassView>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.dark ? '#98989D' : '#666' }]}>PAYMENT INFORMATION</Text>
        </View>

        <GlassView style={styles.infoCard} glassEffectStyle="regular">
          <IconSymbol 
            ios_icon_name="creditcard.fill" 
            android_material_icon_name="payment" 
            size={40} 
            color={theme.colors.primary} 
          />
          <Text style={[styles.infoCardTitle, { color: theme.colors.text }]}>
            Setting Up Payment Details
          </Text>
          <Text style={[styles.infoCardText, { color: theme.dark ? '#98989D' : '#666' }]}>
            To receive payments from in-app purchases and subscriptions, you need to add your business banking details in App Store Connect:
          </Text>
          <View style={styles.stepsList}>
            <View style={styles.stepItem}>
              <Text style={[styles.stepNumber, { color: theme.colors.primary }]}>1</Text>
              <Text style={[styles.stepText, { color: theme.dark ? '#98989D' : '#666' }]}>
                Go to App Store Connect (appstoreconnect.apple.com)
              </Text>
            </View>
            <View style={styles.stepItem}>
              <Text style={[styles.stepNumber, { color: theme.colors.primary }]}>2</Text>
              <Text style={[styles.stepText, { color: theme.dark ? '#98989D' : '#666' }]}>
                Navigate to &quot;Agreements, Tax, and Banking&quot;
              </Text>
            </View>
            <View style={styles.stepItem}>
              <Text style={[styles.stepNumber, { color: theme.colors.primary }]}>3</Text>
              <Text style={[styles.stepText, { color: theme.dark ? '#98989D' : '#666' }]}>
                Click &quot;Set Up&quot; next to &quot;Paid Applications&quot;
              </Text>
            </View>
            <View style={styles.stepItem}>
              <Text style={[styles.stepNumber, { color: theme.colors.primary }]}>4</Text>
              <Text style={[styles.stepText, { color: theme.dark ? '#98989D' : '#666' }]}>
                Complete contact, bank, and tax information
              </Text>
            </View>
          </View>
          <Text style={[styles.infoCardNote, { color: theme.colors.primary }]}>
            Note: This is done through Apple&apos;s platform, not within the app itself.
          </Text>
        </GlassView>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    borderRadius: 12,
    padding: 32,
    marginBottom: 24,
    gap: 12,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
  },
  sectionHeader: {
    marginTop: 8,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  socialCard: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialContent: {
    flex: 1,
  },
  socialTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  socialHandle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  socialDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  section: {
    borderRadius: 12,
    padding: 20,
    gap: 16,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    fontSize: 16,
  },
  infoCard: {
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    gap: 16,
  },
  infoCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoCardText: {
    fontSize: 15,
    lineHeight: 22,
  },
  stepsList: {
    gap: 12,
  },
  stepItem: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 28,
    height: 28,
    textAlign: 'center',
    lineHeight: 28,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    paddingTop: 4,
  },
  infoCardNote: {
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 20,
  },
});
