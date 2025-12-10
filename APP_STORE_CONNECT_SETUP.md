
# 📱 App Store Connect Setup Guide

## Overview
This guide walks you through setting up your app listing in App Store Connect after your build is uploaded.

---

## Part 1: Create New App

### 1. Access App Store Connect
- Go to: https://appstoreconnect.apple.com
- Sign in with your Apple Developer account

### 2. Create New App
1. Click **"My Apps"**
2. Click **"+"** button (top left)
3. Select **"New App"**

### 3. Fill in App Information
```
Platform: iOS
Name: SOFAST Global Drills
Primary Language: English (U.S.)
Bundle ID: com.teamsofast.sofastglobal
SKU: sofastglobal-001
User Access: Full Access
```

Click **"Create"**

---

## Part 2: App Information

### General Information
```
Name: SOFAST Global Drills
Subtitle: Marksmanship Training & Competition
```

### Category
```
Primary Category: Sports
Secondary Category: Health & Fitness
```

### Content Rights
- ☑️ "I own the rights to this app"

### Age Rating
Click **"Edit"** and answer questionnaire:

**Violence:**
- Realistic Violence: **Frequent/Intense**
- (Due to shooting/firearms theme)

**Other Categories:**
- All others: **None**

**Expected Rating: 17+** (due to realistic violence)

### Privacy Policy
```
Privacy Policy URL: https://tmsofast.com/privacy
```

⚠️ **IMPORTANT**: This URL must be live and accessible!

---

## Part 3: Pricing and Availability

### Price
```
Price: Free
```

### Availability
```
☑️ Make this app available in all territories
```

Or select specific countries if needed.

### App Distribution
```
☑️ Available on the App Store for iPhone
☑️ Available on the App Store for iPad
```

---

## Part 4: App Privacy

Click **"Get Started"** under App Privacy

### Data Collection
**Question: Does your app collect data?**
- Answer: **Yes**

### Data Types Collected

#### 1. Contact Info
- **Email Address**
  - Used for: App Functionality, Analytics
  - Linked to User: Yes
  - Used for Tracking: No

#### 2. User Content
- **Other User Content** (Drill videos/photos)
  - Used for: App Functionality
  - Linked to User: Yes
  - Used for Tracking: No

#### 3. Identifiers
- **User ID**
  - Used for: App Functionality, Analytics
  - Linked to User: Yes
  - Used for Tracking: No

- **Device ID**
  - Used for: App Functionality, Analytics
  - Linked to User: Yes
  - Used for Tracking: No

#### 4. Usage Data
- **Product Interaction** (Drill usage, scores)
  - Used for: App Functionality, Analytics
  - Linked to User: Yes
  - Used for Tracking: No

#### 5. Diagnostics
- **Crash Data**
  - Used for: App Functionality
  - Linked to User: No
  - Used for Tracking: No

- **Performance Data**
  - Used for: App Functionality
  - Linked to User: No
  - Used for Tracking: No

### Privacy Practices
- ☑️ Data is encrypted in transit
- ☑️ Users can request data deletion
- ☑️ Privacy policy is provided

---

## Part 5: Prepare for Submission

### 1. Create Version 1.0.0
1. Click **"+"** next to "iOS App"
2. Enter version: **1.0.0**
3. Click **"Create"**

### 2. Screenshots (REQUIRED)

You need screenshots for:

#### iPhone 6.7" Display (1290 x 2796 pixels)
**Required: 3-10 screenshots**

Recommended screenshots:
1. **Home Screen** - Drill selection grid
2. **Drill in Progress** - Camera view with timer
3. **Results Screen** - Score and performance
4. **Leaderboard** - Global rankings
5. **Profile** - User stats and achievements

#### iPhone 6.5" Display (1242 x 2688 pixels)
**Required: 3-10 screenshots**
(Same as above, different resolution)

#### iPad Pro (2048 x 2732 pixels)
**Optional but recommended**

**How to create screenshots:**
```bash
# Option 1: Use iOS Simulator
1. Run: npm run ios
2. Press Cmd+S to take screenshot
3. Screenshots saved to Desktop

# Option 2: Use real device
1. Navigate to each screen
2. Press Volume Up + Side Button
3. Find in Photos app

# Option 3: Design promotional screenshots
Use Figma, Sketch, or Photoshop with device frames
```

### 3. App Preview Video (Optional)
- 15-30 seconds
- Shows key features
- No audio required
- Same resolutions as screenshots

---

## Part 6: App Description

### Promotional Text (170 characters)
```
Train like a pro with AI-powered shot detection. Compete globally with 10 professional drills. Free to start, premium to master.
```

