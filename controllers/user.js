const User = require('../model/user')

const addUser = async (req, res) => {

    // Write the code to add the user
    try {
        const {
            email,
            username,
            password,
            productList
        } = req.body;        

        if (!email && !username && !password && !productList) {
            return res.status(400).send("All input are required");
        }
        const existingUser = await User.findOne({email});
        console.log(existingUser);
        if(existingUser){
            return res.status(409).send("User already exists");
        }
        const user = await User.create({
            email: email,
            username: username,
            password: password,
            productList: productList
        });
        let data = {
            time: Date(),
            userId: 12,
        };

        return res.status(201).send("Created");

    } catch (error) {
        console.log(error);
    }

}

module.exports = addUser;