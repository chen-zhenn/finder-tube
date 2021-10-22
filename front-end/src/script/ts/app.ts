import { config } from './config/config.js'
import { Tube as tube  } from "./index.js"
interface image {
    url: string
    width: string
    height: string
}
interface thumbnails {
    default: image
    medium: image
    high: image
}
interface snippet {
    title: string
    description: string
    thumbnails: thumbnails
}
interface data {
    items: Array<{ id: { videoId: string }, snippet: snippet }>
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

    const fetchVideos = tube.search(endpoint, params, request)
    
    await fetchVideos
        .then(response => updateView(response))
        .catch(error => console.log(error))

    function template(data:data): string {
        return data.items.map((item): string => {
            return `
            <article class="thumbnail__content">
                <div class="bc-heading  thumbnail__heading">
                    <h3 class="bc-heading__title  thumbnail__title">${item.snippet.title}</h3>
                </div>
                <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="blank">
                    <picture class="bc-container -image  thumbnail__container -image">
                        <img class="thumbnail__image" src="${item.snippet.thumbnails.default.url}"
                        srcset="${item.snippet.thumbnails.default.url} ${item.snippet.thumbnails.default.width}w, 
                        ${item.snippet.thumbnails.medium.url} ${item.snippet.thumbnails.medium.width}w, 
                        ${item.snippet.thumbnails.high.url} ${item.snippet.thumbnails.high.width}w" 
                        sizes="(max-width: 320px) 320px, (min-width: 779px) 480px" /> 
                    </picture>
                </a>
            </article>
            `
        }).join('')
    }

    function updateView(data:data){
        console.log(data)
        const $thumbnailSection = document.getElementById('thumbnail-section')
        
        $thumbnailSection.innerHTML = template(data)

        const $thumbnailImage = Array.from(document.querySelectorAll('.thumbnail__image'))
        $thumbnailImage.forEach((image: HTMLElement, index) => {
            image.addEventListener('load', event => {
                index < 1 ? $thumbnailSection.style.gridTemplateColumns = `repeat(auto-fit, minmax(320px, ${image.clientWidth}px))` : null
                image.parentElement.style.overflow = 'hidden'
                image.parentElement.style.height = `${image.clientHeight * .75}px`
                image.style.transform = `translateY(${((image.clientHeight - (image.clientHeight * .75)) / 2) *-1}px)`            
            })
        }) 
    }

})()




