import express from 'express';
import compression from 'compression';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

// Enable compression
app.use(compression());

// Serve static files from dist directory
app.use(express.static(join(__dirname, 'dist')));

// Serve node_modules for development dependencies
app.use('/node_modules', express.static(join(__dirname, 'node_modules')));

// Handle SPA routing - serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🏋️ Fitness Tracker running on port ${PORT}`);
  console.log(`📊 Server started at http://0.0.0.0:${PORT}`);
});