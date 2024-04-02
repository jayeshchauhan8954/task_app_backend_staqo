const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt')
const {User}=require('../models/signupModel')
const jwt = require('jsonwebtoken')
const secretKey = process.env.secretToken

exports.createUser = async (req, res) => {
    try {
        let { userName, email, password } = req.body;
        if (!(userName && email && password)) {
            return res.status(400).send('All fields are compulsory')
        }
        const existingUser = await User.findOne({ where: { email: email } })
        if (existingUser) {
            return res.status(401).send('User already exist')
        } else {
            const hashedpassword = await bcrypt.hash(password, 10)
            const user = await User.create({
                userName,
                email,
                password: hashedpassword
            })

            let token = jwt.sign({ id: user.id }, 'anykey')
            user["token"] = token
            user["password"] = null

            return res.status(200).send({ user, token })
        }
    } catch (error) {
        return res.send(error)
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