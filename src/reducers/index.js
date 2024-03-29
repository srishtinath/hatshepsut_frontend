let initialState = {
  currentUser: {},
  cluelistId: 0,
  clueItems: [],
  currentRoom: {},
  currentLocation: {
    items: []
  },
  currentCharacter: {},
  allCharacters: [],
  allRooms: [],
  userRooms: [],
  chatHistory: []
}

export const rootReducer = (state = initialState, action) => {
  switch(action.type){
    case "SET_USER":
      return {
        ...state,
        currentUser: action.payload
      }

    case "SET_CLUELIST":
      return {
        ...state,
        cluelistId: action.payload,
      }

    case "SET_CLUELIST_ITEMS":
      return {
        ...state,
        clueItems: action.payload
      }
    case "SET_CHARACTERS":
      return {
        ...state,
        allCharacters: action.payload
      }
    case "SET_ROOMS":
      return {
        ...state,
        allRooms: action.payload
      }

    case "SET_USER_ROOMS":
      return {
        ...state,
        userRooms: action.payload
      }

    case "ADD_USER_ROOM":
      return {
        ...state,
        userRooms: [...state.userRooms, action.payload]
      }
    case "ADD_ITEM":
      return {
        ...state,
        clueItems: [...state.clueItems, action.payload]
      };
    case "REMOVE_ITEM":
      return {
          ...state,
          clueItems: state.clueItems.filter(item => item.id !== action.payload.id)
      }

    case "SET_ROOM":
      return {
        ...state,
        currentRoom: action.payload
      }
    case "SET_LOCATION":
      return {
        ...state,
        currentLocation: action.payload,
      }

    case "SET_CHARACTER":
      return {
        ...state,
        currentCharacter: action.payload
      }

    case "ADD_CHAT":
      return {
        ...state,
        chatHistory: [...state.chatHistory, action.payload]
      }

    case "REMOVE_ALL_USER_ROOMS":
      return {
        ...state,
        userRooms: []
      }  
    default: 
      return state
  }
}