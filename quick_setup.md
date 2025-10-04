# 🚀 Quick Setup Guide - Kali Kalari Gaming Cafe

Follow these steps to get your gaming cafe app running in **under 10 minutes**!

---

## 📋 Prerequisites

- ✅ Replit account (free) - [Sign up here](https://replit.com/signup)
- ✅ Basic understanding of copy-paste 😄
- ✅ That's it!

---

## 🎯 Step-by-Step Instructions

### STEP 1: Create Your Repl (2 minutes)

1. **Go to Replit**: https://replit.com
2. **Click** "Create Repl" button (top left)
3. **Select** "Node.js" as template
4. **Name it**: `kali-kalari-app` (or any name you like)
5. **Click** "Create Repl"

✅ You now have an empty Node.js project!

---

### STEP 2: Add Database (1 minute)

1. **In Replit**, look for "Tools" in left sidebar
2. **Click** "Database"
3. **Click** "PostgreSQL"
4. **Wait** for database to initialize (30 seconds)

✅ PostgreSQL database is now ready!

---

### STEP 3: Create File Structure (3 minutes)

In your Repl, create these files:

#### A. Root Files

**Create:** `server.js`
- Click "+ New file" in file explorer
- Name it `server.js`
- Copy entire code from **"server.js - Main Backend Server"** artifact
- Paste it into the file
- Press `Ctrl+S` (or `Cmd+S` on Mac) to save

**Create:** `package.json`
- Click "+ New file"
- Name it `package.json`
- Copy code from **"package.json - Dependencies"** artifact
- Paste and save

#### B. Public Folder

**Create folder:** `public`
- Right-click in file explorer
- Select "Add folder"
- Name it `public`

**Inside public folder, create these 6 files:**

1. **`index.html`**
   - Right-click `public` folder → "Add file"
   - Name: `index.html`
   - Copy from **"public/index.html - Home Page"**

2. **`login.html`**
   - Copy from **"public/login.html - Login & Register Page"**

3. **`booking.html`**
   - Copy from **"public/booking.html - Booking System"**

4. **`lobby.html`**
   - Copy from **"public/lobby.html - Game Lobbies"**

5. **`leaderboard.html`**
   - Copy from **"public/leaderboard.html - Game Leaderboards"**

6. **`dashboard.html`**
   - Copy from **"public/dashboard.html - User Dashboard"**

✅ All files are now in place!

---

### STEP 4: Install Dependencies (1 minute)

1. **Click** on "Shell" tab in Replit (bottom panel)
2. **Type** this command:
   ```bash
   npm install
   ```
3. **Press Enter**
4. **Wait** for installation to complete (~30 seconds)

✅ All packages installed!

---

### STEP 5: Run the App (1 minute)

1. **Click** the big green "Run" button at top
2. **Wait** for server to start (~10 seconds)
3. You'll see: `🎮 Kali Kalari server running on port 3000`
4. **Click** the URL that appears in the webview (top right)

✅ Your app is LIVE! 🎉

---

## 🧪 Testing Your App

### Test 1: Registration (1 minute)

1. **Click** "Login" in navigation
2. **Click** "Register" tab
3. **Fill in:**
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
4. **Click** "Create Account"

✅ You should be redirected to dashboard!

### Test 2: Booking (1 minute)

1. **Click** "Book Slot" in navigation
2. **Select** any station (click on a card)
3. **Pick** today's date
4. **Select** duration (2 hours)
5. **Click** a time slot (e.g., 14:00)
6. **Click** "Confirm Booking"

✅ Booking successful! Check dashboard.

### Test 3: Lobby (1 minute)

1. **Click** "Lobbies" in navigation
2. **Click** "+ Create Lobby"
3. **Fill in:**
   - Game: Valorant
   - Time: Pick a future time
   - Max Players: 5
   - Skill: Any Level
4. **Click** "Create Lobby"

✅ Lobby created! You can see it in the list.

### Test 4: Leaderboard (1 minute)

1. **Click** "Leaderboard" in navigation
2. **Click** "+ Add Your Score"
3. **Fill in:**
   - Game: Valorant
   - Score: 9999
   - Achievement: "Test Run"
4. **Click** "Submit Score"

✅ Score added! You're on the leaderboard!

---

## 🎨 Customization Quick Tips

### Change Station Names
**File:** `server.js`
**Line:** ~60-65
**Change:** Station names to match your setup

### Change Pricing
**File:** `server.js`
**Line:** ~210
**Change:** `100` to your hourly rate

### Add Your Logo
**File:** `public/index.html` (and other HTML files)
**Line:** ~50
**Change:** Logo text or add `<img>` tag

### Change Colors
**Files:** All HTML files in `public/`
**Look for:** `<style>` section at top
**Change:** Color values like `#00FFFF`, `#FFD700`, etc.

---

## 🐛 Common Issues & Fixes

### Issue: "Cannot find module 'express'"
**Fix:** Run `npm install` in Shell

### Issue: "Database connection failed"
**Fix:** 
1. Go to Tools → Database
2. Make sure PostgreSQL is enabled
3. Restart the Repl

### Issue: "Login not working"
**Fix:** 
1. Open browser console (F12)
2. Check for errors
3. Clear browser cache and cookies
4. Try again

### Issue: "Port 3000 already in use"
**Fix:**
1. Stop the Repl (click Stop button)
2. Wait 5 seconds
3. Click Run again

### Issue: "Page not loading"
**Fix:**
1. Check if server is running (look for green "Running" indicator)
2. Try refreshing the page
3. Check Repl console for errors

---

## 📱 Access Your App

### From Replit
- Click the URL in webview panel
- Usually looks like: `https://kali-kalari-app.yourname.repl.co`

### Share with Others
- Copy the webview URL
- Share it with your team/customers
- They can access it from any device!

### On Mobile
- Open the same URL on your phone
- Works perfectly on mobile browsers!

---

## 🔒 Security Checklist

Before going live with real customers:

- [ ] Change JWT_SECRET in `server.js` (line 10)
- [ ] Use strong passwords for admin accounts
- [ ] Enable HTTPS (automatic on Replit)
- [ ] Review database security settings
- [ ] Test all features thoroughly
- [ ] Set up backup system
- [ ] Add your business contact info

---

## 💰 Cost Breakdown

### Replit Free Plan
- ✅ Perfect for testing
- ✅ App sleeps after inactivity
- ❌ Not suitable for 24/7 operation

### Replit Core ($20/month)
- ✅ Always-on hosting
- ✅ Custom domain
- ✅ Better performance
- ✅ Good for small cafe

### Alternative: Railway ($5/month)
- ✅ Better value
- ✅ Always-on
- ✅ Easy to set up
- ✅ Recommended for production

---

## 🎯 Next Steps

### After Setup:
1. ✅ Test all features thoroughly
2. ✅ Customize branding and colors
3. ✅ Add your real gaming stations
4. ✅ Set correct pricing
5. ✅ Create admin account
6. ✅ Train staff on the system

### Before Launch:
1. ✅ Upgrade to paid hosting plan
2. ✅ Set up custom domain (optional)
3. ✅ Add payment integration (future)
4. ✅ Set up backups
5. ✅ Print QR code for easy access
6. ✅ Announce to customers!

---

## 📞 Need Help?

### Resources:
- **Replit Docs**: https://docs.replit.com
- **Node.js Docs**: https://nodejs.org/docs
- **PostgreSQL Docs**: https://www.postgresql.org/docs

### Troubleshooting Steps:
1. Check browser console (F12)
2. Check Replit console logs
3. Review README.md file
4. Check database connection
5. Verify all files are saved

---

## 🎉 Congratulations!

You now have a fully functional gaming cafe management system!

**Features you have:**
- ✅ User registration and login
- ✅ Station booking system
- ✅ Game lobby creation
- ✅ Leaderboard tracking
- ✅ User dashboard
- ✅ Admin capabilities

**Your cafe is ready to level up! 🎮**

---

### 🌟 Pro Tips

1. **Backup regularly**: Export your database weekly
2. **Monitor usage**: Check Replit analytics
3. **Customer feedback**: Add a feedback form
4. **Social media**: Share leaderboards on Instagram
5. **Events**: Use lobby system for tournaments
6. **Loyalty**: Track user stats for rewards

---

**Made with ❤️ for Kali Kalari Gaming Cafe**

**കളി കളരി - Where Legends Train!**