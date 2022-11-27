const MidAdmin = require('../middlewares/AdminMiddleware');

const loginUser = (req, res) => {
  MidAdmin.loginUser(req, res)
    .then((data) => res.json({ data }))
    .catch((err) => res.json({ err }));
};

module.exports = {
  loginUser,
};
