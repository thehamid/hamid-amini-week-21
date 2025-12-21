import * as yup from 'yup';

// اسکیمای اعتبارسنجی برای فرم لاگین
export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, 'نام باید حداقل ۲ کاراکتر باشد')
    .required('نام کاربری الزامی است'),
  password: yup
    .string()
    .required('رمز عبور الزامی است'),
});

// اسکیمای اعتبارسنجی برای فرم رجیستر
export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, 'نام باید حداقل ۲ کاراکتر باشد')
    .required('نام کاربری الزامی است'),
  password: yup
    .string()
    .min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد')
    .required('رمز عبور الزامی است'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'رمز عبورها مطابقت ندارند')
    .required('تکرار رمز عبور الزامی است'),
});