import {
  confirmService,
  forgetPasswordService, newAccessTokenService,
  newPasswordService,
  resendVerificationService,
  signinService,
  signupService,
} from './auth.service.js';

export const signupController = async (req, res, next) => {
  try {
    const user = await signupService(req.body);
    return res.send(user);
  } catch (err) {
    next(err);
  }
};

export const signinController = async (req, res, next) => {
  try {
    const token = await signinService(req.body);
    return res.send(token);
  } catch (err) {
    next(err);
  }
};

export const confirmController = async (req, res, next) => {
  try {
    const data = await confirmService(req.body);
    return res.send(data);
  } catch (err) {
    next(err);
  }
};

export const resendVerificationController = async (req, res, next) => {
  try {
    const data = await resendVerificationService(req.body);
    return res.send(data);
  } catch (err) {
    next(err);
  }
};

export const forgetPasswordController = async (req, res, next) => {
  try {
    const data = await forgetPasswordService(req.body);
    return res.send(data);
  } catch (err) {
    next(err);
  }
};

export const newPasswordController = async (req, res, next) => {
  try {
    const data = await newPasswordService(req.body);
    return res.send(data);
  } catch (err) {
    next(err);
  }
};

export const newAccessTokenController = async (req, res, next) => {
  try {
    const data = await newAccessTokenService(req.body);
    return res.send(data);
  } catch (err) {
    next(err);
  }
};
