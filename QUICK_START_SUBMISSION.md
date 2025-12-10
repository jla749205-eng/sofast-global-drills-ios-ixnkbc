
# 🚀 Quick Start: Submit to App Store (5 Steps)

## Prerequisites
- ✅ Apple Developer Account ($99/year)
- ✅ Access to App Store Connect
- ✅ Privacy policy live at https://tmsofast.com/privacy

---

## Step 1: Update Your Apple Credentials

Edit `eas.json` and replace these values:

```json
"appleId": "your-email@example.com",
"ascAppId": "1234567890",
"appleTeamId": "ABCD123456"
```

**Where to find:**
- `appleId`: Your Apple ID email
- `ascAppId`: App Store Connect → Your App → App Information → Apple ID
- `appleTeamId`: developer.apple.com → Membership → Team ID

---

## Step 2: Install EAS CLI & Login

```bash
npm install -g eas-cli
eas login
```

---

## Step 3: Build Your App

```bash
eas build --platform ios --profile production
```

⏱️ This takes 10-20 minutes. EAS will:
- Set up certificates automatically (first time)
- Build your app in the cloud
- Give you a download link

---

## Step 4: Create App in App Store Connect

While your build is running:

1. Go to https://appstoreconnect.apple.com
2. Click "My Apps" → "+" → "New App"
3. Fill in:
   - Name: **SOFAST Global Drills**
   - Bundle ID: **com.teamsofast.sofastglobal**
   - SKU: **sofastglobal**
   - Language: **English**

4. Add required info:
   - **Description**: (See APP_STORE_SUBMISSION_CHECKLIST.md)
   - **Keywords**: shooting,marksmanship,uspsa,idpa,training
   - **Screenshots**: Take 3-5 screenshots from your app
   - **Privacy Policy**: https://tmsofast.com/privacy
   - **Category**: Sports
   - **Age Rating**: Answer questionnaire (expect 12+ or 17+)

---

## Step 5: Submit Your Build

```bash
eas submit --platform ios --profile production
```

This uploads your build to App Store Connect automatically.

Then in App Store Connect:
1. Select your uploaded build
2. Fill in "What's New in This Version"
3. Click "Submit for Review"

---

## ⏱️ Timeline

- Build: 10-20 minutes
- App Store setup: 30-60 minutes
- Review: 24-48 hours
- **Total: 1-3 days to launch**

---

## 🎯 After Submission

You'll receive emails from Apple:
1. "Waiting for Review" - Your app is in queue
2. "In Review" - Apple is reviewing (usually 24-48 hours)
3. "Ready for Sale" - APPROVED! 🎉
4. Or "Rejected" - Fix issues and resubmit

---

## 🆘 Need Help?

- Full checklist: See `APP_STORE_SUBMISSION_CHECKLIST.md`
- EAS Docs: https://docs.expo.dev/eas/
- App Store Connect: https://appstoreconnect.apple.com

---

## 🎉 You're Ready!

Run this command to start:
```bash
eas build --platform ios --profile production
```
