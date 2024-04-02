const dotenv = require('dotenv').config();
const User = require("../models/taskModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = process.env.secretToken
exports.createUser = async (req, res) => {
    try {
        let { userName, email, password } = req.body;
        if (!(userName && email && password)) {
            res.status(400).send('All fields are compulsory')
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(401).send('User already exist')
            const hashedpassword = await bcrypt.hash(password, 10)

            const user = await User.create({
                userName,
                email,
                password: hashedpassword
            })
            
            let token = jwt.sign({ name: 'jayesh' }, '', { expiresIn: '1d' })
            user.token = token
            user.password = null


            res.status.json(user)

        }
    } catch (error) {
        console.log(error);

    }

}
exports.updatedUser = async (req, res) => {
    try {
        let { userName, email, password } = req.body;
        let updatedUser = {
            userName,
            password: password,
            email: email
        }
        await User.update(updatedUser, {
            where: {
                userName
            }
        })
        let user = await User.findOne({ userName })
        res.status(200).send('User updated')
    } catch (error) {
        console.log(error);
    }

}


exports.deleteUser = async (req, res) => {
    try {
        let { id } = req.body;
        const user = await User.update({
            status: 'inactive'
        },
            {
                where: { id }
            })
        res.status(400).send(user)
    } catch (error) {
        res.send(error)

    }
}