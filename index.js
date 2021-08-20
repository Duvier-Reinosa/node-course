const { request, response } = require('express')
const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())
app.use(express.json())


let notes = [
    {
        "id": 1,
        "content": "repasar los retos",
        "date": "2019-05-30-30T18:39:34.091Z",
        "important": true
    },
    {
        "id": 2,
        "content": "matar los retos",
        "date": "2019-05-30-30T18:39:34.091Z",
        "important": false
    },
    {
        "id": 3,
        "content": "repasar los retos",
        "date": "2019-05-30-30T18:39:34.091Z",
        "important": true
    }
]

app.get('/', (request, response) => {
    response.send('<h1>hello world</h1>')
})

app.get('/api/notes', (request, response) =>{
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) =>{
    const id = Number(request.params.id)
    const note = notes.find( note => note.id === id)
    if (note) {
        response.json(note) 
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) =>{
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

app.post('/api/notes', (request, response) =>{
    const note = request.body
    
    if (!note || !note.content) {
        return response.status(400).json({
            error: 'note.content is missing'
        })
    }

    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        content : note.content,
        important: typeof note.important !== 'undefined' ? note.important : false,
        date: new Date().toISOString()
    }

    notes = [...notes, newNote]

    response.status(201).json(newNote)
})
app.use((request, response) => {
    response.status(404).json({
        error: 'Not found'
    })
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Srver running on port ${PORT}`)
})
