const TodoTask = require('../models/Todo')

module.exports = {
    getEdit: (req, res)=> {
        const id = req.params.id
        TodoTask.find({}, (err, tasks) => {
            res.render('edit.ejs', {
                todoTasks:tasks, idTask: id
            })
        });
    },
    deleteTask: (req, res) => {
        const id = req.params.id;
        TodoTask.findByIdAndRemove(id, err =>{
            if(err) return res.send(500, err);
            res.redirect('/todos');
        })
    },
    updateTask: async (req, res)=>{
    try{
        const id = req.params.id
        await TodoTask.findByIdAndUpdate(
            id,{todo: req.body.todoItem})
        console.log('Task has been update!')
        res.redirect('/todos')
    }catch(err){
        console.log(err)
    }
},
}