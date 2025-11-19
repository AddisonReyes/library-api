import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send("Token required");
  }

  jwt.verify(token as string, "secret", (err, decoded) => {
    if (err) {
      return res.status(500).send("Invalid token");
    }

    req.body.user = (decoded as any).user;
    next();
  });
};

export default verifyToken;
