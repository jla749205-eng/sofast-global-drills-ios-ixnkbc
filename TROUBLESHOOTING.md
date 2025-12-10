
# 🔧 Troubleshooting Guide

Common issues and solutions during App Store submission.

---

## 🏗️ Build Issues

### Issue: "Not logged in to Expo"
```bash
# Solution:
eas login
```

### Issue: "No EAS project configured"
```bash
# Solution:
eas build:configure
```

### Issue: "Build failed"
```bash
# Check build logs:
eas build:list
eas build:view [BUILD_ID]

# Common causes:
# - Missing dependencies
# - Invalid app.json configuration
# - Certificate/provisioning issues
```

### Issue: "Invalid bundle identifier"
```
Solution:
1. Check app.json - bundleIdentifier must be unique
2. Verify you own this bundle ID in Apple Developer Portal
3. If not, change to: com.yourcompany.yourapp
```

### Issue: "Credentials error"
```bash
# Reset credentials:
eas credentials

# Select:
# - iOS
# - Remove all credentials
# - Try build again
```

---

## 📱 App Store Connect Issues

### Issue: "Build not appearing in App Store Connect"
```
Solution:
1. Wait 5-10 minutes for processing
2. Check email for processing errors
3. Verify build uploaded successfully
4. Check "Activity" tab in App Store Connect
```

### Issue: "Invalid binary"
```
Common causes:
- Missing required device capabilities
- Invalid bundle identifier
- Missing required icons
- Export compliance not set

Solution:
1. Check email from Apple for specific error
2. Fix the issue
3. Upload new build
```

### Issue: "Missing compliance"
```
Solution:
In app.json, ensure you have:
"ITSAppUsesNonExemptEncryption": false
```

---

## 🔐 Credentials Issues

### Issue: "Invalid Apple ID credentials"
```
Solution:
1. Verify Apple ID email in eas.json
2. If using 2FA, create app-specific password:
   - Go to appleid.apple.com
   - Security → App-Specific Passwords
   - Generate new password
   - Use this password with EAS
```

### Issue: "Team not found"
```
Solution:
1. Go to developer.apple.com
2. Click "Membership"
3. Copy your Team ID
4. Update eas.json with correct Team ID
```

### Issue: "Certificate expired"
```bash
# Solution:
eas credentials
# Select: iOS → Remove all credentials
# Then rebuild - EAS will create new certificates
```

---

## 📸 Screenshot Issues

### Issue: "Wrong screenshot size"
```
Required sizes:
- iPhone 6.7": 1290 x 2796 pixels
- iPhone 6.5": 1242 x 2688 pixels
- iPad Pro: 2048 x 2732 pixels

Solution:
1. Use iOS Simulator to take screenshots
2. Or resize existing screenshots
3. Use design tools (Figma, Photoshop)
```

### Issue: "Screenshots rejected"
```
Common reasons:
- Screenshots don't match actual app
- Placeholder content visible
- Low quality or blurry
- Contains competitor references

Solution:
1. Take new screenshots from actual app
2. Ensure high quality
3. Show real functionality
```

---

## 💰 Subscription Issues

### Issue: "Subscription not working in app"
```
Solution:
1. Verify Product ID matches exactly:
   com.teamsofast.sofastglobal.premium.monthly
2. Check RevenueCat configuration
3. Test with sandbox account
4. Check subscription status in App Store Connect
```

### Issue: "Subscription rejected"
```
Common reasons:
- Unclear value proposition
- Free features too limited
- Subscription terms not clear
- Missing cancellation information

Solution:
1. Clearly explain what premium includes
2. Ensure free tier is substantial (3 drills)
3. Add subscription terms to app
4. Show how to cancel
```

### Issue: "Can't test subscription"
```
Solution:
1. Create sandbox tester in App Store Connect
2. Sign out of App Store on device
3. Sign in with sandbox account
4. Test purchase in app
5. Verify features unlock
```

---

## 🚫 Rejection Reasons

### Rejection: "Incomplete information"
```
Solution:
1. Fill out ALL fields in App Store Connect
2. Check for red exclamation marks
3. Provide demo account if needed
4. Add detailed review notes
```

### Rejection: "Missing functionality"
```
Solution:
1. Ensure all advertised features work
2. Test thoroughly before submission
3. Provide clear instructions for reviewers
4. Include demo account if sign-in required
```

### Rejection: "Privacy policy issues"
```
Solution:
1. Ensure privacy policy URL is accessible
2. Privacy policy must be comprehensive
3. Must match data collection in app
4. Update privacy policy if needed
```

### Rejection: "Misleading content"
```
Solution:
1. Don't claim AI features that don't exist
2. Screenshots must match actual app
3. Description must be accurate
4. Remove any exaggerated claims
```

### Rejection: "Weapons/violence content"
```
Solution:
1. Emphasize training/sports aspect
2. Ensure age rating is 17+
3. Add disclaimer about training purpose
4. Remove any violent imagery
5. Focus on competition/skill development
```

