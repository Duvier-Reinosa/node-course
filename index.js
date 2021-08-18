const { request } = require('express')
const express = require('express')
const app = express()

let notes = [
    {
        "id": 1,
        "content": "repasar los retos",
        "date": "2019-05-30-30T18:39:34.091Z"
    },
    {
        "id": 2,
        "content": "matar los retos",
        "date": "2019-05-30-30T18:39:34.091Z"
    },
    {
        "id": 3,
        "content": "repasar los retos",
        "date": "2019-05-30-30T18:39:34.091Z"
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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Srver running on port ${PORT}`);
})
