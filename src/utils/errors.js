const missingParameters = params => {
  const keys = Object.keys(params);
  const count = keys.length;
  const message = count === 1 ? `the param ${keys} is required` : `the params ${keys} are required`;
  return message;
};

module.exports = {
  missingParameters
};
