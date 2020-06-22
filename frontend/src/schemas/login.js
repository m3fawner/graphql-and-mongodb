import * as yup from 'yup';

export default yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});
