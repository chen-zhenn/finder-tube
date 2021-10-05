interface endpoint {
    baseURL: string
    resource: string
}

interface params {
    part: string
    q: string
    type: string
}


abstract class App {
    
    public static search(endpoint: endpoint, params: params) {
        
        const { baseURL, resource } = endpoint
        
        return !params ? fetch(`${baseURL}/${resource}`).then(data => data.json()) : 
        params.type ? fetch(`${baseURL}/${resource}?part=${params.part}&q=${params.q}&type=${params.type}`).then(data => data.json()) : 
        fetch(`${baseURL}/${resource}?part=${params.part}&q=${params.q}`).then(data => data.json())

    }
}


export { App }