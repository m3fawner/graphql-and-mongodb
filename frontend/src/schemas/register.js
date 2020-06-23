import * as yup from 'yup';

export default yup.object({
  username: yup.string().min(5).max(24).required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .min(8)
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required(),
  email: yup.string().email().required(),
  meta: yup.object({
    name: yup.object({
      first: yup.string().trim().required(),
      last: yup.string().trim().required(),
    }),
  }),
});
