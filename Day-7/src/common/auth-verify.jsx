import jwt_decode from "jwt-decode";

const isExpired = (token) => {
  const decoded = jwt_decode(token);
  return decoded.exp * 1000 < Date.now();
};

class AuthVerify {
  constructor(logOut) {
    this.logOut = logOut;
  }

  verify() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.accessToken) {
      if (isExpired(user.accessToken)) {
        this.logOut();
        window.location.reload();
      }
    }
  }
}

export default AuthVerify;
