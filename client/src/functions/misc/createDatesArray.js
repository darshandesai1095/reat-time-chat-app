const createDatesArray = () => {
    let datesArray = ["Day"]
    for (let i=1; i<32; i++) {
        datesArray[i] = i
    }
    return datesArray
}

export default createDatesArray