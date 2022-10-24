import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Model } from  'mongoose';
import MotoModel from '../../../models/Motocycle';
import MotoServices from '../../../services/Motorcycle';
import MotoController from '../../../controllers/Motorcycle';
import { motocycleMock, motocycleMockAll, motocycleMockId } from '../../mocks/IMotocycle'
import { Request, Response } from 'express'


describe('Car Controller', () => {
  const motoModel = new MotoModel();
  const motoService = new MotoServices(motoModel);
  const motoController = new MotoController(motoService);
  const req = {} as Request
  const res = {} as Response

  before(async () => {
    sinon.stub(Model,'create').resolves(motocycleMockId);
    sinon.stub(Model, 'find').resolves(motocycleMockAll);
    sinon.stub(Model, 'findOne').resolves(motocycleMockId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(motocycleMockId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motocycleMockId)

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.end = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('EndPoint create', () => {

    it('sucessfully create', async () => {
      req.body = motocycleMockId;

      await motoController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motocycleMockId)).to.be.true;
    });
  });

  describe('EndPoint read', () => {
    it('sucessfully read', async () => {

      await motoController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motocycleMockAll)).to.be.true;
    });
  });

  describe('EndPoint readOne', () => {
    it('sucessfully readOne', async () => {
      req.params = { id:motocycleMockId._id };

      await motoController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motocycleMockId)).to.be.true;
    });
  });

  describe('EndPoint delete', () => {
    it('sucessfully delete', async() => {
      req.params = { id:motocycleMockId._id };

      await motoController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.end as sinon.SinonStub).called).to.be.true;
    });
  });

  describe('EndPoint update', () => {
    it('sucessfully update', async () => {
      req.body = motocycleMock;
      req.params = { id:motocycleMockId._id };

      await motoController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motocycleMockId)).to.be.true;
    });
  });


});