import { getUserByMongoDbUserId, updateUserProfilePicture } from "../../redux/features/users/userSlice";
import { getRoomsByMongoDbUserId, setLoading } from "../../redux/features/rooms/roomSlice";


const updateProfilePictureAndSyncData = async (dispatch, mongoDbUserId, newPictureUrl) => {
   
  try {
    dispatch(setLoading(true))

    // update profile pic
    await Promise.resolve(
      dispatch(
        updateUserProfilePicture({
            userId: mongoDbUserId,
            updatedUserProfilePictureUrl: newPictureUrl
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
    );

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

export default updateProfilePictureAndSyncData