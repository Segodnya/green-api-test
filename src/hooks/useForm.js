import { useState, useCallback } from 'react';

function useForm(initialValues = {}, validate) {
  const [formState, setFormState] = useState({
    values: initialValues,
    errors: {},
    isValid: false,
  });

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      const fieldError = validate ? validate(name, value) : '';
      const errors = { ...formState.errors, [name]: fieldError };

      setFormState({
        values: { ...formState.values, [name]: value },
        errors,
        isValid: Object.keys(errors).every((key) => !errors[key]),
      });
    },
    [formState, validate]
  );

  const resetForm = useCallback(() => {
    setFormState({
      values: initialValues,
      errors: {},
      isValid: false,
    });
  }, [initialValues]);

  return {
    ...formState,
    handleChange,
    resetForm,
  };
}

export default useForm;
