# 🎮 Kali Kalari Gaming Cafe Management System

A complete full-stack web application for managing gaming cafe operations including booking, lobby creation, and leaderboards.

## 🌟 Features

### ✅ User Authentication
- User registration and login with JWT tokens
- Secure password hashing with bcrypt
- Profile management with gaming preferences

### 📅 Booking System
- Real-time station availability checking
- Hourly booking slots (10 AM - 12 AM)
- 5 premium gaming stations with detailed specs
- Booking confirmation with unique codes
- User booking history and management

### 👥 Game Lobby System
- Create public/private game lobbies
- Join existing lobbies
- Real-time player count and status
- Lobby filtering by game, skill level, and time
- Support for popular games (Valorant, FIFA, WWE, etc.)

### 🏆 Leaderboard System
- Track top scores for each game
- User-specific best scores
- Rank tracking and achievements
- Support for 10+ popular games
- Add and view scores with achievements

### 📊 User Dashboard
- Personal gaming statistics
- Booking history and upcoming sessions
- Best scores across all games
- Quick access to all features

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express.js
- PostgreSQL database
- JWT authentication
- bcrypt for password hashing

**Frontend:**
- Vanilla HTML/CSS/JavaScript
- Modern responsive design
- Gradient and neon aesthetic
- Mobile-friendly interface

## 📁 Project Structure

```
kali-kalari-app/
├── server.js              # Main backend server
├── package.json           # Dependencies
├── public/                # Frontend files
│   ├── index.html        # Home page
│   ├── login.html        # Login/Register page
│   ├── booking.html      # Booking system
│   ├── lobby.html        # Game lobbies
│   ├── leaderboard.html  # Leaderboard
│   └── dashboard.html    # User dashboard
└── README.md             # This file
```

## 🚀 Setup Instructions for Replit

