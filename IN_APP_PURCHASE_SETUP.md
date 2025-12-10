
# 🛒 Setting Up In-App Purchases for SOFAST Global

Your app has a freemium model:
- **Free:** 3 drills
- **Premium:** $4.99/month - All 10 drills + veteran badge

Here's how to set up the subscription in App Store Connect.

---

## Step 1: Create In-App Purchase in App Store Connect

1. Go to https://appstoreconnect.apple.com/
2. Select your app "SOFAST Global"
3. Click on "In-App Purchases" in the left sidebar
4. Click the "+" button to create a new In-App Purchase

---

## Step 2: Choose Subscription Type

Select **"Auto-Renewable Subscription"**

This allows users to subscribe monthly and auto-renew until they cancel.

---

## Step 3: Create Subscription Group

1. Click "Create Subscription Group"
2. **Subscription Group Reference Name:** SOFAST Premium
3. Click "Create"

---

## Step 4: Configure Subscription

### Reference Name
```
SOFAST Premium Monthly
```

### Product ID
```
com.teamsofast.sofastglobal.premium.monthly
```
**Important:** This must match the product ID in your app code!

### Subscription Duration
```
1 Month
```

### Subscription Prices
1. Click "Add Subscription Price"
2. Select your base country (e.g., United States)
3. Enter price: **$4.99**
4. Click "Next"
5. Review prices for other countries (Apple auto-converts)
6. Click "Create"

---

## Step 5: Localization

Add at least one localization (English - US):

**Display Name:**
```
SOFAST Premium
```

**Description:**
```
Unlock all 10 professional shooting drills, global leaderboards, and exclusive veteran badge. Perfect for serious competitive shooters.
```

---

## Step 6: Review Information

### Screenshot for Review
Upload a screenshot showing what users get with the subscription:
- List of all 10 drills
- Leaderboard access
- Veteran badge

### Review Notes
```
This subscription unlocks all premium features in SOFAST Global:
- Access to all 10 shooting drills (free users get 3)
- Global leaderboard participation
- Veteran badge for profile

The subscription can be tested using a sandbox test account.
```

---

## Step 7: App Store Information

### Subscription Display Name
```
SOFAST Premium
```

### Description
```
Unlock all 10 professional shooting drills, compete on global leaderboards, and earn your veteran badge. Train like a pro with unlimited access to El Presidente, Mozambique, Bill Drill, FAST, and more.
```

### Features (bullet points)
```
• All 10 Professional Drills
• Global Leaderboard Access
• Veteran Badge
• Unlimited Practice Sessions
• Advanced Performance Analytics
• Priority Support
```

---

## Step 8: Subscription Benefits (Optional)

You can add promotional images and benefits that appear in the App Store:

1. **Benefit 1:** "Access All Drills"
2. **Benefit 2:** "Compete Globally"
3. **Benefit 3:** "Track Your Progress"

---

## Step 9: Free Trial (Optional)

You can offer a free trial:

1. Click "Add Free Trial"
2. Select duration: 7 days (recommended)
3. Users get full access for 7 days before being charged

**Pros:**
- Higher conversion rate
- Users can try before buying

**Cons:**
- Some users may cancel before being charged

---

## Step 10: Introductory Offer (Optional)

You can offer a discounted first month:

Example: **$0.99 for the first month, then $4.99/month**

1. Click "Add Introductory Offer"
2. Select "Pay As You Go"
3. Duration: 1 month
4. Price: $0.99

---

## Step 11: Promotional Offers (Optional)

Create offers for:
- Win-back (users who canceled)
- Upgrade (free users)
- Retention (existing subscribers)

Example: **"Get 1 month free - Limited time offer!"**

---

## Step 12: Submit for Review

1. Click "Submit" on your In-App Purchase
2. It will be reviewed along with your app
3. Approval usually takes 24-48 hours

---

## Step 13: Testing with Sandbox

### Create Sandbox Test Account

1. Go to App Store Connect
2. Click "Users and Access"
3. Click "Sandbox Testers"
4. Click "+" to add a tester
5. Fill in details:
   - Email: test@example.com (use a unique email)
   - Password: TestPass123!
   - First/Last Name: Test User
   - Country: United States

### Test on Device

1. Sign out of your real Apple ID on your test device
2. Install your app via TestFlight or development build
3. Try to purchase the subscription
4. Sign in with your sandbox test account when prompted
5. The purchase will be simulated (no real charge)
6. Verify that premium features unlock

**Sandbox Testing Tips:**
- Subscriptions renew every 5 minutes (not monthly) for testing
- You can cancel and resubscribe multiple times
- Receipts are generated for validation

---

## Step 14: Implement in Your App

