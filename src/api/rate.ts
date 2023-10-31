import axios from 'axios';

type IRate = {
  Valute: {
    USD: {
      Value: number;
    };
  };
};

const rateApi = {
  async getDollarRate(): Promise<number> {
    const response = await axios.get<IRate>(
      'https://www.cbr-xml-daily.ru/daily_json.js'
    );

    return response.data.Valute.USD.Value;
  }
};

export default rateApi;
