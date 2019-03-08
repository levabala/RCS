import { stringify } from 'querystring';
import { BodyType, RequestType, ResponseType } from 'rcs-server';

import { serverAddress } from './serverSettings';

export const createFetcher = <T extends RequestType>(
  requestPath: string,
  method: "GET" | "POST"
) => async (obj: BodyType<T>): Promise<ResponseType<T>> => {
  const query = stringify(obj);
  return fetch(`${serverAddress}/${requestPath}?${query}`, { method }).then(
    res => {
      if (!res.ok) return Promise.reject(res.statusText);
      else return res.json();
    }
  );
};
