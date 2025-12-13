
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { colors } from '../styles/commonStyles';
import { IconSymbol } from '../components/IconSymbol';

export default function StatusScreen() {
  const router = useRouter();

  const openEmail = () => {
    Linking.openURL('mailto:support@natively.app?subject=Status%20Check%20-%20SOFAST%20Global&body=Hi%2C%0A%0ACan%20you%20tell%20me%20the%20current%20status%20of%20my%20SOFAST%20Global%20app%3F%0A%0AThanks%21');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Where Am I?',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <IconSymbol 
            ios_icon_name="map.fill" 
            android_material_icon_name="map"
            size={80}
            color={colors.primary}
          />
          <Text style={styles.title}>Your Current Status</Text>
        </View>

        {/* Current Stage */}
        <View style={styles.currentCard}>
          <View style={styles.currentBadge}>
            <Text style={styles.currentBadgeText}>YOU ARE HERE</Text>
          </View>
          <Text style={styles.currentTitle}>App is Built & Working!</Text>
          <Text style={styles.currentDescription}>
            Your SOFAST Global app is fully functional and running on your device right now. You can use all the features!
          </Text>
          <View style={styles.checkItem}>
            <IconSymbol 
              ios_icon_name="checkmark.circle.fill" 
              android_material_icon_name="check_circle"
              size={24}
              color="#34C759"
            />
            <Text style={styles.checkText}>App is built ✓</Text>
          </View>
          <View style={styles.checkItem}>
            <IconSymbol 
              ios_icon_name="checkmark.circle.fill" 
              android_material_icon_name="check_circle"
              size={24}
              color="#34C759"
            />
            <Text style={styles.checkText}>All features working ✓</Text>
          </View>
          <View style={styles.checkItem}>
            <IconSymbol 
              ios_icon_name="checkmark.circle.fill" 
              android_material_icon_name="check_circle"
              size={24}
              color="#34C759"
            />
            <Text style={styles.checkText}>Testing on your device ✓</Text>
          </View>
        </View>

        {/* Next Step */}
        <View style={styles.nextCard}>
          <Text style={styles.nextTitle}>Next Step: Get in App Store</Text>
          <Text style={styles.nextDescription}>
            To get your app in the Apple App Store where anyone can download it, you need to:
          </Text>
          
          <View style={styles.stepsList}>
            <View style={styles.stepItem}>
              <View style={styles.stepDot} />
              <Text style={styles.stepText}>Have an Apple Developer account ($99/year)</Text>
            </View>
            <View style={styles.stepItem}>
              <View style={styles.stepDot} />
              <Text style={styles.stepText}>Create 3 simple web pages (Privacy, Support, Marketing)</Text>
            </View>
            <View style={styles.stepItem}>
              <View style={styles.stepDot} />
              <Text style={styles.stepText}>Email Natively support with your info</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.guideButton}
            onPress={() => router.push('/launch-guide')}
          >
            <Text style={styles.guideButtonText}>View Simple Step-by-Step Guide</Text>
            <IconSymbol 
              ios_icon_name="arrow.right.circle.fill" 
              android_material_icon_name="arrow_circle_right"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        {/* What You Don't Need */}
        <View style={styles.dontNeedCard}>
          <Text style={styles.dontNeedTitle}>What You DON&apos;T Need to Do:</Text>
          
          <View style={styles.dontNeedItem}>
            <IconSymbol 
              ios_icon_name="xmark.circle.fill" 
              android_material_icon_name="cancel"
              size={24}
              color="#FF3B30"
            />
            <Text style={styles.dontNeedText}>You don&apos;t need to understand GitHub</Text>
          </View>
          <View style={styles.dontNeedItem}>
            <IconSymbol 
              ios_icon_name="xmark.circle.fill" 
              android_material_icon_name="cancel"
              size={24}
              color="#FF3B30"
            />
            <Text style={styles.dontNeedText}>You don&apos;t need to build the app yourself</Text>
          </View>
          <View style={styles.dontNeedItem}>
            <IconSymbol 
              ios_icon_name="xmark.circle.fill" 
              android_material_icon_name="cancel"
              size={24}
              color="#FF3B30"
            />
            <Text style={styles.dontNeedText}>You don&apos;t need to know what EAS or Expo means</Text>
          </View>
          <View style={styles.dontNeedItem}>
            <IconSymbol 
              ios_icon_name="xmark.circle.fill" 
              android_material_icon_name="cancel"
              size={24}
              color="#FF3B30"
            />
            <Text style={styles.dontNeedText}>You don&apos;t need to edit any code files</Text>
          </View>
          <View style={styles.dontNeedItem}>
            <IconSymbol 
              ios_icon_name="xmark.circle.fill" 
              android_material_icon_name="cancel"
              size={24}
              color="#FF3B30"
            />
            <Text style={styles.dontNeedText}>You don&apos;t need to buy any tokens</Text>
          </View>
        </View>

        {/* Check Status */}
        <View style={styles.statusCard}>
          <IconSymbol 
            ios_icon_name="questionmark.circle.fill" 
            android_material_icon_name="help"
            size={48}
            color={colors.primary}
          />
          <Text style={styles.statusTitle}>Want to Check Your Submission Status?</Text>
          <Text style={styles.statusDescription}>
            If you&apos;ve already emailed Natively support and want to know where your submission is, just email them again!
          </Text>
          <TouchableOpacity 
            style={styles.statusButton}
            onPress={openEmail}
          >
            <Text style={styles.statusButtonText}>Email: &quot;What&apos;s My Status?&quot;</Text>
          </TouchableOpacity>
        </View>

        {/* Timeline */}
        <View style={styles.timelineCard}>
          <Text style={styles.timelineTitle}>Typical Timeline:</Text>
          
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
              <Text style={styles.timelineLabel}>Right Now</Text>
              <Text style={styles.timelineDesc}>App is working on your device</Text>
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
              <Text style={styles.timelineLabel}>When You&apos;re Ready</Text>
              <Text style={styles.timelineDesc}>Email Natively with your 3 URLs</Text>
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
              <Text style={styles.timelineLabel}>1-3 Days Later</Text>
              <Text style={styles.timelineDesc}>Natively submits to Apple</Text>
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
              <Text style={styles.timelineLabel}>5-12 Days Later</Text>
              <Text style={styles.timelineDesc}>App is live in App Store! 🎉</Text>
            </View>
          </View>
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
    fontSize: 32,
    fontWeight: '900',
    color: colors.text,
    marginTop: 16,
    textAlign: 'center',
  },
  currentCard: {
    backgroundColor: '#34C75920',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#34C759',
  },
  currentBadge: {
    backgroundColor: '#34C759',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  currentBadgeText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 1,
  },
  currentTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 12,
  },
  currentDescription: {
    fontSize: 17,
    color: colors.textSecondary,
    lineHeight: 26,
    marginBottom: 20,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  checkText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  nextCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  nextTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 12,
  },
  nextDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 16,
  },
  stepsList: {
    marginBottom: 20,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginTop: 6,
    marginRight: 12,
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  guideButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: 12,
  },
  guideButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
  },
  dontNeedCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.border,
  },
  dontNeedTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 20,
  },
  dontNeedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  dontNeedText: {
    flex: 1,
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  statusCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.border,
  },
  statusTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.text,
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  statusDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  statusButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  statusButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
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
});
