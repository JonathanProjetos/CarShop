import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Model } from  'mongoose';
import CarModel from '../../../models/Cars';
import CarServices from '../../../services/Car';
import CarController from '../../../controllers/Car';
import { carMock, carMockId, carsMocks } from '../../mocks/ICar'
import { Request, Response } from 'express'


describe('Car Controller', () => {
  const carModel = new CarModel();
  const carService = new CarServices(carModel);
  const carController = new CarController(carService);
  const req = {} as Request
  const res = {} as Response

  before(async () => {
    sinon.stub(Model,'create').resolves(carMockId);
    sinon.stub(Model, 'find').resolves(carsMocks);
    sinon.stub(Model, 'findOne').resolves(carMockId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('EndPoint create', () => {

    it('sucessfully create', async () => {
      req.body = carMockId

      await carController.create(req, res)

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockId)).to.be.true;
    });
  });

  describe('EndPoint read', () => {
    it('sucessfully read', async () => {

      await carController.read(req, res)

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsMocks)).to.be.true;
    });
  });

  describe('EndPoint readOne', () => {
    it('sucessfully readOne', async () => {
      req.params = { id:carMockId._id }

      await carController.readOne(req, res)

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockId)).to.be.true;
    })
  })

});