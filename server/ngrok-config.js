const ngrok = require('ngrok');
const dotenv = require('dotenv');
dotenv.config();

async function startNgrokTunnel() {
  try {
    const url = await ngrok.connect({
      addr: process.env.PORT || 5000,
      authtoken: process.env.NGROK_AUTHTOKEN, // Optional: Add your authtoken to .env file if you have one
      region: 'us',
    });
    
    console.log(`Ngrok tunnel is running at: ${url}`);
    console.log('Copy this URL to access your application from anywhere!');
  } catch (error) {
    console.error('Error starting ngrok tunnel:', error);
  }
}

startNgrokTunnel();