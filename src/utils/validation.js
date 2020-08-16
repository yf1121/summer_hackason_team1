/* eslint-disable no-irregular-whitespace */
/* eslint-disable import/prefer-default-export */
export const validateUsername = (username) => (username.length >= 1 && username.replace(/(\s|　)+/ug, '').length >= 1);
