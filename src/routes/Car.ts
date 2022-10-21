import { Router } from 'express';
import CarController from '../controllers/Car';
import CarModel from '../models/Cars';
import CarService from '../services/Car';

const route = Router();

const model = new CarModel();
const service = new CarService(model);
const controller = new CarController(service);

route.get('/cars', (req, res) => controller.read(req, res));
route.post('/cars', (req, res) => controller.create(req, res));
route.delete('/cars', (req, res) => controller.delete(req, res));
route.get('/cars/:id', (req, res) => controller.readOne(req, res));
route.put('/cars/:id', (req, res) => controller.update(req, res));