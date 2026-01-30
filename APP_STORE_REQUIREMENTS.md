
# App Store Submission Requirements - Quick Reference

## ✅ What You Need Before Submitting

### 1. Support URL ✅ CONFIGURED
**Status:** Already set up in app.json
**URL:** https://tmsofast.com/support

**Action Required:**
- Create a web page at https://tmsofast.com/support
- Include:
  - Contact email: info@tmsofast.com
  - How to use the app
  - FAQ section
  - How to cancel subscription

### 2. Privacy Policy URL ✅ CONFIGURED
**Status:** Already set up in app.json
**URL:** https://tmsofast.com/privacy

**Action Required:**
- Create a web page at https://tmsofast.com/privacy
- Use the template from the in-app "Submission Guide"

### 3. iPad Screenshot (13-inch) ⚠️ REQUIRED
**Dimensions:** 2048 x 2732 pixels (portrait)
**Format:** PNG or JPEG

**How to Create:**

#### Method 1: Xcode Simulator (Easiest)
```
1. Open Xcode
2. Window → Devices and Simulators
3. Select "iPad Pro (13-inch)"
4. Run your app (press Play button)
5. Navigate to home screen
6. Press Cmd + S to save screenshot
7. Screenshot saves to Desktop
```

#### Method 2: Physical iPad
```
1. Connect iPad Pro 13" to Mac
2. Run app on device
3. Press Top Button + Volume Up
4. AirDrop screenshot to Mac
```

### 4. iPhone Screenshot ⚠️ REQUIRED
**Dimensions:** 1320 x 2868 pixels (iPhone 16 Pro Max)
**Format:** PNG or JPEG

**How to Create:**
```
1. Open Xcode
2. Select "iPhone 16 Pro Max" simulator
3. Run your app
4. Press Cmd + S to save screenshot
```

## 📋 Step-by-Step Submission Process

### Step 1: Create Web Pages (30 minutes)
1. Go to sites.google.com
2. Create "Support" page with contact info
3. Create "Privacy Policy" page with template
4. Publish both pages
5. Copy the URLs

### Step 2: Capture Screenshots (15 minutes)
1. Open Xcode
2. Run app in iPad Pro 13" simulator
3. Take 3-5 screenshots of different screens
4. Run app in iPhone 16 Pro Max simulator
5. Take 3-5 screenshots of different screens

### Step 3: Join Apple Developer Program ($99/year)
1. Go to developer.apple.com
2. Click "Enroll"
3. Pay $99 annual fee
4. Wait for approval (usually 24-48 hours)

### Step 4: Create App in App Store Connect
1. Go to appstoreconnect.apple.com
2. Click "My Apps" → "+" → "New App"
3. Fill in app information:
   - Name: SOFAST Global Drills
   - Primary Language: English
   - Bundle ID: com.teamsofast.sofastglobal
   - SKU: sofastglobal001

### Step 5: Upload Screenshots
1. In App Store Connect, go to your app
2. Click "App Store" tab
3. Scroll to "App Previews and Screenshots"
4. Select "iPad Pro (13-inch)"
5. Drag and drop your iPad screenshots
6. Select "iPhone 16 Pro Max"
7. Drag and drop your iPhone screenshots

### Step 6: Enter URLs
1. In App Store Connect, click "App Information"
2. Find "Support URL" field
3. Enter: https://tmsofast.com/support
4. Find "Privacy Policy URL" field
5. Enter: https://tmsofast.com/privacy
6. Save changes

### Step 7: Build and Upload App
1. In Natively, click "Build" button
2. Wait for build to complete
3. Download the .ipa file
4. Upload to App Store Connect using Transporter app

### Step 8: Submit for Review
1. Fill in all required fields in App Store Connect
2. Set pricing ($4.99/month subscription)
3. Add app description and keywords
4. Click "Submit for Review"
5. Wait 1-2 weeks for Apple review

## 🎯 Quick Checklist

Before clicking "Submit for Review":

- [ ] Support page created at tmsofast.com/support
- [ ] Privacy policy created at tmsofast.com/privacy
- [ ] 3-5 iPad screenshots uploaded (2048 x 2732)
- [ ] 3-5 iPhone screenshots uploaded (1320 x 2868)
- [ ] Support URL entered in App Store Connect
- [ ] Privacy Policy URL entered in App Store Connect
- [ ] App description written (max 4000 characters)
- [ ] Keywords added (max 100 characters)
- [ ] App icon uploaded (1024 x 1024)
- [ ] Pricing set ($4.99/month)
- [ ] Age rating completed
- [ ] App build uploaded

## 📱 Screenshot Recommendations

### Best Screens to Capture:
1. **Home Screen** - Shows all 10 drills
2. **Drill Details** - El Presidente or FAST drill
3. **Camera View** - Active recording screen
4. **Results Screen** - Score and timing display
5. **Leaderboard** - Global rankings

### Screenshot Tips:
- Use portrait orientation
- Capture with real data (not empty screens)
- Show the app's best features
- Ensure good contrast and readability
- No personal information visible

## ⚠️ Common Issues and Solutions

### "Screenshot dimensions are incorrect"
- Use Xcode simulator, not physical device screenshots
- Verify dimensions: Right-click image → Get Info
- iPad: Must be exactly 2048 x 2732
- iPhone: Must be exactly 1320 x 2868

### "Support URL is not accessible"
- Make sure the page is published (not draft)
- Test the URL in a browser
- Ensure it's HTTPS, not HTTP

### "Privacy Policy URL is not accessible"
- Same as support URL issues
- Must be publicly accessible
- Cannot be behind a login

### "Build upload failed"
- Make sure you're enrolled in Apple Developer Program
- Check that bundle ID matches in Xcode and App Store Connect
- Ensure you have the latest Xcode version

## 📞 Support

**Email:** info@tmsofast.com
**Website:** https://tmsofast.com

---

**Your app is ready!** Just follow these steps and you'll be in the App Store soon. 🚀
