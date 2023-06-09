import axios from 'api/helpers/axios';

// Types
import { ICoefficient } from 'types/coefficient';

interface ICoefficientsResponse {
  data: ICoefficient[];
}

interface ICoefficientResponse {
  data: ICoefficient;
}

export const getSalaryCoefficients = () =>
  axios.get<ICoefficientsResponse>('/salary/coefficients');

export const addSalaryCoefficient = async (name: string, coefficient: number) =>
  axios.post<ICoefficientResponse>('/salary/coefficients', {
    name,
    coefficient
  });
