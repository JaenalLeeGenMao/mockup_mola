const normalizeAuth = response => {
  const {
    data: {
      access_token: token,
      expires_in: expire,
      token_type: type,
      refresh_token: refreshToken = ''
    }
  } = response;
  return {
    token,
    refreshToken,
    expire,
    type
  };
};

const normalizeUserInfo = response => {
  const {
    data: { user_id: id, first_name: firstName, last_name: lastName, email }
  } = response;
  return {
    id,
    firstName,
    lastName,
    email
  };
};

export default {
  normalizeAuth,
  normalizeUserInfo
};
