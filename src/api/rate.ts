import axios from 'axios';

type IRate = {
  Valute: {
    USD: {
      Value: number;
    };
  };
};

export default {
  async getDollarRate(): Promise<number> {
    const response = await axios.get<IRate>(
      'https://www.cbr-xml-daily.ru/daily_json.js'
    );

    return response.data.Valute.USD.Value;
  }
};
