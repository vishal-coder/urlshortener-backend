import { body, check, validationResult } from "express-validator";
import express from "express";
import { getToken } from "../models/AuthModel.js";
import { ObjectId } from "mongodb";
export function signupValidation() {
  return [
    check("firstName").notEmpty(),
    check("lastName").notEmpty(),
    check("username", "Please provide a valid email as username").isEmail(),
    check("password", "Password length must be greater than 6 ").isLength({
      min: 6,
    }),
    (req, res, next) => {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        return next();
      }
      // const extractedErrors = [];
      // errors
      //   .array()
      //   .map((err) => extractedErrors.push({ [err.param]: err.msg }));
      console.log(errors);
      return res.status(422).json({
        errors: errors.msg,
      });
    },
  ];
}

export function loginValidation() {
  return [
    check("username", "Please provide a valid email as username").isEmail(),
    check("password", "Password length must be greater than 6 ").isLength({
      min: 6,
    }),
    (req, res, next) => {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        return next();
      }
      const extractedErrors = [];
      errors
        .array()
        .map((err) => extractedErrors.push({ [err.param]: err.msg }));

      return res.status(422).json({
        errors: extractedErrors,
      });
    },
  ];
}

export function forgotPasswordValidation() {
  return [
    check("email", "Please provide a valid email as username").isEmail(),
    (req, res, next) => {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        return next();
      }
      // const extractedErrors = [];
      // errors
      //   .array()
      //   .map((err) => extractedErrors.push({ [err.param]: err.msg }));
      console.log(errors);
      return res.status(401).json({
        message: "please enter valid email",
      });
    },
  ];
}

export function restPasswordValidation() {
  return [
    check("password", "Password length must be greater than 6 ").isLength({
      min: 6,
    }),
    check("confirmPassword")
      .trim()
      .not()
      .isEmpty()
      .isLength({
        min: 6,
        max: 20,
      })
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Both Password must be same");
        }
        return true;
      }),
    (req, res, next) => {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        return next();
      }
      const extractedErrors = [];
      errors
        .array()
        .map((err) => extractedErrors.push({ [err.param]: err.msg }));

      return res.status(401).json({
        errors: extractedErrors,
      });
    },
  ];
}

export const verifyToken = async (req, res) => {
  const { id, token } = req.query;
  try {
    const isValidToken = await getToken({ _id: ObjectId(id), token: token });
    if (!isValidToken) {
      return res.send({
        message: "Invalid token..Please try resetting your password again!",
        success: false,
      });
    } else {
      return res.send({
        message: "Valid token",
        success: true,
      });
    }
  } catch (error) {
    return res.send({
      message: "Something went wrong....Please try again later",
      success: false,
    });
  }
};

export const verifyEmailValidation = async (req, res) => {
  const { id, token } = req.query;
  try {
    const isValidToken = await getToken({ _id: ObjectId(id), token: token });

    if (!isValidToken) {
      return res.send({
        message: "Invalid token..Please try resetting your password again!",
        success: false,
      });
    } else {
      return res.send({
        message: "Valid token",
        success: true,
      });
    }
  } catch (error) {
    return res.send({
      message: "Something went wrong....Please try again later",
      success: false,
    });
  }
};
