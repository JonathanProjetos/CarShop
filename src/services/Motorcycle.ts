import { IService } from '../interfaces/IService';
import { IMotorcycle, MotorcycleZodSchema } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class CarServices implements IService<IMotorcycle> {
  private _car: IModel<IMotorcycle>;

  constructor(model: IModel<IMotorcycle>) {
    this._car = model;
  }

  public async create(obj: unknown): Promise<IMotorcycle> {
    const verify = MotorcycleZodSchema.safeParse(obj);

    if (!verify.success) throw verify.error;

    const created = await this._car.create(verify.data);
    return created;
  }

}

export default CarServices;