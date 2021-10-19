const chai = require("chai")
const expect = chai.expect
const sinon = require("sinon")
const sinonChai = require("sinon-chai")
const sinonStubPromise = require("sinon-stub-promise")
const fetch = require("node-fetch")

chai.use(sinonChai)
sinonStubPromise(sinon)
global.fetch = fetch

const tube = require("../script/js/index.js").Tube

describe('Finder tube App', () => {

    describe('Smoke Test', () => {

        it('Should exist the class Tube', () => {
            expect(tube).to.be.exist
        })

        it('Should exist the search method in class Tube', () => {
            expect(tube.search).to.be.exist
        })

    })

    describe('Search method', () => {

        let fetchStub,promise,request,headers,endpoint,params,data

        request = {}
        headers = {}
        params = {}

        endpoint = {
            baseURL: 'https://youtube.googleapis.com/youtube/v3',
            resource: 'search'
        }

        // Hook's
        beforeEach(() => {
            fetchStub =  sinon.stub(global, 'fetch')
            promise = fetchStub.returnsPromise()
            headers.Authorization = '1234'
            request.method = 'GET'
            request.headers = headers
            
        })

        afterEach(() => {
            fetchStub.restore()
        })

        
        it('Should call a fetch', () => {
            tube.search(endpoint)

        })


        it('Should receive key(API key) as key(Authorization)/value(key) in header and a valid endpoint to fetch', () => {
                    
            tube.search(endpoint, null, request)
            expect(fetchStub).to.have.been.calledWith(`${endpoint.baseURL}/${endpoint.resource}`, request)

        })

        it('Should receive query parameter to fetch', () => {

            context("Passing 'part' and 'q' as required  parameters", () => {

                params.part = 'snippet'
                params.q = ''
                params.key = '1234'
    
                tube.search(endpoint, params, request)
                expect(fetchStub).to.have.been.calledWith(`${endpoint.baseURL}/${endpoint.resource}?part=${params.part}&q=${params.q}&key=${params.key}`, request)    
            })

            context("Passing 'type' as optional parameter", () => {

                params.part = 'snippet'
                params.q = ''
                params.type = 'video'
                params.key = '1234'
    
                tube.search(endpoint, params, request)
                expect(fetchStub).to.have.been.calledWith(`${endpoint.baseURL}/${endpoint.resource}?part=${params.part}&q=${params.q}&type=${params.type}&key=${params.key}`, request)    
            })
        })

        it('Should return JSON data from the Promise', () => {

            promise.resolves({ data: 'json' })

            params.part = 'snippet'
            params.q = ''
            data = tube.search(endpoint, params)

            expect(data.resolveValue).to.be.eql({ data: 'json' })
        })
    })
})