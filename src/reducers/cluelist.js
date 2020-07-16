let initialClueListItems = {
    items: []
}

export const cluelistReducer = (state = initialClueListItems, action) => {

    switch(action.type){
      case "ADD_ITEM":
        
        return {
          ...state,
          items: [...state.items, action.payload]
        };
        case "REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.itemId)
            }
      default: 
        return state
    }
  }