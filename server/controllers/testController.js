
const testController = {

    testFunc: async (req, res) => {
        console.log("running test function...")
        res.status(400).send("it works")
    },

    healthChech: async (req, res) => {
        res.status(200)
    }

}

module.exports = testController