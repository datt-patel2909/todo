const Todo=require('../model/to-do')
const asyncWrapper=require('../middleware/asyncwrapper')

const create=asyncWrapper(async(req,res)=>{
    const todo= await Todo.create(req.body)
   return res.status(201).json({ data: todo,createdAt: new Date(todo.createdAt).toLocaleString()})
})

const getall=asyncWrapper(async(req,res)=>{
    const todo=await Todo.find({})
   return res.status(201).json({todo})
})

const get=asyncWrapper(async(req,res,next)=>{
    const {id:todoId}=req.params
    const todo=await Todo.findOne({_id:todoId})
    if(!task)
    {
      return next((`No todo with ID ${todoId}`,404))
     
    }
    res.status(200).json(todo)
})

const deletetodo=asyncWrapper(async(req,res,next)=>{
    const {id:todoId}=req.params
    const todo=await Todo.findOneAndDelete({_id:todoId})
    if(!todo)
    {
      return next((`No todo with ID ${todoId}`,404))
    }
    res.status(200).json({ data:todo,deletedAt: new Date().toLocaleString()})
})

const update=asyncWrapper(async(req,res,next)=>{
     const {id:todoId}=req.params;
    const todo=await Todo.findOneAndUpdate({_id:todoId},req.body,{
      new:true,
      runValidators:true,

    })
    res.status(200).json({ data: todo,updatedAt: new Date(todo.updatedAt).toLocaleString()})
     if(!todo)
    {
      return next((`No todo with ID ${todoId}`,404))
    }
})
module.exports={update,deletetodo,get,getall,create

}