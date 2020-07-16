// add item to cluelist
// remove item from cluelist

export const addItemToClueList = item => {
    return {
      type: 'ADD_ITEM',
      item
    }
  }
  
  export const removeItemFromClueList = itemId => {
    return {
      type: 'REMOVE_ITEM',
      itemId
    }
  }