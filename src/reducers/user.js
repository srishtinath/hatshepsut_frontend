let userInitialState = {
    id: 0,
    username: "",
    user_foods: [],
    token: ""
  }
  
export let userReducer = (state = userInitialState, action) => {
    switch(action.type){
      case "SET_USER_INFO":
        let singleNestedObject = { 
          ...action.payload.user, 
          token: action.payload.token
        }
        // {...state, ...singleNestedObject}
        return {
          ...state,
          ...singleNestedObject
        }
  
      case "DELETE_ONE_FOOD":
        let deletedArray = state.user_foods.filter((user_food)=> {
          return user_food.id !== action.payload
        })
        return {
          ...state,
          user_foods: deletedArray
        }
      default: 
        return state
    }
  }
  