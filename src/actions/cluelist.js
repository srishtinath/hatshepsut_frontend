export let setClueList = (cluelistObj, cluelistItems = []) => {
    return {
      type: "SET_CLUELIST",
      payload: {
        cluelistObj,
        cluelistItems}
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