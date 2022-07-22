// build your `/api/tasks` router here
const express = require('express')
const Tasks = require('./model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Tasks.getAll()
        .then(tasks => {
            res.json(tasks)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    Tasks.insert(req.body)
        .then(task => {
            res.json(task)
        })
        .catch(next)
})

router.use((err, req, res, next) =>{
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
})

module.exports = router