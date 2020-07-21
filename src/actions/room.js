export let setCurrentRoom = (roomObj) => {
    return {
      type: "SET_ROOM",
      payload: roomObj
    }
  }

  export let setCurrentLocation = (locationObj) => {
    return {
      type: "SET_LOCATION",
      payload: locationObj
    }
  }

  export let setCurrentCharacter = (characterObj) => {
    return {
      type: "SET_CHARACTER",
      payload: characterObj
    }
  }