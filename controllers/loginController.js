const User = require("../models/taskModel");
const bcrypt = require('bcrypt')

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
         return    res.status(400).send('something went wrong')

        }
        const user = await User.findOne({where:{email}})
        if (user) {
            res.status(400).send('user doesn,t exist')

        }
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { id },
                { expiresIn: "2h" }
            )
            user[token] = token
            user[password] = undefined
        }

    } catch (error) {

    }
} 
