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
    
    public static search(endpoint: endpoint, params: params, request: RequestInit) {
        
        const { baseURL, resource } = endpoint
        
        return !params ? fetch(`${baseURL}/${resource}`, request).then(data => data.json()) : 
        params.type ? fetch(`${baseURL}/${resource}?part=${params.part}&q=${params.q}&type=${params.type}`, request).then(data => data.json()) : 
        fetch(`${baseURL}/${resource}?part=${params.part}&q=${params.q}`, request).then(data => data.json())

    }
}


export { App }