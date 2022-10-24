import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

const motocycleMonogSchema = new Schema<IMotorcycle>({
  status: Boolean,
  year: Number,
  buyValue: Number,
  color: String,
  model: String,
  category: {
    Street: String,
    Custom: String,
    Trail: String,
  },
  engineCapacity: Number,
}, { versionKey: false });

class Motocycle extends MongoModel<IMotorcycle> {
  constructor(model = mongooseCreateModel('Motorcycle', motocycleMonogSchema)) {
    super(model);
  }
}

export default Motocycle;