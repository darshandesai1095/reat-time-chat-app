import { createNewRoom, setLoading } from "../../redux/features/rooms/roomSlice";


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