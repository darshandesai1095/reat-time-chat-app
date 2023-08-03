import { getUserByMongoDbUserId } from "../../redux/features/users/userSlice";
import { updateRoomName, getRoomsByMongoDbUserId } from "../../redux/features/rooms/roomSlice";


const renameRoomAndSyncData = async (dispatch, roomId, mongoDbUserId, groupName) => {
   
  try {
    // create new room and sync data
    await Promise.resolve(
      dispatch(
        updateRoomName({
            roomId: roomId,
            newRoomName: groupName,
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
        console.log("Create updating room name: ", error.message);
  }

};

export default renameRoomAndSyncData