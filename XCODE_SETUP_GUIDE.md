
# Xcode Setup Guide for SOFAST Global

## Game Center Entitlement Setup

### Adding Game Center Entitlement in Xcode

1. **Open Your Project in Xcode**
   - Navigate to your iOS project folder
   - Open the `.xcworkspace` file (not `.xcodeproj`)

2. **Select Your Target**
   - In the Project Navigator (left sidebar), click on your project name
   - Select your app target under "TARGETS"

3. **Add Game Center Capability**
   - Click on the "Signing & Capabilities" tab
   - Click the "+ Capability" button
   - Search for "Game Center"
   - Click to add it

4. **Verify Entitlement File**
   - The entitlement should now appear in your capabilities list
   - Xcode will automatically create/update your `.entitlements` file
   - The key `com.apple.developer.game-center` should be set to `true`

5. **Alternative: Manual Entitlements File**
   If you need to manually add it, create/edit your entitlements file:
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
   <plist version="1.0">
   <dict>
       <key>com.apple.developer.game-center</key>
       <true/>
   </dict>
   </plist>
   ```

### App Store Connect Configuration

1. **Enable Game Center in App Store Connect**
   - Log in to [App Store Connect](https://appstoreconnect.apple.com)
   - Select your app
   - Go to "Features" → "Game Center"
   - Click "Enable Game Center"

2. **Configure Leaderboards (Optional)**
   - Create leaderboards for each drill
   - Set up achievement badges
   - Configure multiplayer features if needed

---

## iPad Screenshot Requirements

### Screenshot Specifications for 13-inch iPad

Apple requires screenshots for the following iPad display sizes:

#### 13-inch iPad Pro (3rd generation) - 2048 x 2732 pixels
- **Resolution:** 2048 x 2732 pixels (portrait) or 2732 x 2048 pixels (landscape)
- **Aspect Ratio:** 4:3
- **Format:** PNG or JPEG
- **Color Space:** RGB
- **Required:** Yes (for iPad apps)

#### Additional iPad Sizes (Recommended)

1. **12.9-inch iPad Pro (6th generation)**
   - Resolution: 2048 x 2732 pixels (portrait)
   - Same as 13-inch iPad Pro

2. **11-inch iPad Pro (4th generation)**
   - Resolution: 1668 x 2388 pixels (portrait)

3. **10.5-inch iPad Pro**
   - Resolution: 1668 x 2224 pixels (portrait)

### How to Capture iPad Screenshots

#### Method 1: Using Xcode Simulator

1. **Launch iPad Simulator**
   ```bash
   # From terminal
   open -a Simulator
   ```

2. **Select iPad Device**
   - In Simulator menu: Hardware → Device → iPad Pro (13-inch)
   - Or: iPad Pro (12.9-inch) 6th generation

3. **Run Your App**
   ```bash
   npx expo run:ios
   ```

4. **Capture Screenshots**
   - Navigate to the screen you want to capture
   - Press `Cmd + S` to save screenshot
   - Screenshots are saved to Desktop by default

5. **Verify Resolution**
   - Right-click screenshot → Get Info
   - Verify dimensions match requirements (2048 x 2732)

#### Method 2: Using Physical iPad Device

1. **Connect iPad to Mac**
   - Use USB-C or Lightning cable

2. **Open Xcode**
   - Window → Devices and Simulators
   - Select your iPad

3. **Take Screenshot**
   - Click "Take Screenshot" button in Xcode
   - Or press Power + Volume Up on iPad

4. **Resize if Needed**
   - Use Preview or image editing software
   - Ensure final size is 2048 x 2732 pixels

### Screenshot Content Recommendations

For SOFAST Global app, capture these key screens:

1. **Home Screen with Drill List**
   - Shows all 10 drills
   - Displays premium badge
   - Shows Team SOFAST branding

2. **Drill Detail Screen**
   - Shows drill instructions
   - Displays scoring information
   - Shows start button

3. **Camera/Recording Screen**
   - Shows active drill recording
   - Displays timer and shot counter
   - Shows AI detection indicators

4. **Results Screen**
   - Shows completed drill results
   - Displays accuracy analysis
   - Shows classification badge

5. **Rankings/Leaderboard Screen**
   - Shows global rankings
   - Displays user's position
   - Shows division categories

6. **Profile Screen**
   - Shows baseball card profile
   - Displays user stats
   - Shows shooting divisions

### App Store Connect Upload

1. **Log in to App Store Connect**
   - Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)

2. **Navigate to Your App**
   - My Apps → SOFAST Global Drills

3. **Select Version**
   - Click on the version you're preparing

4. **Upload Screenshots**
   - Scroll to "App Previews and Screenshots"
   - Select "iPad Pro (13-inch) (3rd generation)"
   - Drag and drop your screenshots (2048 x 2732 pixels)
   - Add 3-10 screenshots per device size

5. **Add Captions (Optional)**
   - Add descriptive text for each screenshot
   - Highlight key features

---

## Testing Checklist

### Before Submission

- [ ] Game Center entitlement added in Xcode
- [ ] Game Center enabled in App Store Connect
- [ ] iPad screenshots captured (2048 x 2732 pixels)
- [ ] Screenshots show key app features
- [ ] App tested on iPad simulator
- [ ] App tested on physical iPad (if available)
- [ ] All URLs updated to tmsofast.com
- [ ] Privacy policy URL working
- [ ] Support URL working

### Build Configuration

```bash
# Clean build
npx expo prebuild --clean

# Build for iOS
eas build --platform ios --profile production

# Or local build
npx expo run:ios --configuration Release
```

---

## Troubleshooting

### Game Center Not Working

1. **Check Entitlements**
   - Verify `com.apple.developer.game-center` is `true`
   - Check signing certificate includes Game Center

2. **Check App Store Connect**
   - Ensure Game Center is enabled for your app
   - Verify bundle identifier matches

3. **Test on Device**
   - Game Center requires a real device or TestFlight
   - Simulator has limited Game Center functionality

### Screenshot Issues

1. **Wrong Resolution**
   - Use Preview to check actual pixel dimensions
   - Resize using Preview: Tools → Adjust Size

2. **File Too Large**
   - Compress using Preview: File → Export → Reduce Quality
   - Keep under 500KB per screenshot

3. **Wrong Aspect Ratio**
   - Ensure 4:3 aspect ratio for iPad
   - Crop or resize to exact dimensions

---

## Quick Reference

### Key URLs
- Privacy Policy: https://tmsofast.com/privacy
- Marketing URL: https://tmsofast.com
- Support URL: https://tmsofast.com/support

### Bundle Identifier
```
com.teamsofast.sofastglobal
```

### Game Center Entitlement Key
```
com.apple.developer.game-center
```

### iPad Screenshot Dimensions
```
2048 x 2732 pixels (portrait)
2732 x 2048 pixels (landscape)
```

---

## Contact

For questions or issues:
- Email: patch@tmsofast.com
- Website: https://tmsofast.com
