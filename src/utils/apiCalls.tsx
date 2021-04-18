import axios, { Method } from 'axios';

export const callApi = (
  url: string,
  method: Method,
  data?: any,
  timeout?: number
) => {
    return axios({
      method,
      url,
      data
    });
};
