const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'kali-kalari-secret-2025-change-in-production';

// PostgreSQL connection for Render.com
/*const pool = new Pool({
  host: process.env.PGHOST || 'dpg-d3gbkhe3jp1c73ekcc6g-a',
  port: process.env.PGPORT || 5432,
  database: process.env.PGDATABASE || 'gaming_cafe_db',
  user: process.env.PGUSER || 'gaming_cafe_db_user',
  password: process.env.PGPASSWORD || 'piW9i4rqIZ65bCFyD3q941433Nun04yR',
  ssl: {
    rejectUnauthorized: false
  }
});*/

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize Database Tables
async function initDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        gaming_preferences TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS stations (
        id SERIAL PRIMARY KEY,
        station_name VARCHAR(100) NOT NULL,
        specs TEXT,
        status VARCHAR(20) DEFAULT 'available',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        station_id INTEGER REFERENCES stations(id),
        booking_date DATE NOT NULL,
        start_time TIME NOT NULL,
        end_time TIME NOT NULL,
        duration_hours DECIMAL(3,1),
        total_price DECIMAL(10,2),
        status VARCHAR(20) DEFAULT 'confirmed',
        booking_code VARCHAR(50) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS lobbies (
        id SERIAL PRIMARY KEY,
        creator_id INTEGER REFERENCES users(id),
        game_name VARCHAR(100) NOT NULL,
        slot_time TIMESTAMP NOT NULL,
        max_players INTEGER DEFAULT 5,
        current_players INTEGER DEFAULT 1,
        skill_level VARCHAR(50),
        status VARCHAR(20) DEFAULT 'open',
        lobby_code VARCHAR(50) UNIQUE,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS lobby_members (
        id SERIAL PRIMARY KEY,
        lobby_id INTEGER REFERENCES lobbies(id) ON DELETE CASCADE,
        user_id INTEGER REFERENCES users(id),
        joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(lobby_id, user_id)
      );

      CREATE TABLE IF NOT EXISTS leaderboard (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        game_name VARCHAR(100) NOT NULL,
        score INTEGER NOT NULL,
        rank INTEGER,
        achievement VARCHAR(255),
        recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
      CREATE INDEX IF NOT EXISTS idx_lobbies_status ON lobbies(status);
      CREATE INDEX IF NOT EXISTS idx_leaderboard_game ON leaderboard(game_name, score DESC);
    `);

    // Insert default stations if none exist
    const stationsCheck = await pool.query('SELECT COUNT(*) FROM stations');
    if (parseInt(stationsCheck.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO stations (station_name, specs, status) VALUES
        ('Bekal Station', 'RTX 4080, i9-13900K, 32GB RAM, 240Hz Monitor', 'available'),
        ('Mattancherry Station', 'RTX 4070, i7-13700K, 32GB RAM, 165Hz Monitor', 'available'),
        ('Padmanabha Station', 'RTX 4060 Ti, Ryzen 7 7800X3D, 16GB RAM, 144Hz Monitor', 'available'),
        ('Athirapally Station', 'RTX 4060, i5-13600K, 16GB RAM, 144Hz Monitor', 'available'),
        ('Munnar Station', 'RTX 3060, Ryzen 5 5600X, 16GB RAM, 144Hz Monitor', 'available')
      `);
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// ============= AUTH ROUTES =============

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, phone, gaming_preferences } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash, phone, gaming_preferences) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email',
      [username, email, hashedPassword, phone, gaming_preferences]
    );

    const token = jwt.sign({ id: result.rows[0].id, username: result.rows[0].username }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ message: 'Registration successful', user: result.rows[0], token });
  } catch (error) {
    if (error.code === '23505') {
      res.status(400).json({ error: 'Username or email already exists' });
    } else {
      res.status(500).json({ error: 'Registration failed' });
    }
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      user: { id: user.id, username: user.username, email: user.email },
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// ============= BOOKING ROUTES =============

// Get available stations
app.get('/api/stations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM stations ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stations' });
  }
});

// Get available slots for a date and station
app.get('/api/slots/available', async (req, res) => {
  try {
    const { date, station_id } = req.query;

    const bookings = await pool.query(
      'SELECT start_time, end_time FROM bookings WHERE booking_date = $1 AND station_id = $2 AND status = $3',
      [date, station_id, 'confirmed']
    );

    // Generate available slots (10 AM to 12 AM)
    const allSlots = [];
    for (let hour = 10; hour < 24; hour++) {
      allSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    }

    const bookedSlots = bookings.rows.map(b => b.start_time.substring(0, 5));
    const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));

    res.json({ availableSlots });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch available slots' });
  }
});

