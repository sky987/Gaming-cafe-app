# 🚀 Render.com Setup Guide - Kali Kalari Gaming Cafe

Complete guide to deploy your gaming cafe app on Render.com with your PostgreSQL database.

---

## 📋 What You Have

Your PostgreSQL database is already set up on Render with these details:
- **Host:** dpg-d3gbkhe3jp1c73ekcc6g-a
- **Port:** 5432
- **Database:** gaming_cafe_db
- **Username:** gaming_cafe_db_user
- **Password:** piW9i4rqIZ65bCFyD3q941433Nun04yR

---

## 🎯 Step-by-Step Deployment

### STEP 1: Prepare Your Files Locally (5 minutes)

1. **Create a folder** on your computer: `kali-kalari-app`

2. **Create these files** inside the folder:

```
kali-kalari-app/
├── server.js
├── package.json
├── public/
│   ├── index.html
│   ├── login.html
│   ├── booking.html
│   ├── lobby.html
│   ├── leaderboard.html
│   └── dashboard.html
└── README.md
```

3. **Copy-paste code** from all the artifacts I provided earlier into these files

---

### STEP 2: Upload to GitHub (10 minutes)

#### Option A: Using GitHub Website (Easier)

1. **Go to** https://github.com and login (or create account)

2. **Click** "New repository" (green button)

3. **Fill in:**
   - Repository name: `kali-kalari-app`
   - Description: Gaming Cafe Management System
   - ✅ Public (so Render can access)
   - ✅ Add README file
   - Click "Create repository"

4. **Upload files:**
   - Click "Add file" → "Upload files"
   - Drag all your files (server.js, package.json, public folder)
   - Click "Commit changes"

#### Option B: Using Git Command Line (Advanced)

```bash
# In your kali-kalari-app folder
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kali-kalari-app.git
git push -u origin main
```

---

### STEP 3: Deploy on Render.com (5 minutes)

1. **Go to** https://render.com

2. **Sign up/Login** (use GitHub to login - easier!)

3. **Click** "New +" button (top right) → "Web Service"

4. **Connect GitHub repository:**
   - Click "Connect account" if first time
   - Find `kali-kalari-app` repository
   - Click "Connect"

5. **Configure the service:**

   **Name:** `kali-kalari-app`
   
   **Region:** Select closest to India (Singapore or Frankfurt)
   
   **Branch:** `main`
   
   **Root Directory:** Leave empty
   
   **Runtime:** `Node`
   
   **Build Command:**
   ```bash
   npm install
   ```
   
   **Start Command:**
   ```bash
   node server.js
   ```
   
   **Instance Type:** `Free`

6. **Add Environment Variables** (IMPORTANT!):

   Click "Advanced" → "Add Environment Variable"
   
   Add these one by one:

   ```
   PGHOST=dpg-d3gbkhe3jp1c73ekcc6g-a
   PGPORT=5432
   PGDATABASE=gaming_cafe_db
   PGUSER=gaming_cafe_db_user
   PGPASSWORD=piW9i4rqIZ65bCFyD3q941433Nun04yR
   JWT_SECRET=kali-kalari-secret-2025-change-this-to-random-string
   NODE_ENV=production
   ```

7. **Click** "Create Web Service"

8. **Wait** for deployment (~3-5 minutes)
   - You'll see logs building your app
   - When done, status will show "Live" 🟢

---

### STEP 4: Initialize Database (2 minutes)

Your app will automatically create tables on first run, but let's verify:

1. **Open your app URL** (shown on Render dashboard)
   - Will look like: `https://kali-kalari-app.onrender.com`

2. **Check logs** in Render dashboard:
   - Should see: "Database initialized successfully"
   - Should see: "🎮 Kali Kalari server running on port 3000"

3. **If you see errors:**
   - Check environment variables are correct
   - Verify PostgreSQL is running
   - Check logs for specific error messages

---

### STEP 5: Test Your App (5 minutes)

1. **Open your app URL** in browser

2. **Register a test account:**
   - Click "Login"
   - Click "Register" tab
   - Create account: test@test.com / password123

3. **Test booking:**
   - Go to "Book Slot"
   - Select a station
   - Pick date and time
   - Confirm booking

4. **Test lobby:**
   - Go to "Lobbies"
   - Create a new lobby
   - Join it

5. **Test leaderboard:**
   - Go to "Leaderboard"
   - Add a score
   - View rankings

✅ Everything working? You're LIVE! 🎉

---

## 🔧 Important Configuration

### Database Connection String

If you prefer using a single DATABASE_URL instead of separate variables, you can use:

```
DATABASE_URL=postgresql://gaming_cafe_db_user:piW9i4rqIZ65bCFyD3q941433Nun04yR@dpg-d3gbkhe3jp1c73ekcc6g-a:5432/gaming_cafe_db
```

**To use this:**
1. In Render, go to Environment Variables
2. Remove individual PGHOST, PGPORT, etc.
3. Add one variable: `DATABASE_URL` with above value
4. Update server.js to use:
```javascript
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
```

---

## 🌐 Custom Domain (Optional)

### Free Subdomain
Your app comes with: `https://kali-kalari-app.onrender.com`

### Custom Domain (Your own domain)
1. Buy domain from Namecheap/GoDaddy (~₹500/year)
2. In Render dashboard, go to "Settings"
3. Click "Add Custom Domain"
4. Follow DNS setup instructions
5. Your app will be at: `https://kalikalari.com`

