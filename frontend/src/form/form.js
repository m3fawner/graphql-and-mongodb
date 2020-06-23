import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';

export default ({
  validationSchema,
  mode = 'onBlur',
  ...rhfConfiguration
} = {}) => {
  const { ...rhf } = useForm({
    resolver: yupResolver(validationSchema),
    mode,
    ...rhfConfiguration,
  });
  const getInputProps = (name) => ({
    name,
    register: rhf.register,
    errors: rhf.errors,
    touched: rhf.formState.touched,
  });
  return {
    ...rhf,
    getInputProps,
    get canSubmit() {
      return (
        rhf.formState.isValid ||
        (mode === 'onBlur' && Object.keys(rhf.errors).length === 0)
      );
    },
  };
};
