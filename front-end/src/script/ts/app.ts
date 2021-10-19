import { config } from './config/config.js'
import { App as app  } from "./index.js"




interface data {
    items: Array<object>
    nextPageToken: string
    pageInfo: object
}

(async function() {
    console.log('Boot loader from app!!!...')

    const request = {
        method: 'GET',
        headers: { Authorization: config.api.key }
    }
    
    const endpoint = {
        baseURL: config.server.baseURL,
        resource: "videos"
    }
    
    const params = {
        part: 'snippet',
        q: 'primata falante',
        type: 'video',
        key: config.api.key  
    }

    const fetchVideos = app.search(endpoint, params, request)
    let data: data
    
    await fetchVideos
        .then(response => {
            console.log(response)
            data = response
        })
        .catch(error => data = error)
})()


