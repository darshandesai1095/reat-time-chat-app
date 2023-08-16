

export const getLastActiveFromLocalStorage = (userId) => {
    try {
        return JSON.parse(localStorage.getItem(`activityLog_${userId}`)) || {}
    } catch (error) {
        return console.log(error.message)
    }
}

export const setLastActiveInLocalStorage = (userId, updatedActivityLog) => {
    try {
        localStorage.setItem(`activityLog_${userId}`, JSON.stringify(updatedActivityLog))
        return
    } catch (error) {
        return console.log(error.message)
    }
}