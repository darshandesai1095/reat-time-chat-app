import { updateRoomName, setLoading, updateRoomNameReducer } from "../../redux/features/rooms/roomSlice";
import { updateRoomNameInChatLogReducer } from "../../redux/features/chatLogs/chatLogSlice";


const renameRoomAndSyncData = async (dispatch, roomId, mongoDbUserId, groupName, username, originalRoomName) => {
   
  try {
    dispatch(
      updateRoomNameReducer({
        roomId: roomId,
        roomName: groupName,
      })
    )

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

    dispatch(
      updateRoomNameInChatLogReducer({
        roomId: roomId,
        newRoomName: groupName
      })
    )


    // update user slice
    // await Promise.resolve(
    //   dispatch(
    //     getUserByMongoDbUserId({
    //         userId: mongoDbUserId,
    //     })
    //   )
    // );
          
    // update room slice
    // await Promise.resolve(
    //     dispatch(
    //         getRoomsByMongoDbUserId(mongoDbUserId)
    //     )
    // );

    dispatch(setLoading(false))

  } catch (error) {
        console.log("Error updating room name: ", error.message);
  }

};

export default renameRoomAndSyncData