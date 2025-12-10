
# 🚀 Exact Commands to Run for App Store Submission

## Prerequisites Check
```bash
# Check if you have Node.js installed
node --version

# Check if you have npm installed
npm --version

# Check if you're in the project directory
pwd
```

---

## Step 1: Install EAS CLI Globally
```bash
npm install -g eas-cli
```

**Expected output**: 
```
added 1 package in 2s
```

---

## Step 2: Login to Expo Account
```bash
eas login
```

**You'll be prompted for:**
- Email or username
- Password

**Expected output**:
```
✔ Logged in as your-username
```

---

## Step 3: Configure EAS Project (First Time Only)
```bash
eas build:configure
```

**This will:**
- Update your `app.json` with EAS project ID
- Create/update `eas.json` configuration

**Expected output**:
```
✔ EAS project configured
```

---

## Step 4: Build for iOS Production
```bash
eas build --platform ios --profile production
```

**What happens:**
1. EAS uploads your code
2. Asks about credentials (first time):
   - "Would you like to set up credentials?" → **Yes**
   - "Generate new credentials?" → **Yes**
3. Builds in the cloud (10-20 minutes)
4. Provides download link

**Expected output**:
```
✔ Build started
✔ Build ID: abc123-def456-ghi789
✔ Build link: https://expo.dev/accounts/[account]/projects/[project]/builds/[id]

⏱️  Build in progress...
```

**Monitor build:**
```bash
eas build:list
```

---

## Step 5: Wait for Build to Complete

Check build status:
```bash
eas build:view [BUILD_ID]
```

Or visit the build link in your browser.

**When complete, you'll see:**
```
✔ Build finished
✔ Download: https://expo.dev/artifacts/[artifact-id]
```

---

## Step 6: Submit to App Store Connect

### Option A: Automatic Submission (Recommended)
```bash
eas submit --platform ios --profile production
```

**You'll be prompted for:**
- Apple ID email
- App-specific password (if 2FA enabled)
- App Store Connect App ID

**Expected output**:
```
✔ Submitting to App Store Connect
✔ Upload complete
✔ Build is now processing in App Store Connect
```

### Option B: Manual Upload
1. Download `.ipa` file from build link
2. Open **Transporter** app (Mac)
3. Drag and drop `.ipa` file
4. Click "Deliver"

---

## Step 7: Check Submission Status

In App Store Connect:
1. Go to https://appstoreconnect.apple.com
2. Click "My Apps" → "SOFAST Global Drills"
3. Go to "TestFlight" tab
4. Wait for "Processing" to change to "Ready to Submit"

---

## Optional: Build for TestFlight First

Test your app before public release:

```bash
# Build for preview/testing
eas build --platform ios --profile preview

# Submit to TestFlight
eas submit --platform ios --profile preview
```

---

## Troubleshooting Commands

### Check EAS account
```bash
eas whoami
```

### View all builds
```bash
eas build:list
```

### View specific build
```bash
eas build:view [BUILD_ID]
```

### Cancel a build
```bash
eas build:cancel [BUILD_ID]
```

### View build logs
```bash
eas build:view [BUILD_ID] --logs
```

### Update credentials
```bash
eas credentials
```

---

## Common Errors & Fixes

### Error: "Not logged in"
```bash
eas login
```

### Error: "No EAS project configured"
```bash
eas build:configure
```

### Error: "Invalid credentials"
```bash
eas credentials
# Select "iOS" → "Remove all credentials" → Try build again
```

### Error: "Bundle identifier already exists"
- Change `bundleIdentifier` in `app.json`
- Or use existing one if you own it

---

## Complete Command Sequence (Copy & Paste)

```bash
# 1. Install EAS CLI
npm install -g eas-cli

# 2. Login
eas login

# 3. Configure (first time only)
eas build:configure

# 4. Build for production
eas build --platform ios --profile production

# 5. Wait for build to complete (check status)
eas build:list

# 6. Submit to App Store
eas submit --platform ios --profile production
```

---

## After Running These Commands

1. ✅ Your app is built
2. ✅ Your app is uploaded to App Store Connect
3. ⏳ Complete App Store Connect listing (see APP_STORE_SUBMISSION_CHECKLIST.md)
4. ⏳ Submit for review in App Store Connect
5. ⏳ Wait for Apple review (24-48 hours)
6. 🎉 App goes live!

---

## Time Estimates

- **Install EAS CLI**: 1 minute
- **Login**: 1 minute
- **Configure**: 2 minutes
- **Build**: 10-20 minutes
- **Submit**: 5 minutes
- **Total**: ~30 minutes of your time

---

## Next Steps

After running these commands, follow:
1. **QUICK_START_SUBMISSION.md** - For App Store Connect setup
2. **APP_STORE_SUBMISSION_CHECKLIST.md** - For complete checklist
3. **IN_APP_PURCHASE_SETUP.md** - For subscription setup

---

## 🆘 Need Help?

- **EAS Docs**: https://docs.expo.dev/eas/
- **Discord**: https://chat.expo.dev
- **Forums**: https://forums.expo.dev

---

**You're ready to launch! 🚀**

Run the first command now:
```bash
npm install -g eas-cli
```
