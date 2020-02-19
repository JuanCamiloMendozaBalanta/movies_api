const jwt = require('jsonwebtoken');
const { seed } = require('../../configuration/config');

const verificationToken = (req, res, next) => {
  const token = req.get('Authorization');
  jwt.verify(token, seed, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        err: 'Failed token'
      });
    }
    req.user = decoded;
    next();
  });
};

module.exports = {
  verificationToken
};
