import { Router } from 'express';
import {
  confirmController,
  forgetPasswordController, newAccessTokenController,
  newPasswordController,
  resendVerificationController,
  signinController,
  signupController,
} from './auth.controller.js';
import {
  confirmEmailValidator,
  forgetPasswordValidator, newAccessTokenValidator,
  newPasswordValidator,
  resendVerificationValidator,
  signinValidator,
  signupValidator,
} from './auth.validator.js';

const router = Router();

router.post('/signup', ...signupValidator, signupController);
router.post('/signin', ...signinValidator, signinController);
router.post('/confirm', ...confirmEmailValidator, confirmController);
router.post('/resend', ...resendVerificationValidator, resendVerificationController);
router.post('/forget', ...forgetPasswordValidator, forgetPasswordController);
router.post('/new-password', ...newPasswordValidator, newPasswordController);
router.post('/new-access-token', ...newAccessTokenValidator, newAccessTokenController);

export default router;
