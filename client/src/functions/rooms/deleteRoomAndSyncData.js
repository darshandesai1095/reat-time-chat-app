import { assignCurrentActiveRoom, deleteRoom, setLoading } from "../../redux/features/rooms/roomSlice";

const deleteRoomAndSyncData = async (dispatch, roomId, mongoDbUserId, username) => {
   
  dispatch(setLoading(true))

  try {
    // create new room and sync data
    await Promise.resolve(
      dispatch(
        deleteRoom({
            roomId: roomId,
            deletedBy: mongoDbUserId,
            username: username,
        })
      )
    )

    // // update user slice
    // await Promise.resolve(
    //   dispatch(
    //     getUserByMongoDbUserId({
    //         userId: mongoDbUserId,
    //     })
    //   )
    // )

    // // update room slice
    // // dispatch(changeCurrentActiveRoom(0))
    // await Promise.resolve(
    //     dispatch(
    //         getRoomsByMongoDbUserId(mongoDbUserId)
    //     )
    // )

    dispatch(assignCurrentActiveRoom())
    dispatch(setLoading(false))

  } catch (error) {
        console.log("Error deleting room: ", error.message)
        dispatch(setLoading(false))    
  }

}

export default deleteRoomAndSyncData