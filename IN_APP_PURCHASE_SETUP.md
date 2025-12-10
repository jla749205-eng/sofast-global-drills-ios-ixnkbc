
# In-App Purchase Setup Guide

## Overview
SOFAST Global Drills uses a subscription model:
- **Free**: 3 drills
- **Premium**: $4.99/month - All 10 drills + veteran badge

---

## Step 1: Create Subscription in App Store Connect

1. Go to https://appstoreconnect.apple.com
2. Select your app: **SOFAST Global Drills**
3. Go to **Features** → **In-App Purchases**
4. Click **"+"** → **Auto-Renewable Subscription**

---

## Step 2: Create Subscription Group

1. Click **"Create Subscription Group"**
2. Fill in:
   - **Reference Name**: Premium Access
   - **App Name**: SOFAST Global Drills Premium

---

## Step 3: Configure Subscription

### Basic Information:
- **Reference Name**: Premium Monthly Subscription
- **Product ID**: `com.teamsofast.sofastglobal.premium.monthly`
- **Subscription Duration**: 1 Month (1 month)
- **Subscription Prices**: $4.99 USD

### Subscription Localizations:
- **Display Name**: Premium Subscription
- **Description**: 
  ```
  Unlock all 10 professional shooting drills, veteran badge recognition, and advanced analytics. 
  Train like a pro with unlimited access to all features.
  ```

### Review Information:
- **Screenshot**: Upload a screenshot showing premium features
- **Review Notes**: 
  ```
  Premium subscription unlocks:
  - All 10 professional drills
  - Veteran badge
  - Advanced analytics
  - Priority support
  
  Test account: [provide test account if needed]
  ```

---

## Step 4: Configure Subscription Details

### Subscription Availability:
- **Available in**: All territories
- **Cleared for Sale**: Yes

### Subscription Information:
- **Subscription Group Display Name**: Premium Access
- **Subscription Group Custom App Name**: SOFAST Global Drills Premium

---

## Step 5: Set Up Introductory Offers (Optional)

Consider offering:
- **Free Trial**: 7 days free
- **Introductory Price**: $2.99 for first month
- **Pay Up Front**: $49.99/year (save 17%)

To add:
1. Click **"Add Introductory Offer"**
2. Select offer type
3. Set duration and price

---

## Step 6: Configure Subscription Features

### Family Sharing:
- **Enable**: No (each user needs their own subscription)

### Subscription Offers:
- **Promotional Offers**: Set up codes for marketing
- **Offer Codes**: Create codes for influencers/partners

---

## Step 7: Submit for Review

1. Click **"Submit"** on the subscription
2. Subscriptions are reviewed separately from the app
3. Review time: 24-48 hours

---

## Step 8: Integrate RevenueCat (Already in Code)

Your app already has subscription service setup in:
- `services/subscriptionService.ts`

### RevenueCat Configuration:
1. Sign up at https://www.revenuecat.com
2. Create a new project
3. Add your app (Bundle ID: `com.teamsofast.sofastglobal`)
4. Configure Apple App Store:
   - Add App Store Connect API Key
   - Add Shared Secret from App Store Connect
5. Create Entitlement: `premium`
6. Create Product: `com.teamsofast.sofastglobal.premium.monthly`
7. Link product to entitlement

### Get API Keys:
- iOS API Key: Found in RevenueCat → Project Settings → API Keys
- Add to your app's environment variables

---

## Step 9: Test Subscription

### Sandbox Testing:
1. Create sandbox test account in App Store Connect
2. Go to **Users and Access** → **Sandbox Testers**
3. Click **"+"** to add tester
4. Use this account to test purchases in TestFlight

### Test Scenarios:
- ✅ Purchase subscription
- ✅ Verify premium features unlock
- ✅ Cancel subscription
- ✅ Verify features lock after cancellation
- ✅ Restore purchases
- ✅ Test on different devices

---

## Step 10: Configure Subscription Management

### In App Store Connect:
1. Go to **App Information**
2. Add **Subscription Management URL**: 
   ```
   https://apps.apple.com/account/subscriptions
   ```

### In Your App:
Users can manage subscriptions through:
- App Settings → Manage Subscription
- Links to Apple's subscription management

---

## Subscription Product IDs

Use these exact Product IDs:

```typescript
// Monthly subscription
com.teamsofast.sofastglobal.premium.monthly

// Optional: Annual subscription (better value)
com.teamsofast.sofastglobal.premium.yearly
```

---

## Pricing Recommendations

### Monthly:
- **$4.99/month** - Current plan ✅

### Annual (Optional):
- **$49.99/year** - Save $9.89 (17% off)
- Better retention and revenue

### Lifetime (Optional):
- **$99.99** - One-time purchase
- Good for dedicated users

---

## Marketing Copy for Subscription

### Short Description:
```
Unlock all 10 drills, veteran badge, and advanced features for $4.99/month
```

### Full Description:
```
PREMIUM FEATURES:
✓ All 10 Professional Drills
✓ Veteran Badge Recognition
✓ Advanced Performance Analytics
✓ Detailed Shot Analysis
✓ Priority Customer Support
✓ Early Access to New Features

FREE FEATURES:
• 3 Training Drills
• Basic Performance Tracking
• Global Leaderboards

Try 7 days free, then $4.99/month. Cancel anytime.
```

---

## App Store Review Notes

Include this in your App Store submission:

```
SUBSCRIPTION INFORMATION:
- Product: Premium Monthly Subscription
- Price: $4.99 USD/month
- Features: Unlocks 7 additional drills (10 total), veteran badge, and advanced analytics
- Free version: 3 drills available without subscription
- Subscription managed through Apple's subscription system
- Users can cancel anytime through iOS Settings

TEST ACCOUNT (if required):
Username: [test account]
Password: [test password]
Note: Premium features can be tested with sandbox account
```

---

## Common Issues & Solutions

### Issue: Subscription not unlocking features
- **Solution**: Check RevenueCat webhook configuration
- **Solution**: Verify entitlement mapping

### Issue: Restore purchases not working
- **Solution**: Implement proper restore flow in app
- **Solution**: Check RevenueCat user ID consistency

### Issue: Subscription rejected
- **Solution**: Ensure clear value proposition
- **Solution**: Make free features substantial enough
- **Solution**: Provide test account for review

---

## Post-Launch Monitoring

Track these metrics:
- **Conversion Rate**: Free → Premium
- **Churn Rate**: Monthly cancellations
- **LTV**: Lifetime value per user
- **Trial Conversion**: Free trial → paid

Use RevenueCat dashboard for analytics.

---

## Legal Requirements

### Required Disclosures:
- Price clearly displayed before purchase
- Subscription terms visible
- Auto-renewal clearly stated
- Cancellation process explained
- Privacy policy link provided

### Terms of Service:
Include in your app:
- Subscription automatically renews
- Charged to Apple ID at confirmation
- Auto-renews unless cancelled 24 hours before period ends
- Manage in iOS Settings → Apple ID → Subscriptions

---

## Next Steps

1. ✅ Create subscription in App Store Connect
2. ✅ Set up RevenueCat account
3. ✅ Configure API keys in app
4. ✅ Test with sandbox account
5. ✅ Submit subscription for review
6. ✅ Submit app for review
7. ✅ Monitor conversion rates post-launch

---

## Support Resources

- **RevenueCat Docs**: https://docs.revenuecat.com
- **Apple Subscriptions**: https://developer.apple.com/app-store/subscriptions/
- **App Store Connect**: https://appstoreconnect.apple.com

---

**Ready to monetize! 💰**
