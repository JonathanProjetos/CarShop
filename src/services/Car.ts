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

  public async read():Promise<ICar[]> {
    const findAll = await this._car.read();
    return findAll;
  }

  public async readOne(_id:string):Promise<ICar> {
    const findById = await this._car.readOne(_id);
    if (!findById) throw new Error(ErrorTypes.InvalidMongoId);
    return findById;
  }
}

export default CarServices;