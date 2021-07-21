export const verifyResponsePassword = (pwd, options) => {
  if (options.numbers && !/[0-9]/.test(pwd)) {
    return false;
  }

  if (options.uppercase && !/[A-Z]/.test(pwd)) {
    return false;
  }

  if (options.simbols && !/[!@#$%^&*()+_\-=}{[\]|:;"/?.><,`~]/.test(pwd)) {
    return false;
  }

  return true;
}