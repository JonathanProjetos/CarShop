import { ICar } from '../../interfaces/ICar';

const carMock: ICar = {
  model: 'Fusca',
  year: 2020,
  color: 'red',
  buyValue: 3000,
  seatsQty: 2,
  doorsQty: 2
}

const carsMocks: ICar[] = [
  {
    model: 'Siena',
    year: 2016,
    color: 'black',
    buyValue: 20000,
    seatsQty: 2,
    doorsQty: 2
  },
  {
    model: 'Audi',
    year: 2020,
    color: 'blue',
    buyValue: 300000,
    seatsQty: 2,
    doorsQty: 2
  }
]

export { carMock, carsMocks }