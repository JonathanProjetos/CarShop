import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Model } from 'mongoose';
import { ZodError } from 'zod';
import CarModel from '../../../models/Cars';
import CarService from '../../../services/Car'
import { carMock, carsMocks, carMockId, deleteCarMock } from '../../mocks/ICar';
import { ErrorTypes } from '../../../errors/catalog';


describe('Car Services', () => {

  const carModel = new CarModel();
  const carServices = new CarService(carModel);

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockId);
    sinon.stub(Model, 'find').resolves(carsMocks);
    sinon.stub(Model, 'findOne')
    .onCall(0).resolves(carMockId)
    .onCall(1).resolves(null);
  });

  after(()=>{
    sinon.restore();
  })

  describe('EndPoint create', () => {

    it('sucessfully create', async () => {
      const car = await carServices.create(carMock);
      expect(car).to.be.equal(carMockId);
    });

    it('create fail', async () => {
      let error;
      try {
        await carServices.create({});
      } catch (err:any) {
        error = err
      };
      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('EndPoint read', () => {
    it('sucessfully read', async () => {
      const cars = await carServices.read();
      expect(cars).to.be.deep.equal(carsMocks);
    });
  });

  describe('EndPoint readOne', () => {
    it('sucessfully readOne', async () => {
      const car = await carServices.readOne('62cf1fc6498565d94eba52cd')
      expect(car).to.be.deep.equal(carMockId);
    });

    it('readOne fail', async() => {
      let capError;
      try {
        await carServices.readOne('62cf1fc6498565d94eba52cd');
      } catch (err:any) {
        capError = err
      };
      expect(capError, 'error não definido').not.to.be.undefined;
      expect(capError.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    });
  });

});