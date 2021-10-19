import { App as app  } from "./index.js"

interface data {
    items: Array<object>
    nextPageToken: string
    pageInfo: object
}

(async function() {
    console.log('Boot loader from app!')

    const request = {
        method: 'GET',
        headers: { Authorization: '' }
    }
    
    const endpoint = {
        baseURL: "https://youtube.googleapis.com/youtube/v3",
        resource: "search"
    }
    
    const params = {
        part: 'snippet',
        q: 'primata falante',
        type: 'video',
        key: ''
    }

    const fetchVideos = app.search(endpoint, params, request)
    let data: data
    
    await fetchVideos
        .then(response => data = response )
        .catch(error => data = error)
})()


