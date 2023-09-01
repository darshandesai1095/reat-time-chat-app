import { getUserByMongoDbUserId } from "../../redux/features/users/userSlice";
import { removeUsersFromRoom, getRoomsByMongoDbUserId, setLoading } from "../../redux/features/rooms/roomSlice";

const removeUsersFromRoomAndSyncData = async (dispatch, mongoDbUserId, roomId, emailsArray, updatedByUsername) => {
   
  dispatch(setLoading(true))
  try {
    // create new room and sync data
    await Promise.resolve(
      dispatch(
            removeUsersFromRoom({
                roomId: roomId,
                emailsArray: emailsArray,
                updatedById: mongoDbUserId,
                updatedByUsername: updatedByUsername
            })
      )
    );

    // update user slice
    await Promise.resolve(
      dispatch(
            getUserByMongoDbUserId({
                userId: mongoDbUserId,
            })
      )
    );

    // update room slice
    await Promise.resolve(
        dispatch(
            getRoomsByMongoDbUserId(mongoDbUserId)
        )
    );

    dispatch(setLoading(false))

  } catch (error) {
        dispatch(setLoading(false))
        console.log("Remove users error: ", error.message);
  }

};

export default removeUsersFromRoomAndSyncData