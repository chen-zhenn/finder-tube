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
        
        !params ? fetch(`${baseURL}/${resource}`).then(res => res.json()) : 
        params.type ? fetch(`${baseURL}/${resource}?part=${params.part}&q=${params.q}&type=${params.type}`).then(res => res.json()) : 
        fetch(`${baseURL}/${resource}?part=${params.part}&q=${params.q}`).then(res => res.json())

    }
}


export { App }