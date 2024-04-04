const {Task} = require('../models/task')
exports.createTask = async (req, res) => {
    try {
        const {title,description,start_from,end_to} = req.body
        const createTask = await Task.findOne({
            where: { user_id: req.user_id,title }
        })
        if(createTask){
            return res.send({message:'task already created'})
        }
    } catch (error) {
        return res.status(500).send('unable to create')

    }
}


exports.getAllTask = async (req, res) => {
    try {
        let task = await task.findAndCountAll({
            where: {
                user_id: req.user_id
            }
        })
        return res.status(200).send({ message: 'find all users', data: task })
    } catch (error) {
        res.status(200).send({ message: error.message })

    }
}