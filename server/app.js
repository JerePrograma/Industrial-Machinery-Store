const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const machineryRoutes = require('./routes/machinery');
const contactRoutes = require('./routes/contact');
const { connectToDatabase } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://4fffec083157.ngrok-free.app',
      /^https:\/\/.*\.ngrok\.io$/
    ];

    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    // Check if the origin is allowed
    if (typeof origin === 'string' && 
        (allowedOrigins.includes(origin) || 
         allowedOrigins.some(pattern => 
           pattern instanceof RegExp && pattern.test(origin)))) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation'));
    }
  },
  credentials: true
}));
app.use(bodyParser.json());

// Connect to the database
connectToDatabase();

app.get('/', (req, res) => {
  res.send('API de Maquindust funcionando correctamente 🚀');
});
// Routes
app.use('/api/machinery', machineryRoutes);
app.use('/api/contact', contactRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// En tu API backend, verifica que los datos se envían como números
// filepath: server/routes/machinery.js (o donde tengas tu ruta de ofertas)

app.get('/api/offers', async (req, res) => {
  try {
    const offers = await Machinery.findAll({
      where: { isOffer: true },
      raw: true // Esto puede ayudar con los tipos de datos
    });
    
    // Asegurar que price sea número
    const formattedOffers = offers.map(offer => ({
      ...offer,
      price: parseFloat(offer.price) // Convertir explícitamente a número
    }));
    
    res.json(formattedOffers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

