const bcrypt = require('bcrypt')
const { User } = require('../models/User')
const jwt = require('jsonwebtoken');
const { _auth } = require('../configs');
const { sendMail } = require('../utils/node_mailer');
const { comparePassword } = require('../utils/comparePassword');
const { Op } = require('sequelize');
const validator = require('validator');
const { response } = require('express');

exports.createUser = async (req, res) => {
    try {
        let { userName, email, password } = req.body;
        if (!(userName && email && password)) {
            return res.status(400).send('All fields are compulsory')
        }
        if(!validator.isEmail(email)){
            return res.status(400).send({message:'Invalid email'})
        }
        const existingUser = await User.findOne({ where: { email: email } })
        if (existingUser) {
            return res.status(401).send('User already exist')
        } else {
            const hashedpassword = await bcrypt.hash(password, 10)
            const user = await User.create({
                userName: userName,
                email: email,
                password: hashedpassword
            })

            let token = jwt.sign({ id: user.id }, 'anykey')
            user["token"] = token
            user["password"] = null

            return res.status(200).send({ user, token })
        }
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }

}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).send('please provide valid password & email')

        }
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(400).send('user doesn,t exist')

        }
        let comparePassword = await bcrypt.compare(password, user.password)
        if (comparePassword) {
            const token = jwt.sign({ id: user.id }, _auth.jwtSecretKey)
            let response={
                userName:user.userName,
                email:user.email,
                token
            }
            return res.status(200).send(response)
        } else {
            return res.status(400).send('incorrect password')

        }

    } catch (error) {
        return res.status(500).send({ error: error.message })

    }
}
exports.updatedUser = async (req, res) => {
    try {
        let { userName, email, password } = req.body;
        let updatedUser = {
            userName,
        }
        const user = await User.findOne({ where: { id: req.user_id } })
        if (!user) {
            return res.status(404).send('User not found')
        }
        user.userName = updatedUser.userName
        await user.save()
        return res.status(200).send({ message: 'User updated', user })
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }

}


exports.deleteUser = async (req, res) => {
    try {
        let user_id = req.user_id
        await User.update({
            status: 'inactive'
        },
            {
                where: { id: user_id }
            })
        return res.status(400).send({message:'user deleted successfully'})
    } catch (error) {
        return res.send(error)

    }
}

exports.sendMailForFogotPass = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(404).send({ message: 'email is required ' })
        }
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) {
            return res.status(400).send({ message: `user doesn't exist` })
        }
        let newPassword = 'deffed' + user.userName + 'abccba'
        user.password = await bcrypt.hash(newPassword, 10)

        await user.save()
        const mailTemplate = `
    Hello ${user.userName},
    Your password has been updated and now 
    your password is <h2>${newPassword}</h2>.
    Kindly reset your password as per your convenience
    `
        await sendMail(user.email, 'Fogot Password', mailTemplate)
        return res.status(200).send({ message: 'Mail send successfully' })
    } catch (error) {
        return res.status(400).send({ message: error.message })

    }
}


exports.resetPassword = async (req, res) => {
    // const user_id=req.user_id
    try {
        const { user_id } = req;
        const { email, password, newPassword } = req.body;
        if (!email || !password || !newPassword) {
            return res.status(400).send({ message: 'all fields are required' })
        }
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(400).send({ message: 'user not found' })
        }

        let result = await bcrypt.compare(password, user.password)
        if (!result) {
            return res.status(400).send({ message: "invalid password" })
        }
        user.password = await bcrypt.hash(newPassword, 10)
        await user.save()
        return res.status(201).send({ message: "password reset successfully!" })
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}