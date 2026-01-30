
# 13" iPad Display Photo Guide for App Store Submission

## Required Screenshot Specifications

Apple requires at least one screenshot for iPad Pro (13-inch) display for App Store submission.

### 13-inch iPad Pro (6th generation) Specifications:
- **Resolution:** 2048 x 2732 pixels (portrait) or 2732 x 2048 pixels (landscape)
- **Aspect Ratio:** 3:4
- **Format:** PNG or JPEG
- **Color Space:** RGB
- **File Size:** Maximum 500 MB per screenshot

## How to Capture iPad Screenshots

### Option 1: Using Xcode Simulator (Recommended)

1. **Open Xcode** and select the iOS Simulator
2. **Choose Device:** Window → Devices and Simulators → Select "iPad Pro (13-inch)"
3. **Run Your App** in the simulator
4. **Navigate** to the screen you want to capture
5. **Take Screenshot:** 
   - Press `Cmd + S` in the simulator
   - Or: File → New Screen Shot
6. **Screenshot Location:** Screenshots are saved to your Desktop by default
7. **Verify Dimensions:** Right-click the image → Get Info → ensure it's 2048 x 2732 pixels

### Option 2: Using Physical iPad Pro 13"

1. **Connect iPad** to your Mac
2. **Run App** on the physical device via Xcode
3. **Take Screenshot:**
   - Press **Top Button + Volume Up** simultaneously
   - Screenshot appears in bottom-left corner
4. **Transfer to Mac:**
   - AirDrop to your Mac
   - Or: Connect via cable and use Image Capture app
5. **Verify Dimensions:** The screenshot should be 2048 x 2732 pixels

### Option 3: Using Design Tools (If you need to create mockups)

If you want to create promotional screenshots with text overlays:

1. **Use Figma, Sketch, or Photoshop**
2. **Create Canvas:** 2048 x 2732 pixels at 72 DPI
3. **Import Screenshot** from simulator/device
4. **Add Text/Graphics** for promotional purposes
5. **Export as PNG** at full resolution

## Best Practices for App Store Screenshots

### What to Capture:
1. **Home Screen** - Show the main drill selection interface
2. **Drill Details** - Display drill instructions and start screen
3. **Camera View** - Show the active drill recording interface
4. **Results Screen** - Display scoring and performance metrics
5. **Leaderboard** - Show global rankings and competition

### Screenshot Tips:
- Use **portrait orientation** (2048 x 2732) for consistency
- Capture screens with **real data** (not empty states)
- Show the app's **best features** prominently
- Ensure **good lighting** and clear visibility
- Use **high-quality content** (no blurry images)
- Avoid showing **personal information** in screenshots

## Required Screenshots for App Store Submission

Apple requires screenshots for different device sizes:

### Minimum Required:
- ✅ **6.9" iPhone 16 Pro Max:** 1320 x 2868 pixels
- ✅ **13" iPad Pro:** 2048 x 2732 pixels

### Recommended (for better visibility):
- 6.7" iPhone 15 Pro Max: 1290 x 2796 pixels
- 6.5" iPhone 11 Pro Max: 1242 x 2688 pixels
- 12.9" iPad Pro: 2048 x 2732 pixels

## Screenshot Naming Convention

Organize your screenshots with clear names:
```
ipad-13inch-01-home.png
ipad-13inch-02-drill-details.png
ipad-13inch-03-camera-view.png
ipad-13inch-04-results.png
ipad-13inch-05-leaderboard.png
```

## Uploading to App Store Connect

1. **Log in** to App Store Connect (appstoreconnect.apple.com)
2. **Select Your App** → App Store tab
3. **Scroll to Screenshots** section
4. **Select Device:** iPad Pro (13-inch)
5. **Drag and Drop** your screenshots (up to 10 per device)
6. **Arrange Order:** First screenshot is the primary one shown in search results
7. **Add Captions** (optional): Describe what each screenshot shows
8. **Save Changes**

## Support URL Configuration

Your app is already configured with the support URL in `app.json`:

```json
"extra": {
  "supportUrl": "https://tmsofast.com/support"
}
```

### What You Need to Do:

1. **Create Support Page** at https://tmsofast.com/support with:
   - Contact email: info@tmsofast.com
   - FAQ section
   - How to use the app
   - Subscription cancellation instructions
   - Troubleshooting tips

2. **Enter in App Store Connect:**
   - Go to App Information
   - Find "Support URL" field
   - Enter: `https://tmsofast.com/support`
   - Save changes

## Privacy Policy URL

Your app is also configured with a privacy policy URL:

```json
"extra": {
  "privacyPolicyUrl": "https://tmsofast.com/privacy"
}
```

Create a privacy policy page at https://tmsofast.com/privacy (see the in-app Submission Guide for template content).

## Quick Checklist

Before submitting to App Store:

- [ ] Captured 13" iPad screenshot (2048 x 2732 pixels)
- [ ] Captured iPhone screenshots (1320 x 2868 pixels minimum)
- [ ] Created support page at https://tmsofast.com/support
- [ ] Created privacy policy at https://tmsofast.com/privacy
- [ ] Uploaded screenshots to App Store Connect
- [ ] Entered support URL in App Store Connect
- [ ] Entered privacy policy URL in App Store Connect
- [ ] Verified all screenshots display correctly in preview

## Need Help?

- **Xcode Simulator Issues:** Make sure you have the latest Xcode version installed
- **Screenshot Dimensions Wrong:** Use Preview app on Mac to check/resize images
- **Upload Errors:** Ensure images are PNG or JPEG format, not HEIC
- **Device Not Available:** Download additional simulators in Xcode → Preferences → Components

## Resources

- [Apple Screenshot Specifications](https://developer.apple.com/help/app-store-connect/reference/screenshot-specifications)
- [App Store Connect Guide](https://developer.apple.com/app-store-connect/)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

---

**Your app is ready for submission!** Just capture the screenshots, create the support/privacy pages, and upload to App Store Connect.
