const { Task } = require('../models/task')
exports.createTask = async (req, res) => {
    try {
        const { title, description, start_from, end_to } = req.body
        if(!(title)){
            return res.send('please enter title')
        }
        const record = new Task({
            title,
            description,
            user_id: req.user_id,
            start_from,
            end_to
        })
        let respond = await record.save()
        return res.status(201).send({ message: 'task created', data: respond })
    } catch (error) {
        return res.status(500).send('unable to create')

    }
}


exports.getAllTask = async (req, res) => {
    try {
        let task = await Task.findAndCountAll({
            where: {
                user_id: req.user_id
            },
            attributes:['id','title']
            
        })
        return res.status(200).send({ message: 'find all users', data: task })
    } catch (error) {
        return res.status(200).send({ message: error.message })

    }
}

exports.updateTask=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}