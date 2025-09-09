import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // <-- 1. IMPORT
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes)

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});