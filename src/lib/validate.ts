export const validateEmail = (value: string | unknown, _: Record<string, unknown>): string | undefined => {
  if (!value) {
    return 'Email is required';
  }

  if (typeof(value) !== 'string' || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    return 'Email is invalid';
  }
};

export const validatePassword = (value: string | unknown, _: Record<string, unknown>): string | undefined => {
  if (!value) {
    return 'Password is required';
  }

  if (typeof(value) !== 'string' || value.length < 8) {
    return 'Password is invalid';
  }
};
