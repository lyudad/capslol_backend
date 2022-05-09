// eslint-disable-next-line import/no-extraneous-dependencies
import { Response } from 'express';

export interface ExpressResponse extends Response {
  extension?: string;
}
