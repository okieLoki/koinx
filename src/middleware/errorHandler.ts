import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AxiosError } from "axios";

export const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  switch (true) {
    case err instanceof ZodError:
      return res.status(400).json({
        message: "Bad Request",
        errors: err.errors.map((error) => error.message),
      });
    case err instanceof AxiosError:
      const statusCode = err.response?.status || 500;
      if (statusCode === 429) {
        return res.status(429).json({
          message: "Too Many Requests",
          error:
            err.response?.data.error ||
            "Too many requests, please try again later",
        });
      }
      return res.status(statusCode).json({
        message: "Internal Server Error",
        error: err.response?.data.error || "Something went wrong",
      });
    case err instanceof Error:
      return res.status(500).json({
        message: "Internal Server Error",
        error: err.message || "Something went wrong",
      });
    default:
      next(err);
  }
};
