import * as yup from 'yup';

// Schema validation for product form
export const productSchema = yup.object().shape({
  name: yup
    .string()
    .required('نام کالا الزامی است')
    .min(2, 'نام کالا باید حداقل ۲ کاراکتر باشد'),
  price: yup
    .number()
    .typeError('قیمت باید یک عدد باشد')
    .required('قیمت الزامی است')
    .positive('قیمت باید مثبت باشد'),
  quantity: yup
    .number()
    .typeError('موجودی باید یک عدد باشد')
    .required('موجودی الزامی است')
    .positive('موجودی باید مثبت باشد'),
});