### Description (4000 characters max)
```
SOFAST Global Drills is the ultimate marksmanship training app for competitive shooters and firearms enthusiasts.

🎯 TRAIN WITH PROFESSIONAL DRILLS
Master 10 industry-standard shooting drills used by competitive shooters worldwide:
• El Presidente - Classic 12-round drill
• Mozambique Drill - Failure to stop drill
• Dot Torture - Precision accuracy test
• Bill Drill - Speed and accuracy challenge
• FAST - Fundamentals of Accuracy, Speed & Tactics
• 1-5-1 Drill - Transition training
• Hackathorn Standards - Complete skill assessment
• Failure Drill - Combat shooting fundamentals
• Walk Back Drill - Distance accuracy test
• 5x5 Drill - Consistency and control

🤖 AI-POWERED SHOT DETECTION
Advanced technology uses your iPhone's camera, microphone, and motion sensors to:
• Detect muzzle flash and shot sounds
• Analyze recoil patterns and shooting form
• Calculate accurate split times
• Identify flinching and anticipation
• Provide instant performance feedback

📊 COMPETE GLOBALLY
• Global leaderboards with division rankings
• Open, Veteran, and Law Enforcement divisions
• Track your progress over time
• Compare with shooters worldwide
• Earn achievements and badges

✨ PREMIUM FEATURES
Free Version:
• 3 training drills to get started
• Basic performance tracking
• Global leaderboard access

Premium Subscription ($4.99/month):
• Unlock all 10 professional drills
• Veteran badge recognition
• Advanced performance analytics
• Detailed shot-by-shot analysis
• Priority customer support
• Early access to new features

🎥 EASY TO USE
1. Select your drill
2. Prop your iPhone on the bench
3. Start the timer
4. Complete the drill
5. Review your performance

📱 FEATURES
• Automatic timing and split tracking
• Par time beeps for training
• Offline mode with Wi-Fi sync
• Dark mode support
• Clean, intuitive interface
• No ads, ever

🏆 PERFECT FOR
• USPSA competitors
• IDPA shooters
• Law enforcement training
• Military personnel
• Competitive shooters
• Firearms instructors
• Anyone serious about improving their shooting skills

💪 TRAIN SMARTER. SHOOT FASTER. COMPETE GLOBALLY.

Download SOFAST Global Drills today and take your marksmanship to the next level.

---

Subscription Information:
• Payment charged to Apple ID at confirmation of purchase
• Subscription automatically renews unless cancelled at least 24 hours before the end of the current period
• Manage subscriptions in iOS Settings → Apple ID → Subscriptions
• No refunds for unused portions of subscription

Privacy Policy: https://tmsofast.com/privacy
Terms of Service: https://tmsofast.com/terms
Support: https://tmsofast.com/support
```

### Keywords (100 characters max)
```
shooting,marksmanship,uspsa,idpa,training,competition,drills,firearms,tactical,shooting sports
```

### Support URL
```
https://tmsofast.com/support
```

### Marketing URL (Optional)
```
https://tmsofast.com
```

---

## Part 7: Build Selection

### 1. Select Build
1. Under "Build", click **"+"**
2. Select the build you uploaded via EAS
3. If no build appears, wait 5-10 minutes for processing

### 2. Export Compliance
**Question: Does your app use encryption?**
- Answer: **No** (already set in app.json)

---

## Part 8: What's New in This Version

```
🎉 Welcome to SOFAST Global Drills!

Initial release featuring:

✓ 10 Professional Shooting Drills
  • El Presidente, Mozambique, Dot Torture, Bill Drill, FAST, and more

✓ AI-Powered Shot Detection
  • Automatic timing and split tracking
  • Muzzle flash and audio detection
  • Recoil pattern analysis

✓ Global Competition
  • Compete with shooters worldwide
  • Division-based leaderboards (Open, Veteran, LE)
  • Track your progress and rankings

✓ Premium Features
  • Free: 3 drills to get started
  • Premium: All 10 drills + advanced analytics ($4.99/month)

✓ Offline Mode
  • Train anywhere, sync when connected

✓ Dark Mode Support
  • Easy on the eyes during range sessions

Train smarter. Shoot faster. Compete globally.
```

---

## Part 9: App Review Information

### Contact Information
```
First Name: [Your First Name]
Last Name: [Your Last Name]
Phone Number: [Your Phone Number]
Email: [Your Support Email]
```

