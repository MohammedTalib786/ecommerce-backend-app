const path = require('path');
const express = require('express');
// const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000;
const rateLimit = require("express-rate-limit");
const blogsRoutes = require('./routes/blogsRoutes')
const productsRoutes = require('./routes/productsRoutes')
const checkAuthAdmin = require('./middleware/auth')
// const RazorpayHandler = require('./api/orders')
const ordersRoutes = require("./api/orders");

// >>>>>>>>>>>>>>>>>>>>>> Import Database
require('./db/db');




const allowedOrigins = [
  "https://mohammedtalib786.github.io",
  "https://talibkweb.github.io",
  "https://voltcart-ecom-app.vercel.app",
  "https://voltcart-phi.vercel.app",
  "http://192.168.0.114:5173",
  "http://192.168.0.104:5173",
  "http://192.168.0.107:5173",
  "http://localhost:5173",
  "http://localhost:5500",
  "http://localhost:5501"
];



app.use((req, res, next) => {
  let origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});



// >>>>>>>>>>>>>>>>>>>>>> Middlewares
app.use(cookieParser()); // ✅ Parses cookies


app.use((req, res, next) => { // protects .html pages to without logged in users
  if (req.url.endsWith('.html') && (!req.cookies || req.cookies.auth_token !== process.env.SECRET_TOKEN)) {
    return res.redirect('/login');
  }
  next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To handle form submissions
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('trust proxy', 1); // Important for Vercel or Heroku

const loginLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 14, // 14 login attempts per IP
  standardHeaders: true, // Return rate limit info in the RateLimit-* headers
  legacyHeaders: false,  // Disable X-RateLimit-* headers
  handler: (req, res) => {
    return res.status(429).json({
      message: `Too many login attempts. Please try again in ${Math.ceil((req.rateLimit.resetTime - new Date()) / 1000)} seconds.`
    });
  },
});


// >>>>>>>>>>>>>>>>>>>>>> Razorpay Route for Payment Gateway
app.use("/api/orders", ordersRoutes);



// >>>>>>>>>>>>>>>>>>>>>> Serve Login Page - GET
app.get('/login', loginLimiter, (req, res) => {
  // >>>>>> Set Caching and other important Headers
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  if (req.cookies.auth_token) {
    return res.redirect('/already-login');
  }
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});


// >>>>>>>>>>>>>>>>>>>>>> Checks if the user is already Logged In
app.get('/already-login', checkAuthAdmin, (req, res) => {
  // >>>>>> Set Caching and other important Headers
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  res.sendFile(path.join(__dirname, 'public', 'already-login.html'));
})


// >>>>>>>>>>>>>>>>>>>>>> Validate Login Page for Rediretion - POST
app.post('/login', loginLimiter, (req, res) => {
  // >>>>>> Set Caching and other important Headers
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  let { username, password } = req.body;

  if (process.env.DASH_USERNAME === username && process.env.DASH_PASS === password) {
    res.cookie('auth_token', process.env.SECRET_TOKEN, {
      httpOnly: true, // JS can't access this
      secure: true, // set to true in production with HTTPS
      // secure: process.env.NODE_ENV === 'production', // true on Vercel
      sameSite: 'strict',
      path: '/', // ✅ make sure this matches logout
    });
    return res.redirect('/dashboard');
  }
  else {
    return res.status(401).send('Unauthorized: Invalid credentials');
  }
});


// >>>>>>>>>>>>>>>>>>>>>> Serve Dashboard Page with Authentication
app.get('/dashboard', checkAuthAdmin, (req, res) => {
  // Prevent caching the dashboard page
  // >>>>>> Set Caching and other important Headers
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});


// >>>>>>>>>>>>>>>>>>>>>> Serve Add New Product Page with Authentication
app.get('/add-new-product', checkAuthAdmin, (req, res) => {
  // >>>>>> Set Caching and other important Headers
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  res.sendFile(path.join(__dirname, 'public', 'add-new-product.html'));
});


// >>>>>>>>>>>>>>>>>>>>>> Serve Add New Blog Page with Authentication
app.get('/add-new-blog', checkAuthAdmin, (req, res) => {
  // >>>>>> Set Caching and other important Headers
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  res.sendFile(path.join(__dirname, 'public', 'add-new-blog.html'));
});


// >>>>>>>>>>>>>>>>>>>>>> Serve All Products Page with Authentication
app.get('/products', checkAuthAdmin, (req, res) => {
  // >>>>>> Set Caching and other important Headers
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  res.sendFile(path.join(__dirname, 'public', 'products.html'));
});


// >>>>>>>>>>>>>>>>>>>>>> Serve All Blogs Page with Authentication
app.get('/blogs', checkAuthAdmin, (req, res) => {
  // >>>>>> Set Caching and other important Headers
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  res.sendFile(path.join(__dirname, 'public', 'blogs.html'));
});


// >>>>>>>>>>>>>>>>>>>>>> Logout Page
app.get('/logout', checkAuthAdmin, (req, res) => {
  // console.log('Attempting logout... Existing cookies:', req.cookies);
  res.clearCookie('auth_token', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    expires: new Date(0),
  });
  // >>>>> Try using this if the above not worked
  // res.cookie('auth_token', '', {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: 'strict',
  //   path: '/',
  //   expires: new Date(0),
  // });
  // console.log('Cleared cookie - checking again:', req.cookies['auth_token']);

  // >>>>>> Set Caching and other important Headers
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  // res.sendFile(path.join(__dirname, 'public', 'logout.html'));
  res.redirect('/login');
});


// >>>>>>>>>>>>>>>>>>>>>> To Test the Authentication
// app.get('/check-auth', (req, res) => {
//   res.send(req.cookies.auth_token ? 'Authenticated' : 'Not Authenticated');
// });


// >>>>>>>>>>>>>>>>>>>>>> Serve index.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// >>>>>>>>>>>>>>>>>>>>>> Route Setup
app.use('/api/products', productsRoutes);
app.use('/api/blogs', blogsRoutes);


// >>>>>>>>>>>>>>>>>>>>>> Serve Edit Product Page
app.get('/edit-product.html', checkAuthAdmin, (req, res) => {
  // >>>>>> Set Caching and other important Headers
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  res.sendFile(path.join(__dirname, 'public', 'edit-product.html'));
});


// >>>>>>>>>>>>>>>>>>>>>> Serve Edit Blog Page
app.get('/edit-blog.html', checkAuthAdmin, (req, res) => {
  // >>>>>> Set Caching and other important Headers
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  res.sendFile(path.join(__dirname, 'public', 'edit-blog.html'));
});


// Handle all other unknown routes - 404 page
app.use((req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ message: 'API route not found' });
  }
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});


// Razorpay Payment Integration Endpoint
// app.post('/api/orders', RazorpayHandler)
// app.get('/api/orders', (req, res) => {
//   res.send('req:', req)
// })
// app.use('/api/orders', RazorpayHandler)





app.listen(port, () => console.log(`App live on server http://localhost:${port}`));
