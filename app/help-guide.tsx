
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../styles/commonStyles';
import { IconSymbol } from '../components/IconSymbol';

export default function HelpGuide() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol ios_icon_name="chevron.left" android_material_icon_name="arrow_back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help Guide</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📱 Understanding Natively Interface</Text>
          <Text style={styles.text}>
            Natively has TWO sides:
          </Text>
          <Text style={styles.bulletPoint}>• LEFT SIDE: Code editor (where code is written)</Text>
          <Text style={styles.bulletPoint}>• RIGHT SIDE: Phone preview (shows your app)</Text>
          <Text style={styles.text}>
            {'\n'}When you click the phone icon (📱), the code appears on the left side.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Your App Status</Text>
          <Text style={styles.text}>
            Your SOFAST Global app is COMPLETE and working! All the shooting drills, camera detection, and features are implemented.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📤 Next Steps: Getting to App Store</Text>
          <Text style={styles.stepNumber}>STEP 1: Create Required Web Pages</Text>
          <Text style={styles.text}>
            Apple requires two web pages before you can submit:
          </Text>
          <Text style={styles.bulletPoint}>• Privacy Policy page</Text>
          <Text style={styles.bulletPoint}>• Support page</Text>
          <Text style={styles.text}>
            {'\n'}Use Google Sites (sites.google.com):
          </Text>
          <Text style={styles.bulletPoint}>1. Go to sites.google.com</Text>
          <Text style={styles.bulletPoint}>2. Click "+" to create new site</Text>
          <Text style={styles.bulletPoint}>3. Create "Privacy Policy" page</Text>
          <Text style={styles.bulletPoint}>4. Create "Support" page</Text>
          <Text style={styles.bulletPoint}>5. Click "Publish" button (top right)</Text>
          <Text style={styles.bulletPoint}>6. Copy the URLs it gives you</Text>

          <Text style={styles.stepNumber}>{'\n'}STEP 2: Join Apple Developer Program</Text>
          <Text style={styles.text}>
            Go to developer.apple.com and pay $99/year to join. This is required to put apps on the App Store.
          </Text>

          <Text style={styles.stepNumber}>{'\n'}STEP 3: Build Your App</Text>
          <Text style={styles.text}>
            In Natively, there's a "Build" button to create the app file that gets submitted to Apple.
          </Text>

          <Text style={styles.stepNumber}>{'\n'}STEP 4: Submit to Apple</Text>
          <Text style={styles.text}>
            Apple reviews your app (usually 1-2 weeks) and then it appears in the App Store if approved.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💰 About Payments</Text>
          <Text style={styles.text}>
            Your app has a $4.99/month subscription built in. Once approved by Apple, users can pay and you'll receive the money (Apple takes 30% commission).
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>❓ Need More Help?</Text>
          <Text style={styles.text}>
            - Check the "Submission Guide" button in your Profile
          </Text>
          <Text style={styles.text}>
            - All your credentials are in the "Credentials" button
          </Text>
          <Text style={styles.text}>
            - Everything is working - you just need to create those two web pages and join Apple Developer Program
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✅ What's Already Done</Text>
          <Text style={styles.bulletPoint}>✓ All 10 shooting drills working</Text>
          <Text style={styles.bulletPoint}>✓ Camera shot detection</Text>
          <Text style={styles.bulletPoint}>✓ Audio analysis for gunshots</Text>
          <Text style={styles.bulletPoint}>✓ Timing and scoring</Text>
          <Text style={styles.bulletPoint}>✓ Global leaderboards</Text>
          <Text style={styles.bulletPoint}>✓ Subscription payments ($4.99/mo)</Text>
          <Text style={styles.bulletPoint}>✓ Dark mode</Text>
          <Text style={styles.bulletPoint}>✓ Professional camo-green design</Text>
        </View>

        <View style={styles.finalNote}>
          <Text style={styles.finalNoteText}>
            🎉 Your app is ready! You just need to create two simple web pages on Google Sites, then submit to Apple. You've got this!
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 30,
    backgroundColor: colors.cardBackground,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 15,
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 15,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginLeft: 10,
    marginBottom: 5,
  },
  finalNote: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
  },
  finalNoteText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    lineHeight: 26,
  },
});
