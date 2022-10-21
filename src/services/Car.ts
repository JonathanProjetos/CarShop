import { IService } from '../interfaces/IService';
import { ICar, CarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class CarServices implements IService<ICar> {
  private _car:IModel<ICar>;

  constructor(model:IModel<ICar>) {
    this._car = model;
  }

  public async create(obj:unknown):Promise<ICar> {
    const verify = CarZodSchema.safeParse(obj);

    if (!verify.success) throw verify.error;

    const created = await this._car.create(verify.data);
    return created;
  }
}

export default CarServices;