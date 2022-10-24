import { IMotorcycle } from '../../interfaces/IMotorcycle'

const motocycleMock:IMotorcycle = {
  model: 'Suzuki',
  year: 2020,
  color: 'red',
  buyValue: 3500000,
  category: 'Street',
  engineCapacity: 1250
}

const motocycleMockId:IMotorcycle & { _id:string } = {
  _id: '6356abd6f623c5b8c8a673d3',
  model: 'Titan',
  year: 2020,
  color: 'red',
  buyValue: 3500,
  category: 'Street',
  engineCapacity: 125
}

const motocycleMockAll:IMotorcycle[] = [
  {
    model: 'Titan',
    year: 2020,
    color: 'red',
    buyValue: 3500000,
    category: 'Street',
    engineCapacity: 140
  },
  {
    model: 'Kawasaki Ninja H2R',
    year: 2022,
    color: 'black',
    buyValue: 28000,
    category: 'Street',
    engineCapacity: 950
  },
]
 
export { motocycleMock, motocycleMockAll, motocycleMockId };