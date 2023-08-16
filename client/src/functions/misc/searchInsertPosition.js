import convertToUnixTimestamp from "./convertToUnixTimestamp"

const searchInsertPosition = (messagesArray, lastActive) => {

    if (!messagesArray || !lastActive) return 0

    // create array of 'dateCreated' timestamps from chatLogsArray
    const dateCreatedTimestampsArray = messagesArray.map(messageObj => convertToUnixTimestamp(messageObj.dateCreated))
    console.log("dateCreatedTimestampsArray", dateCreatedTimestampsArray.map(val => val/1000000000))
    console.log("lastActive", lastActive/1000000000)

    // perform search to find interst position of last active
    const insertPosition = dateCreatedTimestampsArray.findIndex(timestamp => timestamp >= lastActive)
    console.log("insertPosition", insertPosition)

    if (insertPosition === -1) {
        return 0
    }

    // inboxCount ~= length - insert position
    const inboxCount = dateCreatedTimestampsArray.length - insertPosition

    return inboxCount
}

export default searchInsertPosition


