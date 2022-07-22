// build your `Project` model here
const db = require('../../data/dbConfig')



function getAll() {
    return db('projects')
        .then(projects =>
            projects.map(p => ({
                ...p,
                project_completed: p.project_completed ? true : false
            }))
        )
        .catch(err => err)
}

function getById(id) {
    return db('projects')
        .where('project_id', id)
        .first()
        .then(project => {
           return {...project, project_completed: project.project_completed ? true : false }
         })
        .catch(err => console.log(err)) 
} 

function insert(project) {
    return db('projects')
        .insert(project)
        .then(id => getById(id[0]))
}

module.exports = {
    getAll,
    getById,
    insert
}