const { Router } = require('express')
const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../utils/jsonwebtoken')


class RouterClass {  // suggar syntax proto function RouterClass (){}
    constructor(){
        this.router = Router()
        this.init()
    }

    getRouter(){
        return this.router
    }
    
    init(){} // este método inti sera para clases heredadas

    applyCallbacks(callbacks){
        // acciones a tomar
        return callbacks.map(callbacks => async (...params)=>{
            try {
                await callbacks.apply(this, params)
            } catch (error) {
                console.log(error)
                params[1].status(500).send(error)
            }
        })
    }

    generateCustomResponses(req, res, next){
        res.sendSuccess = payload => res.send({status: 'success', payload})
        res.sendServerError = error => res.send({status: 'error', error})
        res.sendUserError = error => res.send({status: 'error', error})
        next()
    }

    handlePolicies = policies => (req, res, next) =>{
        // tomar de  los headers jwt 
        // validar role
        if(policies[0] === 'PUBLIC') return next()
        const authHeaders = req.headers.authorization
        if(!authHeaders) return res.status(401).send({status: 'error', error: 'Unauthorized'})
        let token = authHeaders.split(' ')[1]
        console.log(token)
        let user = jwt.verify(token, PRIVATE_KEY)
        console.log(user)
        if(!policies.includes(user.role.toUpperCase())) return res.status(403).send({status: 'error', error: 'not permissions'})
        req.user = user
        next()
    }

    get(path, policies,...callbacks){ // ['public', 'user']
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks))
    }
    post(path, policies,...callbacks){ // ['public', 'user']
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks))
    }
    put(path, policies,...callbacks){ // ['public', 'user']
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks))
    }
    delte(path, policies,...callbacks){ // ['public', 'user']
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks))
    }
    

}


module.exports = {
    RouterClass
}

