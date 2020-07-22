export let setUserInfo = (userObj) => {
    return {
      type: "SET_USER",
      payload: userObj
    }
  }

  export let setAllCharacters = (charArray) => {
    return {
      type: "SET_CHARACTERS",
      payload: charArray
    }
  }

  export let setAllRooms = (roomsArray) => {
    return {
      type: "SET_ROOMS",
      payload: roomsArray
    }
  }

