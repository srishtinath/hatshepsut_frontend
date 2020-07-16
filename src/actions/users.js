export const addRoom = room => {
    return {
      type: 'ADD_ROOM',
      room
    }
  }
  
  export const removeRoom = roomId => {
    return {
      type: 'REMOVE_ROOM',
      roomId
    }
  }