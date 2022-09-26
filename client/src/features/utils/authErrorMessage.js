const authErrorMessage = (errorCode) => {
  if (errorCode === "auth/user-not-found") {
    return "There isn't an account for the information you entered. Please try again.";
  }

  if (errorCode === "auth/too-many-requests") {
    return "Access to this account has been temporarily disabled due to many failed login attempts. Please try again later.";
  }

  if (errorCode === "auth/wrong-password") {
    return "The password you entered is incorrect. Please try again.";
  }

  return "";
};

export default authErrorMessage;