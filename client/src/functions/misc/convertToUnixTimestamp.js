// 2023-08-10T01:33:18.378Z -> 1692151109190
const convertToUnixTimestamp =(dateOrTimestamp) => {
    let unixTimestamp
  
    if (typeof dateOrTimestamp === 'string') {
        unixTimestamp = Date.parse(dateOrTimestamp)
    } else if (typeof dateOrTimestamp === 'number') {
        unixTimestamp = dateOrTimestamp
    } else {
        return null // Invalid input
    }
  
    return unixTimestamp;
}

export default convertToUnixTimestamp