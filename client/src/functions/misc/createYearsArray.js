const createYearsArray = () => {
    let yearsArray = ["Year"]
    for (let i=2023; i>1899; i--) {
        yearsArray.push(i)
    }
    return yearsArray
}

export default createYearsArray