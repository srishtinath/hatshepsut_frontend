export let setUserInfo = (userObj) => {
    return {
      type: "SET_USER",
      payload: userObj
    }
  }