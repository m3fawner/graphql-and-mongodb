import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';

export default ({ validationSchema, ...rhfConfiguration } = {}, {} = {}) => {
  const { ...rhf } = useForm({
    resolver: yupResolver(validationSchema),
    ...rhfConfiguration,
  });
  const getInputProps = (name) => ({
    name,
    register: rhf.register,
    errors: rhf.errors,
  });
  return {
    ...rhf,
    getInputProps,
  };
};
