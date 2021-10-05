const chai = require("chai")
const expect = chai.expect
const sinon = require("sinon")
const sinonChai = require("sinon-chai")
const sinonStubPromise = require("sinon-stub-promise")
const fetch = require("node-fetch")

chai.use(sinonChai)
sinonStubPromise(sinon)
global.fetch = fetch

const App = require("../script/js/index.js").App


describe('App', () => {

    describe('Smoke Test', () => {

        it('Should exist the class App', () => {
            expect(App).to.be.exist
        })

        it('Should exist the search method in class App', () => {
            expect(App.search).to.be.exist
        })

    })

    describe('Search method', () => {

        let fetchStub,promise,endpoint,params

        endpoint = {
            baseURL: 'https://youtube.googleapis.com/youtube/v3',
            resource: 'search'
        }

        params = {}

        // Hook's
        beforeEach(() => {
            fetchStub =  sinon.stub(global, 'fetch')
            fetchStub.returnsPromise()
            
        })

        afterEach(() => {
            fetchStub.restore()
        })

        
        it('Should call a fetch', () => {
            App.search(endpoint)

        })

        it('Should receive a valid endpoint to fetch', () => {
            
            App.search(endpoint)
            expect(fetchStub).to.have.been.calledWith(`${endpoint.baseURL}/${endpoint.resource}`)

        })

        it('Should receive query parameter to fetch', () => {

            context("Passing 'part' and 'q' as required  parameters", () => {

                params.part = 'snippet'
                params.q = ''
    
                App.search(endpoint, params)
                expect(fetchStub).to.have.been.calledWith(`${endpoint.baseURL}/${endpoint.resource}?part=${params.part}&q=${params.q}`)    
            })

            context("Passing 'type' as optional parameter", () => {

                params.part = 'snippet'
                params.q = ''
                params.type = 'video'
    
                App.search(endpoint, params)
                expect(fetchStub).to.have.been.calledWith(`${endpoint.baseURL}/${endpoint.resource}?part=${params.part}&q=${params.q}&type=${params.type}`)    
            })


        })
    })
})