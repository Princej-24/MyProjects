import express from 'express';
import product from './product.json';

const app = express();
app.use(express.json());