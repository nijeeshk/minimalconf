import fetch from './handler';

export const verifyToken = () => fetch({
  url: '/profile',
  method: 'GET',
  needAuth: true,
});

export const logoutUser = (options) => fetch({
  ...options,
  url: '/logout',
  method: 'GET',
  needAuth: true,
});

export const loginUser = (options) => fetch({
  url: '/login',
  method: 'POST',
  body: options,
  needAuth: false,
});

export const verifyAuth = (options) => fetch({
  url: '/2step/verifyauth',
  method: 'PUT',
  body: options,
  needAuth: true,
});

export const sendOTP = (options) => fetch({
  url: '/2step/sendotp',
  method: 'POST',
  body: options,
  needAuth: true,
});

export const verifyOTP = (options) => fetch({
  url: '/2step/verifyotp',
  method: 'PUT',
  body: options,
  needAuth: true,
});

export const verifyMail = (options) => fetch({
  url: '/reset/verify_mail',
  method: 'POST',
  body: options,
  needAuth: false,
});

export const resetPassword = (options) => fetch({
  url: '/reset/password',
  method: 'POST',
  body: options,
  needAuth: false,
});
