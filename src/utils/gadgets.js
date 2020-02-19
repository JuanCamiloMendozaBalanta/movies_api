const removeEmptyOrNull = obj => {
  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === 'object') removeEmpty(obj[key]);
    else if (obj[key] === '' || obj[key] === undefined || obj[key] === 'undefined') delete obj[key];
  });
  return obj;
};

module.exports = {
  removeEmptyOrNull
};
