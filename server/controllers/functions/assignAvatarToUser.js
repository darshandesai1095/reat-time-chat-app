const { lettersArray, imagesArray } = require('./imagesArray')

const assignAvatarToUser = (name) => {
    const rand1 = Math.floor(Math.random()*2)
    console.log("f,name", name)
    console.log("f,rand1", rand1)
    if ( name && (rand1 < 1) ) {
        const firstLetterCharCode = name.toUpperCase().charCodeAt(0)
        console.log("f,firstLetterCharCode", firstLetterCharCode)
        if (firstLetterCharCode >= 65 && firstLetterCharCode <= 90) {
            return lettersArray[firstLetterCharCode-65]
        }
    }

    const rand2 = Math.floor(Math.random()*imagesArray.length)
    return imagesArray[rand2]

}

module.exports = { assignAvatarToUser }