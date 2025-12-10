
# 🚀 SOFAST Global - App Store Submission Checklist

## ✅ Pre-Submission Checklist

### 1. App Configuration (COMPLETED ✓)
- [x] Bundle Identifier: `com.teamsofast.sofastglobal`
- [x] Version: `1.0.0`
- [x] Build Number: `1`
- [x] App Name: "SOFAST Global Drills"
- [x] Privacy Policy URL: https://tmsofast.com/privacy
- [x] Website URL: https://tmsofast.com

### 2. Required Assets (VERIFY)
- [ ] App Icon (1024x1024px) - Currently using: `./assets/images/7cadd481-5bea-470d-802a-1f44d5a96178.jpeg`
- [ ] Splash Screen - Currently using: `./assets/images/7cadd481-5bea-470d-802a-1f44d5a96178.jpeg`
- [ ] Screenshots (Required for App Store):
  - [ ] 6.7" iPhone (1290 x 2796 pixels) - At least 3 screenshots
  - [ ] 6.5" iPhone (1242 x 2688 pixels) - At least 3 screenshots
  - [ ] 5.5" iPhone (1242 x 2208 pixels) - Optional
  - [ ] iPad Pro (2048 x 2732 pixels) - Optional but recommended

### 3. Privacy & Permissions (COMPLETED ✓)
- [x] Camera Permission Description
- [x] Microphone Permission Description
- [x] Motion Sensors Permission Description
- [x] Privacy Policy URL configured
- [x] ITSAppUsesNonExemptEncryption set to false

### 4. App Store Connect Setup (ACTION REQUIRED)
- [ ] Create app record in App Store Connect
- [ ] Configure App Information
- [ ] Set up pricing (Free with In-App Purchases)
- [ ] Configure In-App Purchases ($4.99/month subscription)
- [ ] Add App Privacy details
- [ ] Prepare App Store description and keywords

---

## 📋 Step-by-Step Submission Process

### STEP 1: Update EAS Configuration
Your `eas.json` needs your actual Apple credentials. Update these values:

```json
{
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@email.com",
        "ascAppId": "1234567890",
        "appleTeamId": "ABCD123456"
      }
    }
  }
}
```

**How to find these values:**
- **appleId**: Your Apple ID email (the one you use for App Store Connect)
- **ascAppId**: Found in App Store Connect → Your App → App Information → Apple ID
- **appleTeamId**: Found in Apple Developer Portal → Membership → Team ID

### STEP 2: Install EAS CLI (if not already installed)
```bash
npm install -g eas-cli
```

### STEP 3: Login to Expo
```bash
eas login
```

### STEP 4: Configure EAS Project
```bash
eas build:configure
```

This will update your `app.json` with your EAS project ID.

### STEP 5: Build for Production
```bash
eas build --platform ios --profile production
```

**What happens during build:**
- EAS will ask you to set up Apple credentials if this is your first build
- It will create/manage certificates and provisioning profiles automatically
- The build happens in the cloud (takes 10-20 minutes)
- You'll get a link to download the `.ipa` file when complete

### STEP 6: Create App in App Store Connect

1. Go to https://appstoreconnect.apple.com
2. Click "My Apps" → "+" → "New App"
3. Fill in:
   - **Platform**: iOS
   - **Name**: SOFAST Global Drills
   - **Primary Language**: English
   - **Bundle ID**: com.teamsofast.sofastglobal
   - **SKU**: sofastglobal (or any unique identifier)
   - **User Access**: Full Access

### STEP 7: Configure App Information

#### App Information Tab:
- **Name**: SOFAST Global Drills
- **Subtitle**: Marksmanship Training & Competition
- **Privacy Policy URL**: https://tmsofast.com/privacy
- **Category**: Primary: Sports, Secondary: Health & Fitness
- **Content Rights**: Check if you own all rights

#### Pricing and Availability:
- **Price**: Free
- **Availability**: All countries (or select specific ones)

#### App Privacy:
You'll need to answer questions about data collection. Based on your app:
- **Data Collection**: Yes (for leaderboards/rankings)
- **Data Types**: 
  - User ID
  - Performance Data (drill scores)
  - Device ID (for rankings)
- **Data Usage**: Analytics, App Functionality
- **Data Linked to User**: Yes (for leaderboard)

### STEP 8: Prepare App Store Listing

#### Description (4000 characters max):
```
SOFAST Global Drills is the ultimate marksmanship training app for competitive shooters. 

Train with 10 professional shooting drills including:
• El Presidente
• Mozambique Drill
• Dot Torture
• Bill Drill
• FAST (Fundamentals of Accuracy, Speed & Tactics)
• 1-5-1 Drill
• Hackathorn Standards
• Failure Drill
• Walk Back Drill
• 5x5 Drill

FEATURES:
✓ AI-Powered Shot Detection using camera, microphone, and motion sensors
✓ Automatic timing and split tracking
✓ Global leaderboards with division rankings (Open, Veteran, Law Enforcement)
✓ Detailed performance analysis
✓ Offline mode with Wi-Fi sync
✓ Dark mode support

FREE VERSION:
Access 3 drills to get started

PREMIUM SUBSCRIPTION ($4.99/month):
• Unlock all 10 professional drills
• Veteran badge recognition
• Advanced analytics
• Priority support

Perfect for USPSA, IDPA, and competitive shooters looking to improve their skills and compete globally.

Train smarter. Shoot faster. Compete globally.
```