### Rejection: "Subscription issues"
```
Solution:
1. Make free features more substantial
2. Clearly explain subscription benefits
3. Show subscription terms in app
4. Make cancellation process clear
5. Don't lock essential features
```

---

## 🌐 Privacy Policy Issues

### Issue: "Privacy policy URL not accessible"
```
Solution:
1. Verify URL is live: https://tmsofast.com/privacy
2. Check URL returns 200 status (not 404)
3. Ensure no login required to view
4. Test URL in incognito/private browser
```

### Issue: "Privacy policy incomplete"
```
Required sections:
- What data you collect
- How you use data
- Who you share data with
- User rights (access, deletion)
- Contact information

Solution:
Use PRIVACY_POLICY_TEMPLATE.md as reference
```

---

## 📧 Communication Issues

### Issue: "Not receiving Apple emails"
```
Solution:
1. Check spam/junk folder
2. Verify email in App Store Connect settings
3. Add noreply@apple.com to contacts
4. Check App Store Connect notifications directly
```

### Issue: "Apple requesting more information"
```
Solution:
1. Check Resolution Center in App Store Connect
2. Respond within 24 hours
3. Provide requested information clearly
4. Be professional and thorough
```

---

## ⏱️ Timeline Issues

### Issue: "Review taking too long"
```
Normal timeline:
- Waiting for Review: 24-48 hours
- In Review: 2-8 hours
- Total: 1-3 days

If longer:
1. Check App Store Connect for status
2. Look for messages in Resolution Center
3. Contact Apple Developer Support if > 5 days
```

### Issue: "Build stuck in processing"
```
Solution:
1. Wait 30 minutes
2. Check email for processing errors
3. If > 1 hour, contact Apple Support
4. May need to upload new build
```

---

## 🔄 Update Issues

### Issue: "Can't submit update"
```
Solution:
1. Increment version number in app.json
2. Increment build number
3. Create new version in App Store Connect
4. Upload new build
```

### Issue: "Update rejected"
```
Common reasons:
- Same issues as initial submission
- New bugs introduced
- Changed functionality without explanation

Solution:
1. Fix reported issues
2. Test thoroughly
3. Explain changes in "What's New"
4. Resubmit
```

---

## 🛠️ Technical Issues

### Issue: "App crashes on launch"
```
Solution:
1. Check crash logs in App Store Connect
2. Test on real device
3. Check for missing dependencies
4. Verify all required permissions
5. Fix crash and upload new build
```

### Issue: "Camera not working"
```
Solution:
1. Verify camera permission in app.json
2. Check permission description is clear
3. Test on real device (not simulator)
4. Ensure camera code is correct
```

### Issue: "Subscription not unlocking features"
```
Solution:
1. Check RevenueCat configuration
2. Verify Product ID matches
3. Check entitlement mapping
4. Test restore purchases
5. Check webhook configuration
```

---

## 📊 Performance Issues

### Issue: "App too slow"
```
Solution:
1. Optimize images and assets
2. Reduce bundle size
3. Implement lazy loading
4. Profile with React DevTools
5. Test on older devices
```

### Issue: "App too large"
```
Solution:
1. Optimize images (compress, resize)
2. Remove unused dependencies
3. Use on-demand resources
4. Check bundle analyzer
```

---

## 🆘 Getting Help

### EAS/Expo Issues
- Documentation: https://docs.expo.dev/eas/
- Discord: https://chat.expo.dev
- Forums: https://forums.expo.dev

### Apple Issues
- Developer Support: https://developer.apple.com/support/
- App Store Connect Help: In-app help button
- Phone: 1-800-633-2152 (US)

### App Review Issues
- Resolution Center: In App Store Connect
- Appeal: If you believe rejection is incorrect
- Guidelines: https://developer.apple.com/app-store/review/guidelines/

---

## 📝 Debugging Checklist

When something goes wrong:
- [ ] Check error message carefully
- [ ] Search error in Expo forums
- [ ] Check EAS build logs
- [ ] Verify all configuration files
- [ ] Test on real device
- [ ] Check Apple Developer Portal
- [ ] Review App Store Connect messages
- [ ] Contact support if stuck

---

## 🎯 Prevention Tips

Avoid issues by:
- ✅ Testing thoroughly before submission
- ✅ Reading Apple's guidelines
- ✅ Using latest Expo SDK
- ✅ Keeping dependencies updated
- ✅ Following best practices
- ✅ Testing on real devices
- ✅ Having comprehensive privacy policy
- ✅ Providing clear app description

---

## 📞 Emergency Contacts

**Expo Support:**
- Discord: https://chat.expo.dev
- Email: support@expo.dev

**Apple Support:**
- Phone: 1-800-633-2152 (US)
- Web: https://developer.apple.com/support/

**RevenueCat Support:**
- Email: support@revenuecat.com
- Docs: https://docs.revenuecat.com

---

**Still stuck? Check the detailed guides or reach out to support!**
