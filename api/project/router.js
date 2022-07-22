const express = require('express')
const Projects = require('./model')


const router = express.Router()

router.get('/', (req, res, next) => {
    Projects.getAll()
        .then(project => {
            res.json(project)
        })
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    Projects.getById(req.params.id)
        .then(project => {
            res.json(project)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
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