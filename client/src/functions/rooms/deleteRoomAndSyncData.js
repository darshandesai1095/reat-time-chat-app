import { getUserByMongoDbUserId } from "../../redux/features/users/userSlice";
import { assignCurrentActiveRoom, deleteRoom, getRoomsByMongoDbUserId } from "../../redux/features/rooms/roomSlice";

const renameRoomAndSyncData = async (dispatch, roomId, mongoDbUserId) => {
   
  try {
    // create new room and sync data
    await Promise.resolve(
      dispatch(
        deleteRoom({
            roomId: roomId,
            deletedBy: mongoDbUserId
        })
      )
    )

    // update user slice
    await Promise.resolve(
      dispatch(
        getUserByMongoDbUserId({
            userId: mongoDbUserId,
        })
      )
    )

    // update room slice
    // dispatch(changeCurrentActiveRoom(0))
    await Promise.resolve(
        dispatch(
            getRoomsByMongoDbUserId(mongoDbUserId)
        )
    )

    dispatch(assignCurrentActiveRoom())

  } catch (error) {
        console.log("Error deleting room: ", error.message);
  }

};

export default renameRoomAndSyncData