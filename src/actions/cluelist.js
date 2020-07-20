export let setClueList = (cluelistObj) => {
    return {
      type: "SET_CLUELIST",
      payload: cluelistObj
    }
  }

  export let setClueItems = (clueListItems) => {
    return {
      type: "SET_CLUELIST_ITEMS",
      payload: clueListItems
    }
  }

export let setAllClueLists = (cluelists) => {
  return {
    type: "SET_ALL_CLUELISTS",
    payload: cluelists
  }
}

export let addItemToClueList = (itemObject) => {
    return {
      type: "ADD_ITEM",
      payload: itemObject
    }
}

export let removeItemFromClueList = (itemObject) => {
  return {
    type: "REMOVE_ITEM",
    payload: itemObject
  }
}