### Notes for Review
```
SOFAST Global Drills is a marksmanship training app for competitive shooters.

KEY FEATURES TO TEST:
1. Drill Selection - Choose from 10 professional drills
2. Camera Integration - Records shooting performance
3. Shot Detection - Uses camera, mic, and sensors
4. Results & Scoring - Calculates performance metrics
5. Leaderboards - View global rankings
6. Subscription - $4.99/month unlocks all drills

FREE FEATURES:
- 3 drills available without subscription
- Basic performance tracking
- Leaderboard access

PREMIUM FEATURES (Subscription Required):
- All 10 drills
- Veteran badge
- Advanced analytics

TESTING NOTES:
- Camera permission required for drill recording
- Microphone permission for shot detection
- Motion sensor permission for recoil analysis
- Subscription can be tested with sandbox account

CONTENT RATING:
- App contains realistic firearms training content
- Intended for sports/competition use
- No violent or graphic content
- Educational and training focused

TEST ACCOUNT (if needed):
Username: [provide if you have one]
Password: [provide if you have one]

Thank you for reviewing our app!
```

### Demo Account (if required)
If Apple requests a demo account:
```
Username: demo@teamsofast.com
Password: Demo123!
```

---

## Part 10: Version Release

### Release Options

#### Option 1: Automatic Release (Recommended)
- ☑️ **Automatically release this version**
- App goes live immediately after approval

#### Option 2: Manual Release
- ☑️ **Manually release this version**
- You choose when to release after approval

#### Option 3: Scheduled Release
- ☑️ **Automatically release on [DATE]**
- Set specific date/time for release

---

## Part 11: Submit for Review

### Final Checklist
- ✅ All required fields filled
- ✅ Screenshots uploaded (all required sizes)
- ✅ Description and keywords added
- ✅ Build selected
- ✅ Privacy information complete
- ✅ App review information provided
- ✅ Pricing set (Free)
- ✅ Availability configured

### Submit
1. Click **"Add for Review"** (top right)
2. Review summary page
3. Click **"Submit to App Review"**

---

## Part 12: After Submission

### Status Updates

You'll receive emails for each status change:

#### 1. Waiting for Review
- Your app is in the queue
- Typical wait: 24-48 hours

#### 2. In Review
- Apple is actively reviewing
- Usually takes a few hours

#### 3. Pending Developer Release
- Approved! Waiting for you to release
- (Only if you chose manual release)

#### 4. Ready for Sale
- 🎉 Your app is LIVE!
- Available on the App Store

#### 5. Rejected (if issues found)
- Review rejection reasons
- Fix issues
- Resubmit

---

## Common Rejection Reasons

### 1. Incomplete Information
- **Fix**: Fill out all required fields
- **Fix**: Provide clear app description

### 2. Missing Functionality
- **Fix**: Ensure all features work
- **Fix**: Provide test account if needed

### 3. Privacy Policy Issues
- **Fix**: Ensure privacy policy is accessible
- **Fix**: Update privacy policy to match app functionality

### 4. Misleading Content
- **Fix**: Don't claim features that don't exist
- **Fix**: Ensure screenshots match actual app

### 5. Weapons/Violence Content
- **Fix**: Emphasize training/sports aspect
- **Fix**: Ensure age rating is appropriate (17+)

### 6. Subscription Issues
- **Fix**: Clearly explain subscription terms
- **Fix**: Ensure free features are substantial
- **Fix**: Make cancellation process clear

---

## Monitoring Your Submission

### Check Status
1. Go to App Store Connect
2. Click "My Apps" → "SOFAST Global Drills"
3. View current status

### Respond to Apple
If Apple has questions:
1. Check "Resolution Center"
2. Respond within 24 hours
3. Provide requested information

---

## After Approval

### 1. Celebrate! 🎉
Your app is live on the App Store!

### 2. Share Your App
```
App Store Link:
https://apps.apple.com/app/sofast-global-drills/[APP_ID]
```

### 3. Monitor Performance
- Downloads
- Ratings and reviews
- Crash reports
- Subscription conversions

### 4. Respond to Reviews
- Thank positive reviews
- Address negative feedback
- Fix reported bugs

---

## Updating Your App

For future updates:

```bash
# 1. Update version in app.json
"version": "1.0.1"

# 2. Build new version
eas build --platform ios --profile production

# 3. Submit update
eas submit --platform ios --profile production

# 4. In App Store Connect:
# - Create new version
# - Add "What's New" text
# - Submit for review
```

---

## Support Resources

- **App Store Connect**: https://appstoreconnect.apple.com
- **Apple Developer**: https://developer.apple.com
- **App Review Guidelines**: https://developer.apple.com/app-store/review/guidelines/
- **Contact Apple**: https://developer.apple.com/contact/

---

## Timeline Summary

- **App Store Connect Setup**: 30-60 minutes
- **Screenshot Creation**: 30-60 minutes
- **Review Wait Time**: 24-48 hours
- **Review Duration**: 2-8 hours
- **Total Time to Launch**: 1-3 days

---

**You're ready to submit! 🚀**

Next: Follow COMMANDS_TO_RUN.md to build and upload your app.
