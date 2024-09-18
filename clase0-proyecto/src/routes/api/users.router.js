const { Router } = require('express')
const { userModel } = require('../../models/users.model.js')
// import express from 'express'

const router = Router()
// configuración de los endpoint 

const midd1 = (req, res, next) => {
    console.log('middleware')
    next()
}
// traer todos los usuarios
router.get('/', midd1 , async (req, res)=>{
    try {
        const users = await userModel.find()
        res.send({status: 'success', data: users})
        
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    const { first_name, last_name, email } = req.body

    if (!email) {
        return res.send({status: 'error', error: 'faltan llenar campos'})
    }

    const result = await userModel.create({ first_name, last_name, email})

    res.send({ status: 'success', data: result })
})

router.get('/:uid', async (req, res)=>{
    const { uid } = req.params
    const user = await userModel.findOne({_id: uid})
    res.send({status: 'success', data: user})
})
router.put('/:uid', async (req, res)=>{
    const { uid } = req.params

    const { first_name, last_name, email } = req.body

    if (!email) {
        return res.send({status: 'error', error: 'faltan llenar campos'})
    }
    const userToUpdate = {
        first_name,
        last_name,
        email
    }
    const result = await userModel.findByIdAndUpdate({_id: uid}, userToUpdate)

    res.send({status: 'success', data: result})
})
router.delete('/:uid', async (req, res)=>{
    const { uid } = req.params
    const result = await userModel.findByIdAndDelete({_id: uid})
    res.send({status: 'success', data: result})
})


// export default router
module.exports = router
// async await

// ESquema === la estructura de los  documentos mongo