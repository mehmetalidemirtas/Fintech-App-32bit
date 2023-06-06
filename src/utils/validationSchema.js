import * as Yup from 'yup';

export const loginValidationSchema = t => {
  return Yup.object().shape({
    identityNumber: Yup.string()
      .required(t('error.enterIdentityNo'))
      .matches(/^[1-9]{1}[0-9]{9}[02468]{1}$/, t('error.invalidId'))
      .min(11, t('error.minIdentity'))
      .max(11, t('error.minIdentity')),
    password: Yup.string()
      .min(8, t('error.minPassword'))
      .required(t('error.enterPassword')),
  });
};

export const identityValidationSchema = t => {
  return Yup.object().shape({
    name: Yup.string().required(t('error.enterName')),
    surname: Yup.string().required(t('error.enterSurname')),
    identityNumber: Yup.string()
      .required(t('error.enterIdentityNo'))
      .matches(/^[1-9]{1}[0-9]{9}[02468]{1}$/, t('error.invalidId'))
      .min(11, t('error.minIdentity'))
      .max(11, t('error.minIdentity')),
  });
};

export const passwordValidationSchema = t => {
  return Yup.object().shape({
    password: Yup.string()
      .min(8, t('error.minPassword'))
      .required(t('error.enterPassword')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('error.passwordsNotSame'))
      .required(t('error.enterConfirmPassword')),
  });
};
