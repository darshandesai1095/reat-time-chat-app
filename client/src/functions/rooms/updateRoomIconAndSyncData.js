import { getUserByMongoDbUserId } from "../../redux/features/users/userSlice";
import { getRoomsByMongoDbUserId, setLoading, updateRoomIcon } from "../../redux/features/rooms/roomSlice";

const updateRoomIconAndSyncData = async (dispatch, roomId, mongoDbUserId, newRoomIconUrl) => {
   
  try {
    
    dispatch(setLoading(true))

    // create new room and sync data
    await Promise.resolve(
      dispatch(
        updateRoomIcon({
            roomId: roomId,
            newRoomIconUrl: newRoomIconUrl,
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
    await Promise.resolve(
        dispatch(
            getRoomsByMongoDbUserId(mongoDbUserId)
        )
    )

    dispatch(setLoading(false))

  } catch (error) {
        console.log("Create updating room name: ", error.message);
  }

}

export default updateRoomIconAndSyncData