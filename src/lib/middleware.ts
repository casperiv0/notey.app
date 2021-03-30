import { NextApiResponse } from "next";
import { IRequest } from "types/IRequest";

export function middleWare(req: IRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
