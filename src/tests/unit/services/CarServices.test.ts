import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Model } from 'mongoose';
import { ZodError } from 'zod';
import CarModel from '../../../models/Cars';
import CarService from '../../../services/Car'
import { carMock, carsMocks, carMockId, deleteCarMock } from '../../mocks/ICar';


describe('Car Services', () => {

  const carModel = new CarModel();
  const carServices = new CarService(carModel);

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('EndPoint create', () => {

    it('EndPoint create', async () => {
      const car = await carServices.create(carMock);
      expect(car).to.be.equal(carMockId);
    });

    it('create fail', async () => {
      let error;
      try {
        await carServices.create({})
      } catch (err) {
        error = err
      };
      expect(error).to.be.instanceOf(ZodError);
    });
  });


});