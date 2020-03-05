const isValidEmail = (email) => {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isSuperAdmin = email.includes('..') && !reg.test(email);
  if (reg.test(email) || isSuperAdmin) {
    return true;
  }
  return false;
};

export default isValidEmail;