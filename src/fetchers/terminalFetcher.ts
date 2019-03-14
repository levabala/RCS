import { createFetcher } from './createFetcher';

export default (methodName: string, args: any[]) =>
  createFetcher(methodName, "GET")(args).catch(e => [e]);
