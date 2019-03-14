import { stringify } from 'querystring';

import { serverAddress } from './serverSettings';

export const createFetcher = <Req extends any[], Res extends object>(
  requestPath: string,
  method: "GET" | "POST"
) => async (args: Req): Promise<Res> => {
  const query = stringify(args);
  return fetch(`${serverAddress}/${requestPath}?${query}`, { method }).then(
    res => {
      if (!res.ok) return Promise.reject(res.statusText);
      else return res.json();
    }
  );
};
