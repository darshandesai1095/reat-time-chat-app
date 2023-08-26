import { getUserByMongoDbUserId } from "../../redux/features/users/userSlice";
import { getRoomsByMongoDbUserId } from "../../redux/features/rooms/roomSlice";
import { addUsersToRoom } from "../../redux/features/rooms/roomSlice";

const renameRoomAndSyncData = async (dispatch, roomId, mongoDbUserId, 
                    emailsArray, updatedById, updatedByUsername) => {
   
  try {
    // create new room and sync data
    await Promise.resolve(
      dispatch(
        addUsersToRoom({
            roomId: roomId,
            emailsArray: emailsArray,
            updatedById: updatedById,
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
    console.log("done 1")

    // update room slice
    // dispatch(changeCurrentActiveRoom(0))
    await Promise.resolve(
        dispatch(
            getRoomsByMongoDbUserId(mongoDbUserId)
        )
    );
    console.log("done 2")

  } catch (error) {
        console.log("Error deleting room: ", error.message);
  }

};

export default renameRoomAndSyncData