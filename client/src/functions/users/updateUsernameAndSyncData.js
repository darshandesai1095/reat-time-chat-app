import { updateUsername } from "../../redux/features/users/userSlice";
import { setLoading } from "../../redux/features/rooms/roomSlice";

const updateUsernameAndSyncData = async (dispatch, mongoDbUserId, newUsername) => {
    try {
        dispatch(setLoading(true))

        // create new room and sync data
        await Promise.resolve(
            dispatch(
                updateUsername({
                    userId: mongoDbUserId,
                    newUsername: newUsername
                })
            )
        )

        // // update user slice
        // await Promise.resolve(
        //     dispatch(
        //         getUserByMongoDbUserId({
        //             userId: mongoDbUserId,
        //         })
        //     )
        // )

            
        // // update room slice
        // await Promise.resolve(
        //     dispatch(
        //         getRoomsByMongoDbUserId(mongoDbUserId)
        //     )
        // )

        dispatch(setLoading(false))

    } catch (error) {
        dispatch(setLoading(false))
        console.log("Update username error: ", error)
    }

}

export default updateUsernameAndSyncData