// Create booking
app.post('/api/bookings', authenticateToken, async (req, res) => {
  try {
    const { station_id, booking_date, start_time, duration_hours } = req.body;
    const user_id = req.user.id;

    // Calculate end time and price
    const startHour = parseInt(start_time.split(':')[0]);
    const endHour = startHour + duration_hours;
    const end_time = `${endHour.toString().padStart(2, '0')}:00`;
    const total_price = duration_hours * 100; // ₹100 per hour
    const booking_code = `KB${Date.now()}`;

    const result = await pool.query(
      `INSERT INTO bookings (user_id, station_id, booking_date, start_time, end_time, duration_hours, total_price, booking_code)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [user_id, station_id, booking_date, start_time, end_time, duration_hours, total_price, booking_code]
    );

    res.json({ message: 'Booking created successfully', booking: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Get user bookings
app.get('/api/bookings/my', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT b.*, s.station_name, s.specs 
       FROM bookings b 
       JOIN stations s ON b.station_id = s.id 
       WHERE b.user_id = $1 
       ORDER BY b.booking_date DESC, b.start_time DESC`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// ============= LOBBY ROUTES =============

// Get all active lobbies
app.get('/api/lobbies', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT l.*, u.username as creator_name, 
       (SELECT COUNT(*) FROM lobby_members WHERE lobby_id = l.id) as current_players
       FROM lobbies l
       JOIN users u ON l.creator_id = u.id
       WHERE l.status = 'open' AND l.slot_time > NOW()
       ORDER BY l.created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lobbies' });
  }
});

// Create lobby
app.post('/api/lobbies', authenticateToken, async (req, res) => {
  try {
    const { game_name, slot_time, max_players, skill_level, description } = req.body;
    const creator_id = req.user.id;
    const lobby_code = `L${Date.now()}`;

    const result = await pool.query(
      `INSERT INTO lobbies (creator_id, game_name, slot_time, max_players, skill_level, lobby_code, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [creator_id, game_name, slot_time, max_players, skill_level, lobby_code, description]
    );

    // Auto-add creator to lobby members
    await pool.query(
      'INSERT INTO lobby_members (lobby_id, user_id) VALUES ($1, $2)',
      [result.rows[0].id, creator_id]
    );

    res.json({ message: 'Lobby created successfully', lobby: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create lobby' });
  }
});

// Join lobby
app.post('/api/lobbies/:id/join', authenticateToken, async (req, res) => {
  try {
    const lobby_id = req.params.id;
    const user_id = req.user.id;

    // Check if lobby is full
    const lobby = await pool.query('SELECT * FROM lobbies WHERE id = $1', [lobby_id]);
    if (lobby.rows.length === 0) {
      return res.status(404).json({ error: 'Lobby not found' });
    }

    const members = await pool.query('SELECT COUNT(*) FROM lobby_members WHERE lobby_id = $1', [lobby_id]);
    if (parseInt(members.rows[0].count) >= lobby.rows[0].max_players) {
      return res.status(400).json({ error: 'Lobby is full' });
    }

    await pool.query(
      'INSERT INTO lobby_members (lobby_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [lobby_id, user_id]
    );

    // Update current_players count
    await pool.query(
      'UPDATE lobbies SET current_players = (SELECT COUNT(*) FROM lobby_members WHERE lobby_id = $1) WHERE id = $1',
      [lobby_id]
    );

    res.json({ message: 'Joined lobby successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to join lobby' });
  }
});

// Get lobby members
app.get('/api/lobbies/:id/members', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT u.id, u.username, lm.joined_at 
       FROM lobby_members lm
       JOIN users u ON lm.user_id = u.id
       WHERE lm.lobby_id = $1
       ORDER BY lm.joined_at`,
      [req.params.id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lobby members' });
  }
});

// ============= LEADERBOARD ROUTES =============

// Get leaderboard by game
app.get('/api/leaderboard/:game', async (req, res) => {
  try {
    const game_name = req.params.game;
    const result = await pool.query(
      `SELECT l.*, u.username, 
       ROW_NUMBER() OVER (ORDER BY l.score DESC) as rank
       FROM leaderboard l
       JOIN users u ON l.user_id = u.id
       WHERE l.game_name = $1
       ORDER BY l.score DESC
       LIMIT 100`,
      [game_name]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Get all games leaderboard
app.get('/api/leaderboard', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT DISTINCT game_name FROM leaderboard ORDER BY game_name`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

// Add score to leaderboard
app.post('/api/leaderboard', authenticateToken, async (req, res) => {
  try {
    const { game_name, score, achievement } = req.body;
    const user_id = req.user.id;

    const result = await pool.query(
      'INSERT INTO leaderboard (user_id, game_name, score, achievement) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, game_name, score, achievement]
    );

    res.json({ message: 'Score added successfully', entry: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add score' });
  }
});

// Get user's best scores
app.get('/api/leaderboard/user/best', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT game_name, MAX(score) as best_score, 
       (SELECT COUNT(*) + 1 FROM leaderboard l2 
        WHERE l2.game_name = l1.game_name 
        AND l2.score > MAX(l1.score)) as rank
       FROM leaderboard l1
       WHERE user_id = $1
       GROUP BY game_name
       ORDER BY best_score DESC`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user scores' });
  }
});

// ============= ADMIN ROUTES =============

// Get all bookings (admin)
app.get('/api/admin/bookings', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT b.*, u.username, u.email, s.station_name 
       FROM bookings b
       JOIN users u ON b.user_id = u.id
       JOIN stations s ON b.station_id = s.id
       ORDER BY b.booking_date DESC, b.start_time DESC
       LIMIT 100`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/booking', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'booking.html'));
});

app.get('/lobby', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'lobby.html'));
});

app.get('/leaderboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'leaderboard.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Start server
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🎮 Kali Kalari server running on port ${PORT}`);
  });
});