#### Keywords (100 characters max):
```
shooting,marksmanship,uspsa,idpa,training,competition,drills,firearms,tactical,shooting sports
```

#### Support URL:
```
https://tmsofast.com
```

#### Marketing URL (optional):
```
https://tmsofast.com
```

### STEP 9: Upload Screenshots

You need to take screenshots of your app. Use these screens:
1. Home screen with drill selection
2. Drill in progress (camera view)
3. Results screen with scores
4. Leaderboard/Rankings
5. Profile screen

**Tools to create screenshots:**
- Use iOS Simulator and take screenshots (Cmd+S)
- Use real device and take screenshots
- Use design tools like Figma to create promotional screenshots with text overlays

### STEP 10: Submit Build via EAS

Once your build is complete:

```bash
eas submit --platform ios --profile production
```

This will automatically upload your build to App Store Connect.

**OR manually upload:**
1. Download the `.ipa` file from EAS
2. Use Transporter app (Mac) or Xcode to upload to App Store Connect

### STEP 11: Configure Version in App Store Connect

1. Go to your app in App Store Connect
2. Click "+" next to "iOS App" to create version 1.0.0
3. Select the build you just uploaded
4. Fill in "What's New in This Version":
   ```
   Initial release of SOFAST Global Drills!
   
   • 10 professional shooting drills
   • AI-powered shot detection
   • Global leaderboards
   • Offline mode
   • Dark mode support
   ```

### STEP 12: Configure In-App Purchases

1. In App Store Connect, go to your app → Features → In-App Purchases
2. Click "+" to create new subscription
3. Configure:
   - **Reference Name**: Premium Monthly Subscription
   - **Product ID**: com.teamsofast.sofastglobal.premium.monthly
   - **Subscription Group**: Premium Access
   - **Subscription Duration**: 1 Month
   - **Price**: $4.99 USD

4. Add subscription information:
   - **Display Name**: Premium Subscription
   - **Description**: Unlock all 10 drills, veteran badge, and advanced features

5. Submit for review (subscriptions need separate approval)

### STEP 13: Age Rating

Answer the questionnaire:
- **Violence**: Realistic Violence (due to shooting theme)
- **Gambling**: None
- **Mature/Suggestive Themes**: None
- **Horror/Fear**: None

Expected rating: **12+** or **17+** (due to realistic violence/weapons)

### STEP 14: Export Compliance

Your app.json already has:
```json
"ITSAppUsesNonExemptEncryption": false
```

This means you don't use encryption beyond what Apple provides, so no export compliance documentation needed.

### STEP 15: Final Review & Submit

1. Review all information in App Store Connect
2. Make sure all required fields are filled (red exclamation marks)
3. Click "Add for Review"
4. Answer additional questions:
   - **Advertising Identifier**: No (unless you use ads)
   - **Content Rights**: Confirm you own all content
5. Click "Submit for Review"

---

## ⏱️ Timeline

- **Build Time**: 10-20 minutes
- **Upload Time**: 5-10 minutes
- **App Review**: 24-48 hours (typically)
- **Total Time to Launch**: 1-3 days

---

## 🚨 Common Rejection Reasons & How to Avoid

### 1. Missing Functionality
- ✅ **Solution**: Your app is fully functional with camera, audio, and sensors

### 2. Incomplete Information
- ✅ **Solution**: Fill out ALL fields in App Store Connect

### 3. Privacy Policy Issues
- ⚠️ **Action**: Ensure https://tmsofast.com/privacy is live and comprehensive

### 4. In-App Purchase Issues
- ⚠️ **Action**: Make sure subscription is properly configured and testable

### 5. Weapons/Violence Content
- ⚠️ **Action**: Emphasize "training" and "sports" aspect, not violence
- ⚠️ **Action**: Ensure age rating is appropriate (12+ or 17+)

### 6. Misleading Claims
- ✅ **Solution**: Don't claim AI features that aren't implemented yet

---

## 📱 Testing Before Submission

### TestFlight (Recommended)
```bash
eas build --platform ios --profile preview
eas submit --platform ios --profile preview
```

This creates an internal testing build you can distribute to up to 100 testers before public release.

---

## 🔄 After Approval

### Immediate Release:
- App goes live automatically after approval

### Scheduled Release:
- In App Store Connect, choose "Manually release this version"
- After approval, you can choose when to release

---

## 📞 Support Resources

- **EAS Documentation**: https://docs.expo.dev/eas/
- **App Store Connect**: https://appstoreconnect.apple.com
- **Apple Developer**: https://developer.apple.com
- **App Review Guidelines**: https://developer.apple.com/app-store/review/guidelines/

---

## 🎯 Quick Command Reference

```bash
# Login to EAS
eas login

# Build for production
eas build --platform ios --profile production

# Submit to App Store
eas submit --platform ios --profile production

# Check build status
eas build:list

# View build logs
eas build:view [BUILD_ID]
```

---

## ✨ Next Steps After This Checklist

1. Update `eas.json` with your Apple credentials
2. Run `eas build --platform ios --profile production`
3. While build is running, set up App Store Connect listing
4. Upload build and submit for review
5. Wait for approval (monitor email)
6. Release to the world! 🎉
