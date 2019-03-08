import { RequestType } from 'rcs-server';
import { createFetcher } from 'src/fetchers/createFetcher';

export default createFetcher<RequestType.ExecuteMethod>(
  RequestType.ExecuteMethod,
  "POST"
);
