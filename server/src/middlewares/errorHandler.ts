import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = res.statusCode ? res.statusCode : 500;
  res.status(status);

  res.json({ message: err.message, isError: true });
};

export default errorHandler;