You'll need to add code to handle the subscription. Here's the product ID to use:

```typescript
const PREMIUM_PRODUCT_ID = 'com.teamsofast.sofastglobal.premium.monthly';
```

### Using RevenueCat (Recommended)

RevenueCat simplifies subscription management:

1. Sign up at https://www.revenuecat.com/
2. Create a project
3. Add your App Store Connect credentials
4. Configure your product ID
5. Integrate RevenueCat SDK in your app

### Using Native StoreKit

If you prefer native implementation:
- Use `expo-in-app-purchases` or `react-native-iap`
- Handle receipt validation
- Manage subscription state
- Handle renewals and cancellations

---

## Step 15: Subscription Management

### User Management
Users can manage their subscription in:
- Settings → Apple ID → Subscriptions
- Or provide a link in your app: `https://apps.apple.com/account/subscriptions`

### Cancellation
- Users can cancel anytime
- They keep access until the end of the billing period
- No refunds for partial periods

### Renewal
- Auto-renews 24 hours before expiration
- Users are charged automatically
- Notify users before renewal (optional but recommended)

---

## 📊 Subscription Analytics

Track these metrics in App Store Connect:

- **Subscribers:** Total active subscribers
- **Conversion Rate:** Free to paid conversion
- **Churn Rate:** Users who cancel
- **Revenue:** Monthly recurring revenue (MRR)
- **Trial Conversion:** Users who convert after trial

---

## 💡 Best Practices

### 1. Clear Value Proposition
Show users exactly what they get:
- List all 10 drills by name
- Show leaderboard preview
- Highlight veteran badge

### 2. Paywall Placement
Show paywall when users:
- Try to access a locked drill (4th drill onwards)
- Try to view global leaderboards
- Try to access veteran features

### 3. Restore Purchases
Always provide a "Restore Purchases" button for users who:
- Reinstall the app
- Switch devices
- Had a purchase issue

### 4. Subscription Status
Show subscription status in profile:
- "Free Plan - 3 Drills"
- "Premium - All Drills Unlocked"
- "Expires on: [date]"

### 5. Cancellation Flow
Make it easy to cancel but:
- Ask for feedback (why are you canceling?)
- Offer alternatives (pause subscription, downgrade)
- Remind them what they'll lose

---

## 🚨 Common Issues

### Issue 1: "Cannot connect to iTunes Store"
- Check sandbox account is signed in
- Verify product ID matches exactly
- Ensure In-App Purchase is approved

### Issue 2: "This In-App Purchase has already been bought"
- Use "Restore Purchases" button
- Clear sandbox account purchase history
- Try a different sandbox account

### Issue 3: Receipt validation fails
- Verify you're using the correct validation endpoint
- Check receipt is being sent correctly
- Ensure server-side validation is working

### Issue 4: Subscription doesn't unlock features
- Verify receipt validation is working
- Check subscription status is being stored correctly
- Ensure app checks subscription on launch

---

## 📱 Product ID Reference

Use this exact product ID in your code:

```typescript
// services/subscriptionService.ts

export const SUBSCRIPTION_PRODUCTS = {
  PREMIUM_MONTHLY: 'com.teamsofast.sofastglobal.premium.monthly',
};

export const FREE_DRILL_IDS = [
  'el-presidente',
  'mozambique',
  'dot-torture',
];

export const PREMIUM_DRILL_IDS = [
  'bill-drill',
  'fast',
  '1-5-1',
  'hackathorn-standards',
  'failure-drill',
  'walk-back',
  '5x5',
];
```

---

## 🔗 Useful Links

- **App Store Connect:** https://appstoreconnect.apple.com/
- **In-App Purchase Documentation:** https://developer.apple.com/in-app-purchase/
- **RevenueCat:** https://www.revenuecat.com/
- **Expo In-App Purchases:** https://docs.expo.dev/versions/latest/sdk/in-app-purchases/
- **Testing Guide:** https://developer.apple.com/documentation/storekit/in-app_purchase/testing_in-app_purchases

---

## ✅ Checklist

Before submitting your app:

- [ ] In-App Purchase created in App Store Connect
- [ ] Product ID matches in code: `com.teamsofast.sofastglobal.premium.monthly`
- [ ] Subscription tested with sandbox account
- [ ] Paywall implemented in app
- [ ] Restore Purchases button added
- [ ] Subscription status displayed in profile
- [ ] Receipt validation working
- [ ] Free drills accessible without subscription
- [ ] Premium drills locked for free users
- [ ] Subscription unlocks all features
- [ ] Cancellation flow tested
- [ ] Privacy policy mentions subscriptions
- [ ] App Store description mentions pricing

---

Good luck with your subscription setup! 💰
