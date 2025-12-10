
# 🚀 SOFAST Global - Apple App Store Submission Guide

## 📋 Prerequisites

### 1. Apple Developer Account
- **Cost:** $99/year
- **Sign up:** https://developer.apple.com/programs/
- **What you need:**
  - Valid Apple ID
  - Credit card for payment
  - Two-factor authentication enabled
  - Business information (Team SOFAST LLC)

### 2. App Store Connect Access
- **URL:** https://appstoreconnect.apple.com/
- Use your Apple Developer account credentials
- This is where you'll manage your app listing

---

## 🛠️ Step-by-Step Submission Process

### STEP 1: Install EAS CLI (if not already installed)
```bash
npm install -g eas-cli
```

### STEP 2: Login to Expo
```bash
eas login
```

### STEP 3: Configure Your Project
```bash
eas build:configure
```
This will link your project to EAS and create a project ID.

### STEP 4: Update eas.json
After running the configure command, update the `eas.json` file with your Apple Developer information:
- `appleId`: Your Apple ID email
- `ascAppId`: Your App Store Connect App ID (you'll get this in Step 6)
- `appleTeamId`: Your Apple Developer Team ID

### STEP 5: Create App Icons
You need app icons in multiple sizes. Your current logo is at:
`./assets/images/7cadd481-5bea-470d-802a-1f44d5a96178.jpeg`

**Required iOS icon sizes:**
- 1024x1024 (App Store)
- 180x180 (iPhone)
- 167x167 (iPad Pro)
- 152x152 (iPad)
- 120x120 (iPhone)
- 87x87 (iPhone)
- 80x80 (iPad)
- 76x76 (iPad)
- 60x60 (iPhone)
- 58x58 (iPhone)
- 40x40 (iPad/iPhone)
- 29x29 (iPad/iPhone)
- 20x20 (iPad/iPhone)

**Tools to generate icons:**
- https://www.appicon.co/
- https://easyappicon.com/
- Or use Expo's icon generation (it will auto-generate from your 1024x1024 icon)

### STEP 6: Create App in App Store Connect

1. Go to https://appstoreconnect.apple.com/
2. Click "My Apps" → "+" → "New App"
3. Fill in the details:
   - **Platform:** iOS
   - **Name:** SOFAST Global
   - **Primary Language:** English (US)
   - **Bundle ID:** com.teamsofast.sofastglobal
   - **SKU:** sofastglobal (or any unique identifier)
   - **User Access:** Full Access

4. Save the **App ID** (you'll need this for eas.json)

### STEP 7: Prepare App Store Listing

#### App Information
- **Name:** SOFAST Global
- **Subtitle:** Marksmanship Training & Competition
- **Category:** Sports or Health & Fitness
- **Content Rights:** Team SOFAST LLC

#### Description (Example)
```
SOFAST Global is the ultimate marksmanship training app for competitive shooters. 
Track your performance, compete globally, and improve your skills with AI-powered 
shot detection and analysis.

FEATURES:
• 10 Professional Shooting Drills (El Presidente, Mozambique, Bill Drill, FAST, and more)
• AI-Powered Shot Detection using camera, microphone, and motion sensors
• Real-time Performance Analysis
• Global Leaderboards with divisions (Open, Veteran, Law Enforcement)
• Automatic Split Times and Par Beeps
• Offline Mode with Wi-Fi Sync
• Flinch Detection and Form Analysis

SUBSCRIPTION:
• Free: Access to 3 drills
• Premium ($4.99/month): Unlock all 10 drills + veteran badge

Perfect for USPSA, IDPA, and competitive shooting enthusiasts!

For more information, visit https://tmsofast.com
```

#### Keywords (100 characters max)
```
shooting,marksmanship,training,competition,USPSA,IDPA,firearms,drills,timer
```

#### Screenshots
You need screenshots for:
- 6.5" iPhone (iPhone 14 Pro Max, 15 Pro Max)
- 5.5" iPhone (iPhone 8 Plus)
- 12.9" iPad Pro (optional but recommended)

**Screenshot ideas:**
1. Home screen with drill selection
2. Camera view during drill
3. Results screen with scores
4. Leaderboard view
5. Profile/stats screen

### STEP 8: Privacy Policy
You MUST have a privacy policy URL since your app:
- Uses camera
- Uses microphone
- Uses motion sensors
- Collects performance data
- Has subscriptions

**Your Privacy Policy URL:** https://tmsofast.com/privacy

Make sure to host your privacy policy at this URL. The privacy policy content is available in `PRIVACY_POLICY_TEMPLATE.md` in your project.

**Important:** Upload the privacy policy to your website (https://tmsofast.com/privacy) before submitting to the App Store.

### STEP 9: App Review Information

**Contact Information:**
- First Name: [Your name]
- Last Name: [Your name]
- Phone: [Your phone]
- Email: support@tmsofast.com

**Demo Account (if needed):**
Since your app requires shooting drills, you might want to provide:
- Username: demo@sofastglobal.com
- Password: DemoPass123!
- Notes: "This is a shooting training app. No actual firearms are required for testing."

**Notes for Reviewer:**
```
SOFAST Global is a marksmanship training app that uses the device's camera, 
microphone, and motion sensors to detect and analyze shooting performance.

TESTING INSTRUCTIONS:
1. Select any drill from the home screen
2. Tap "Start Drill" to begin camera recording
3. The app will detect shots through audio/visual cues
4. Review results after completing the drill

NOTE: The app can be tested without actual firearms by making loud sounds 
(clapping, snapping) near the device to simulate gunshots.

The app includes a freemium model with 3 free drills and a $4.99/month 
subscription for full access.

Website: https://tmsofast.com
Privacy Policy: https://tmsofast.com/privacy
```

### STEP 10: Build Your App for iOS

```bash
# Build for iOS production
eas build --platform ios --profile production
```

This will:
1. Upload your code to EAS servers
2. Build your app in the cloud
3. Generate an .ipa file
4. Take about 15-30 minutes

**You'll need to provide:**
- Apple ID credentials
- App-specific password (generate at appleid.apple.com)
- Or use EAS credentials management

### STEP 11: Submit to App Store

After the build completes:

**Option A: Automatic submission via EAS**
```bash
eas submit --platform ios --latest
```

**Option B: Manual submission**
1. Download the .ipa file from EAS
2. Use Transporter app (Mac App Store)
3. Upload the .ipa to App Store Connect

### STEP 12: Complete App Store Connect Listing

1. Go to App Store Connect
2. Select your app
3. Go to "App Store" tab
4. Fill in all required fields:
   - Screenshots
   - Description
   - Keywords
   - Support URL: https://tmsofast.com
   - Privacy Policy URL: https://tmsofast.com/privacy
   - Age Rating (17+ for firearms content)
5. Click "Submit for Review"

### STEP 13: Age Rating

Your app involves firearms training, so you'll need to answer:
- **Realistic Violence:** None (it's training, not violent content)
- **Cartoon/Fantasy Violence:** None
- **Mature/Suggestive Themes:** None
- **Horror/Fear Themes:** None
- **Medical/Treatment Information:** None
- **Alcohol, Tobacco, or Drug Use:** None
- **Gambling:** None
- **Profanity or Crude Humor:** None
- **Sexual Content or Nudity:** None

**Likely Rating:** 12+ or 17+ (due to firearms context)

### STEP 14: App Review Process

**Timeline:**
- Initial review: 24-48 hours
- Average: 1-3 days
- Can be longer during holidays

**Common Rejection Reasons:**
1. Missing privacy policy
2. Incomplete app functionality
3. Crashes or bugs
4. Misleading screenshots
5. Subscription not clearly explained
6. Missing demo account for reviewers

**If Rejected:**
- Read the rejection reason carefully
- Fix the issues
- Respond to the reviewer
- Resubmit

### STEP 15: Release!

Once approved:
1. You can release immediately or schedule a release date
2. Your app will appear in the App Store within 24 hours
3. Users can download it!

---

## 📱 Post-Launch Checklist

### Monitor Performance
- Check App Store Connect for downloads
- Monitor crash reports
- Read user reviews
- Track subscription conversions

### Marketing
- Share on social media
- Create a landing page at https://tmsofast.com
- Reach out to shooting communities
- Submit to app review sites

### Updates
- Fix bugs quickly
- Add new features
- Respond to user feedback
- Keep your app updated for new iOS versions

---

## 🔧 Useful Commands

```bash
# Check build status
eas build:list

# View build logs
eas build:view [BUILD_ID]

# Submit to App Store
eas submit --platform ios --latest

# Update app version
# Edit app.json: increment "version" and "buildNumber"

# Build new version
eas build --platform ios --profile production --auto-submit
```

---

## 📞 Support Resources

- **Expo Documentation:** https://docs.expo.dev/
- **EAS Build Docs:** https://docs.expo.dev/build/introduction/
- **EAS Submit Docs:** https://docs.expo.dev/submit/introduction/
- **App Store Review Guidelines:** https://developer.apple.com/app-store/review/guidelines/
- **App Store Connect Help:** https://developer.apple.com/support/app-store-connect/
- **SOFAST Global Website:** https://tmsofast.com

---

## 💰 Costs Summary

- **Apple Developer Program:** $99/year
- **EAS Build (Expo):** Free tier available, or $29/month for unlimited builds
- **Hosting (if needed):** $0-10/month for website and privacy policy page

---

## ⚠️ Important Notes

1. **Bundle Identifier:** Once you submit your app with `com.teamsofast.sofastglobal`, 
   you cannot change it. Make sure it's correct!

2. **Subscriptions:** You'll need to set up In-App Purchases in App Store Connect 
   for your $4.99/month subscription. This is separate from the app submission.

3. **Testing:** Test your app thoroughly on real devices before submitting. 
   Use TestFlight for beta testing.

4. **Compliance:** Make sure your app complies with firearms-related regulations 
   in different countries. You may need to restrict availability in some regions.

5. **RevenueCat:** If you're using RevenueCat for subscriptions, make sure to 
   configure it properly with your App Store Connect credentials.

6. **Privacy Policy:** Make sure your privacy policy is live at https://tmsofast.com/privacy 
   before submitting to the App Store. Apple will check this URL.

---

## 🌐 Website Setup

Before submitting to the App Store, make sure your website (https://tmsofast.com) includes:

1. **Home Page:** Brief description of SOFAST Global app
2. **Privacy Policy:** Located at https://tmsofast.com/privacy (use PRIVACY_POLICY_TEMPLATE.md)
3. **Support Page:** Contact information and FAQs
4. **Terms of Service:** (optional but recommended)

You can use simple hosting services like:
- GitHub Pages (free)
- Netlify (free)
- Vercel (free)
- WordPress (free/paid)

---

## 🎯 Quick Start (TL;DR)

```bash
# 1. Install EAS CLI
npm install -g eas-cli

# 2. Login
eas login

# 3. Configure project
eas build:configure

# 4. Create app in App Store Connect
# Go to https://appstoreconnect.apple.com/

# 5. Upload privacy policy to https://tmsofast.com/privacy

# 6. Build for iOS
eas build --platform ios --profile production

# 7. Submit to App Store
eas submit --platform ios --latest

# 8. Complete listing in App Store Connect
# - Add screenshots
# - Add description
# - Add privacy policy URL: https://tmsofast.com/privacy
# - Add support URL: https://tmsofast.com

# 9. Submit for review
# 10. Wait for approval
# 11. Release!
```

---

Good luck with your App Store submission! 🚀

For questions or support, visit https://tmsofast.com
