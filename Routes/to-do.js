const express=require('express')
const router=express.Router()
const {update,deletetodo,get,getall,create}=require('../controller/to-do')

router.get('/',getall)
router.post('/',create)
router.get('/:id',get)
router.patch('/:id',update)
router.delete('/:id',deletetodo)

module.exports=router