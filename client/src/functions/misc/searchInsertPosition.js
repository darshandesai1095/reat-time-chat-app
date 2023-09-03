import convertToUnixTimestamp from "./convertToUnixTimestamp"

const searchInsertPosition = (messagesArray=[], lastActive=0) => {

    if (!messagesArray || !lastActive || messagesArray.length === 0) return 0

    try {

        // create array of 'dateCreated' timestamps from chatLogsArray
        const dateCreatedTimestampsArray = messagesArray?.map(messageObj => convertToUnixTimestamp(messageObj.dateCreated))
    
        // perform search to find interst position of last active
        const insertPosition = dateCreatedTimestampsArray.findIndex(timestamp => timestamp >= lastActive)
    
        if (insertPosition === -1) {
            return 0
        }
    
        // inboxCount ~= length - insert position
        const inboxCount = dateCreatedTimestampsArray.length - insertPosition
    
        return inboxCount

    } catch (error) {
        console.log("searchInsertPosition", error)
    }

    return 0

}

export default searchInsertPosition


