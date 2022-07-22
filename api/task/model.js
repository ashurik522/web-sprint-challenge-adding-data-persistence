// build your `Task` model here
const db = require('../../data/dbConfig')

function getAll() {
    return db('tasks')
        .join('projects', 'tasks.project_id', 'projects.project_id')
        .select(
            'task_id', 
            'task_description',
             'task_notes', 
             'task_completed', 
             'project_name', 
             'project_description'
        )
        .then(tasks =>
            tasks.map(p => ({
                ...p,
                task_completed: p.task_completed ? true : false
            }))
        )
        .catch(err => console.log(err))
}

function getById(id) {
    return db('tasks')
        .where('task_id', id)
        .first()
        .then(task => {
           return {...task, task_completed: task.task_completed ? true : false }
         })
        .catch(err => console.log(err)) 
} 

function insert(task) {
    return db('tasks')
        .insert(task)   
        .then(id => getById(id[0]))
}

module.exports = {
    getAll,
    insert
}