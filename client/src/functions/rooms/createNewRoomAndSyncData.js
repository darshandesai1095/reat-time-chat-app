import { getUserByMongoDbUserId } from "../../redux/features/users/userSlice";
import { createNewRoom, getRoomsByMongoDbUserId, setLoading } from "../../redux/features/rooms/roomSlice";
import { getNewChatLogData } from "../../redux/features/chatLogs/chatLogSlice";


const createNewRoomAndSyncData = async (dispatch, mongoDbUserId, groupName, emails) => {
   
  try {
    // create new room and sync data
    await Promise.resolve(
      dispatch(
        createNewRoom({
          userId: mongoDbUserId,
          roomName: groupName,
          membersArray: emails,
        })
      )
    );

    // // update user slice
    // await Promise.resolve(
    //   dispatch(
    //     getUserByMongoDbUserId({
    //       userId: mongoDbUserId,
    //     })
    //   )
    // );

    // // update room slice
    // await Promise.resolve(
    //     dispatch(
    //         getRoomsByMongoDbUserId(mongoDbUserId)
    //     )
    // );

    dispatch(setLoading(false))

  } catch (error) {
        console.log("Create new room error: ", error.message);
        dispatch(setLoading(false))
  }

};

export default createNewRoomAndSyncData