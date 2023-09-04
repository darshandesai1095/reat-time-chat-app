
const testController = {

    testFunc: async (req, res) => {
        console.log("running test function...")
        res.status(400).send("it works")
    }

}

module.exports = testController