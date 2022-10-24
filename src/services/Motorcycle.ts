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

  public async read(): Promise<IMotorcycle[]> {
    const findAll = await this._car.read();
    return findAll;
  }

  public async readOne(_id: string): Promise<IMotorcycle> {
    const findById = await this._car.readOne(_id);
    if (!findById) throw new Error(ErrorTypes.EntityNotFound);
    return findById;
  }

  public async delete(_id: string): Promise<IMotorcycle> {
    const del = await this._car.delete(_id);
    if (!del) throw new Error(ErrorTypes.EntityNotFound);
    
    return del;
  }



}

export default CarServices;