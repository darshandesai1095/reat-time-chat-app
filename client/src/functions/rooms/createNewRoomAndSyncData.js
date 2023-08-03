import { getUserByMongoDbUserId } from "../../redux/features/users/userSlice";
import { createNewRoom, getRoomsByMongoDbUserId } from "../../redux/features/rooms/roomSlice";


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
        console.log("Create new room error: ", error.message);
  }

};

export default createNewRoomAndSyncData