let foodInitialState = {
    foods: []
}

export const foodReducer = (state = foodInitialState, action) => {

    switch(action.type){
      case "SET_ALL_FOODS":
        
        return {
          ...state,
          foods: action.payload
        }
      default: 
        return state
    }
  }