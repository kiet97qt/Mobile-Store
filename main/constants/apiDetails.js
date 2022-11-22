const define = require('node-constants')(exports);
define({
  INITIAL_USER_LOGIN: {
    method: 'POST',
    route: '/api/passport/login',
  },
});
