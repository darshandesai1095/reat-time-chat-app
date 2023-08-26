import { getUserByMongoDbUserId } from "../../redux/features/users/userSlice";
import { updateRoomName, getRoomsByMongoDbUserId, setLoading } from "../../redux/features/rooms/roomSlice";


const renameRoomAndSyncData = async (dispatch, roomId, mongoDbUserId, groupName, username, originalRoomName) => {
   
  try {
    // create new room and sync data
    await Promise.resolve(
      dispatch(
        updateRoomName({
            roomId: roomId,
            originalRoomName: originalRoomName,
            newRoomName: groupName,
            updatedById: mongoDbUserId,
            updatedByUsername: username
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
        console.log("Create updating room name: ", error.message);
  }

};

export default renameRoomAndSyncData