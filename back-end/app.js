const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
const port = 8080

app.use(cors())

app.get('/videos', async (req, res) => {

  const baseURL = 'https://youtube.googleapis.com/youtube/v3'
  const resource= 'search'  
  const { key, part, type, q } = req.query
  const endpoint = `${baseURL}/${resource}?part=${part}&q=${q}&key=${key}`
  const request = JSON.stringify({'Authorization': `${key}`})

  await axios.get(endpoint, request)
    .then(response => res.json(response.data))
    .catch(error => console.log(error))
  
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})