### Step 1: Create New Repl
1. Go to [Replit](https://replit.com)
2. Click "Create Repl"
3. Select "Node.js" as the template
4. Name it "kali-kalari-app"

### Step 2: Add Files
Create the following files and copy the code from the artifacts:

**Root files:**
1. `server.js` - Copy from "server.js - Main Backend Server"
2. `package.json` - Copy from "package.json - Dependencies"
3. `README.md` - This file

**Create `public` folder and add:**
1. `public/index.html` - Copy from "public/index.html - Home Page"
2. `public/login.html` - Copy from "public/login.html - Login & Register Page"
3. `public/booking.html` - Copy from "public/booking.html - Booking System"
4. `public/lobby.html` - Copy from "public/lobby.html - Game Lobbies"
5. `public/leaderboard.html` - Copy from "public/leaderboard.html - Game Leaderboards"
6. `public/dashboard.html` - Copy from "public/dashboard.html - User Dashboard"

### Step 3: Setup Database
1. In Replit, go to "Tools" → "Database"
2. Click "PostgreSQL" to add a PostgreSQL database
3. Replit will automatically set `DATABASE_URL` environment variable

### Step 4: Install Dependencies
In the Replit Shell, run:
```bash
npm install
```

This will install:
- express
- pg (PostgreSQL)
- bcrypt
- jsonwebtoken
- cors

### Step 5: Run the Application
Click the "Run" button in Replit, or in the Shell:
```bash
npm start
```

The application will:
- Start on port 3000
- Automatically create database tables
- Insert 5 default gaming stations
- Be accessible via the Replit webview URL

### Step 6: Test the Application
1. Click the webview URL (looks like: `https://your-repl-name.username.repl.co`)
2. Register a new account
3. Try booking a slot
4. Create a game lobby
5. Add scores to leaderboard

## 🎮 Gaming Stations

The app comes with 5 pre-configured stations:

1. **Bekal Station** - RTX 4080, i9-13900K, 32GB RAM, 240Hz Monitor
2. **Mattancherry Station** - RTX 4070, i7-13700K, 32GB RAM, 165Hz Monitor
3. **Padmanabha Station** - RTX 4060 Ti, Ryzen 7 7800X3D, 16GB RAM, 144Hz Monitor
4. **Athirapally Station** - RTX 4060, i5-13600K, 16GB RAM, 144Hz Monitor
5. **Munnar Station** - RTX 3060, Ryzen 5 5600X, 16GB RAM, 144Hz Monitor

## 🎯 Supported Games

- Valorant
- FC 24 (FIFA)
- WWE 2K24
- Mortal Kombat
- COD Warzone
- PUBG
- GTA V Online
- Rocket League
- Counter-Strike 2
- Dota 2
- Fortnite

## 💰 Pricing

- **Hourly Rate:** ₹100 per hour
- Bookings available from 10 AM to 12 AM daily
- Minimum 1 hour, maximum 6 hours per booking

## 🔐 Environment Variables

The app uses these environment variables (set automatically by Replit):

- `DATABASE_URL` - PostgreSQL connection string (auto-set by Replit)
- `JWT_SECRET` - Secret key for JWT tokens (defaults to development key)
- `PORT` - Server port (defaults to 3000)
- `NODE_ENV` - Environment (production/development)

**⚠️ For Production:** Change the JWT_SECRET in server.js or set it as an environment variable!

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Bookings
- `GET /api/stations` - Get all stations
- `GET /api/slots/available?date=YYYY-MM-DD&station_id=X` - Get available slots
- `POST /api/bookings` - Create booking (requires auth)
- `GET /api/bookings/my` - Get user's bookings (requires auth)

### Lobbies
- `GET /api/lobbies` - Get all active lobbies
- `POST /api/lobbies` - Create lobby (requires auth)
- `POST /api/lobbies/:id/join` - Join lobby (requires auth)
- `GET /api/lobbies/:id/members` - Get lobby members

### Leaderboard
- `GET /api/leaderboard/:game` - Get leaderboard for specific game
- `GET /api/leaderboard` - Get all games with leaderboards
- `POST /api/leaderboard` - Add score (requires auth)
- `GET /api/leaderboard/user/best` - Get user's best scores (requires auth)

### Admin (requires auth)
- `GET /api/admin/bookings` - Get all bookings

## 🎨 Color Scheme

- **Primary:** Cyan (#00FFFF), Purple (#9D00FF), Hot Pink (#FF1493)
- **Secondary:** Gold (#FFD700), Crimson Red (#8B0000)
- **Background:** Dark Charcoal (#0D0D0D, #1A1A1A)
- **Accents:** Neon Green (#00FF00), Orange (#FF8C00)

## 🔧 Customization

### Add More Stations
In `server.js`, modify the `initDatabase()` function to add more stations:

```javascript
INSERT INTO stations (station_name, specs, status) VALUES
('Your Station Name', 'RTX 4090, i9-14900K, 64GB RAM', 'available')
```

### Add More Games
Update the game lists in:
- `public/lobby.html` (line ~200)
- `public/leaderboard.html` (line ~250)

### Change Pricing
In `server.js`, modify line in booking route:
```javascript
const total_price = duration_hours * 100; // Change 100 to your price per hour
```

### Modify Operating Hours
In `public/booking.html`, change the slot generation:
```javascript
// Currently: 10 AM to 12 AM (midnight)
for (let hour = 10; hour < 24; hour++) {
  // Change these numbers to modify hours
}
```

## 🐛 Troubleshooting

### Database Connection Error
- Make sure PostgreSQL is enabled in Replit Tools → Database
- Check if `DATABASE_URL` is set in Environment Variables

### "Module not found" Error
- Run `npm install` in the Shell
- Check if all dependencies are listed in package.json

### Login/Register Not Working
- Check browser console for errors
- Verify JWT_SECRET is set
- Check database tables are created

### Bookings Not Showing
- Ensure user is logged in (check localStorage for token)
- Check browser console for API errors
- Verify PostgreSQL database is running

### Port Already in Use
- Stop other running processes
- Change PORT in server.js or environment variables

## 🚀 Deployment Options

### Replit (Easiest)
1. Use Replit's "Always On" feature (paid)
2. Custom domain: Replit Core plan required
3. Good for: Prototypes, testing, small cafes

### Railway.app ($5/month)
1. Connect GitHub repository
2. Add PostgreSQL add-on
3. Deploy automatically
4. Good for: Production, better performance

### DigitalOcean/Linode ($5-10/month)
1. Create VPS droplet
2. Install Node.js and PostgreSQL
3. Clone repository and run
4. Good for: Full control, scalability

### Vercel/Netlify (Frontend) + Railway (Backend)
1. Deploy frontend to Vercel (free)
2. Deploy backend to Railway ($5)
3. Update API_URL in frontend files
4. Good for: Best performance

## 📊 Database Schema

### Users Table
```sql
id, username, email, password_hash, phone, gaming_preferences, created_at
```

### Stations Table
```sql
id, station_name, specs, status, created_at
```

### Bookings Table
```sql
id, user_id, station_id, booking_date, start_time, end_time, 
duration_hours, total_price, status, booking_code, created_at
```

### Lobbies Table
```sql
id, creator_id, game_name, slot_time, max_players, current_players, 
skill_level, status, lobby_code, description, created_at
```

### Lobby_Members Table
```sql
id, lobby_id, user_id, joined_at
```

### Leaderboard Table
```sql
id, user_id, game_name, score, rank, achievement, recorded_at
```

## 🎯 Future Enhancements

### Potential Features to Add:
- [ ] Payment integration (Razorpay/Stripe)
- [ ] Email/SMS notifications for bookings
- [ ] Loyalty points and rewards system
- [ ] Tournament management
- [ ] Food/beverage ordering
- [ ] Real-time chat in lobbies
- [ ] Booking cancellation and refunds
- [ ] Admin panel for analytics
- [ ] Google Sheets auto-sync (already prepared in backend)
- [ ] Mobile app (React Native)
- [ ] Membership plans
- [ ] Social media integration
- [ ] Stream integration (Twitch/YouTube)

### Google Sheets Integration (Planned)
The backend has placeholder for Google Sheets API. To implement:
1. Get Google Sheets API credentials
2. Install googleapis npm package
3. Add sync logic in booking routes
4. Store GOOGLE_SHEETS_API_KEY in environment

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review browser console for errors
3. Check Replit logs in the Console tab
4. Verify all files are correctly copied

## 📝 License

This project is created for Kali Kalari Gaming Cafe. Feel free to modify and customize for your needs.

## 🎮 Credits

Built with ❤️ for gamers by gamers

**Kali Kalari (കളി കളരി)** - Where Legends Train

---

## 🚀 Quick Start Checklist

- [ ] Create Replit account
- [ ] Create new Node.js Repl
- [ ] Copy all files from artifacts
- [ ] Enable PostgreSQL database
- [ ] Run `npm install`
- [ ] Click Run button
- [ ] Test registration
- [ ] Test booking
- [ ] Test lobby creation
- [ ] Test leaderboard
- [ ] Customize stations and pricing
- [ ] Add your logo/branding
- [ ] Deploy to production!

**Your gaming cafe management system is ready! 🎉**

Visit your Repl URL and start managing your gaming cafe like a pro!