const bcrypt = require('bcrypt')
const { User } = require('../models/User')
const jwt = require('jsonwebtoken');
const { _auth } = require('../configs');
const { sendMail } = require('./node_mailer');

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
            return res.status(200).send({ token })
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
        let updatedUser = { userName }

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
        const user = await User.update({
            status: 'inactive'
        },
            {
                where: { id: user_id }
            })
        return res.status(400).send(user)
    } catch (error) {
        return res.send(error)

    }
}

exports.sendMailForFogotPass = async (req, res) => {
    try {
        const { email } = req.body
        if(!email){
            return res.status(404).send({message:'email is required '})
        }
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) {
            return res.status(400).send({ message: `user does'nt exist` })
        }
        let newPassword = 'deffed' + user.userName + 'abccba'
        user.password = await bcrypt.hash(newPassword, 10)
        await user.save()
        const mailTemplate = `
    Hello ${user.userName},
    Your password has been updated and now 
    your password is <h2 style={{color:'green'}}>${newPassword}</h2>.
    Kindly reset your password as per your convience
    `
        await sendMail(user.email, 'Fogot Password', mailTemplate)
        return res.status(200).send({ message: 'Mail send successfully' })
    } catch (error) {
        return res.status(400).send({ message: error.message })

    }
}