---

## 🔒 Security Checklist

Before going live:

- [x] ✅ Database connection uses SSL
- [x] ✅ Passwords are hashed
- [ ] ⚠️ Change JWT_SECRET to random string
- [ ] ⚠️ Don't share database credentials
- [ ] ⚠️ Enable 2FA on Render account
- [ ] ⚠️ Regular backups of database

**Generate secure JWT_SECRET:**
```bash
# On Mac/Linux
openssl rand -base64 32

# Or use any random string generator online
```

---

## 💾 Database Backup

### Manual Backup (Recommended Weekly)

1. **Go to Render dashboard**
2. **Click** on your PostgreSQL database
3. **Click** "Backups" tab
4. **Click** "Create Manual Backup"
5. **Download** backup file

### Automated Backups
- Render automatically backs up daily (on paid plan)
- Free tier: Manual backups only

---

## 📊 Monitoring

### Check App Health
1. **Render Dashboard** → Your service
2. **Metrics** tab shows:
   - Request count
   - Response times
   - Memory usage
   - CPU usage

### View Logs
1. **Render Dashboard** → Your service
2. **Logs** tab shows:
   - All server logs
   - Database queries
   - Errors and warnings
   - User activity

### Set Up Alerts (Optional)
1. **Render Dashboard** → Settings
2. **Notifications** → Add email
3. Get notified if app goes down

---

## 🐛 Troubleshooting

### Issue: "Service Unavailable"
**Fix:**
- Check logs in Render dashboard
- Verify environment variables
- Check if database is running
- Try restarting the service

### Issue: "Database connection failed"
**Fix:**
- Verify all PGHOST, PGPORT, etc. are correct
- Check database is not paused
- Ensure SSL is enabled in pool config

### Issue: "Cannot find module"
**Fix:**
- Check package.json has all dependencies
- Trigger manual deploy
- Check build logs for errors

### Issue: "JWT token invalid"
**Fix:**
- Clear browser localStorage
- Logout and login again
- Check JWT_SECRET is set correctly

### Issue: "Slow response times"
**Fix:**
- Render free tier spins down after inactivity
- First request after sleep takes ~30 seconds
- Upgrade to paid tier ($7/month) for always-on

---

## 💰 Render.com Pricing

### Free Tier (What you have)
- ✅ 750 hours/month free
- ✅ Auto-sleep after 15 min inactivity
- ✅ Perfect for testing
- ✅ 1 PostgreSQL database
- ⚠️ Slow cold starts

### Starter Tier ($7/month)
- ✅ Always-on (no sleep)
- ✅ Faster performance
- ✅ More resources
- ✅ Better for production
- ✅ Custom domains included

**Recommendation:** Start free, upgrade when you have paying customers!

---

## 🔄 Updating Your App

### After Making Changes:

#### Method 1: GitHub Push (Automatic)
```bash
# Make changes to your code
git add .
git commit -m "Updated features"
git push

# Render automatically detects and redeploys!
```

#### Method 2: Manual Deploy
1. Go to Render dashboard
2. Click "Manual Deploy"
3. Select branch: main
4. Click "Deploy"

---

## 📱 Mobile App Setup (Bonus)

Want to add your app to home screen like a native app?

The app is already PWA-ready! Users can:
1. Open your URL in mobile browser
2. Click "Add to Home Screen"
3. Use it like an app!

---

## 🎯 Performance Tips

### Speed Up Your App:
1. **Enable caching** (add to server.js)
2. **Compress responses** (add gzip middleware)
3. **Optimize images** (if you add any)
4. **Database indexing** (already done!)
5. **CDN for static files** (future upgrade)

### Monitor Performance:
- Render Metrics dashboard
- Response time should be < 500ms
- Memory usage < 256MB
- CPU < 50%

---

## 🌟 Going Live Checklist

Before announcing to customers:

- [ ] ✅ App deployed and accessible
- [ ] ✅ Database working correctly
- [ ] ✅ All features tested thoroughly
- [ ] ✅ Custom domain set up (optional)
- [ ] ✅ SSL certificate active (automatic)
- [ ] ✅ Backups configured
- [ ] ✅ Staff trained on system
- [ ] ✅ Emergency contact set up
- [ ] ✅ Payment integration ready (future)
- [ ] ✅ Terms & conditions added

---

## 📞 Support Resources

### Render.com Help:
- Docs: https://render.com/docs
- Community: https://community.render.com
- Status: https://status.render.com

### Your App Issues:
- Check server logs first
- Review environment variables
- Test database connection
- Check browser console (F12)

---

## 🎉 Success! What's Next?

Your app is now LIVE at: `https://kali-kalari-app.onrender.com`

**Next Steps:**
1. ✅ Share URL with your team
2. ✅ Test with real bookings
3. ✅ Get customer feedback
4. ✅ Customize branding
5. ✅ Add payment integration (future)
6. ✅ Set up social media
7. ✅ Launch marketing campaign!

---

**Made with ❤️ for Kali Kalari Gaming Cafe**

**കളി കളരി - Where Legends Train!**

---

## 🔗 Quick Links

- **Your App:** https://kali-kalari-app.onrender.com
- **Render Dashboard:** https://dashboard.render.com
- **Database:** (Check Render dashboard)
- **GitHub Repo:** https://github.com/YOUR_USERNAME/kali-kalari-app

**Need help? Check the logs first, then troubleshooting section above!** 🚀