import 'babel-core/register';
import 'babel-polyfill';
import * as yup from 'yup';

const camelCaseToSentenceCase = (name) => {
  const result = name
    .split('.')
    .slice(-1)[0]
    .replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

yup.setLocale({
  mixed: {
    required: ({ path, label }) =>
      `${label || camelCaseToSentenceCase(path)} is required.`,
  },
  string: {
    email: () => 'Invalid email entered.',
    min: ({ path, label, min }) =>
      `Value of ${
        label || camelCaseToSentenceCase(path)
      } must be at least ${min} characters.`,
    max: ({ path, label, max }) =>
      `Value of ${
        label || camelCaseToSentenceCase(path)
      } must be less than ${max} characters.`,
  },
});
