import { getUserByMongoDbUserId } from "../../redux/features/users/userSlice";
import { removeUsersFromRoom, getRoomsByMongoDbUserId } from "../../redux/features/rooms/roomSlice";

const removeUsersFromRoomAndSyncData = async (dispatch, mongoDbUserId, roomId, emailsArray) => {
   
  try {
    // create new room and sync data
    await Promise.resolve(
      dispatch(
            removeUsersFromRoom({
                roomId: roomId,
                emailsArray: emailsArray,
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

  } catch (error) {
        console.log("Remove users error: ", error.message);
  }

};

export default removeUsersFromRoomAndSyncData