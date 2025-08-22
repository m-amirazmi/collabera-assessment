export enum LoginStep {
  USERNAME = "username",
  PASSWORD = "password",
  MFA = "mfa",
  SUCCESS = "success",
}

export const loginSteps = [
  LoginStep.USERNAME,
  LoginStep.PASSWORD,
  LoginStep.MFA,
  LoginStep.SUCCESS,
];
