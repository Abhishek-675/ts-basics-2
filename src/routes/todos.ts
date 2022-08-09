import { Router } from "express";

import { Todo } from "../models/todo";

let todos: Todo[] = [];

const router = Router();

type RequestBody = {text: string};
type RequestParams = {todoId: string};

router.get('/', (req, res) => {
    res.status(200).json({ todos: todos });
});

//post
router.post('/todos', (req, res) => {
    try{
        const body = req.body as RequestBody;
        const newTodo: Todo = {
            id: new Date().toISOString(),
            text: body.text
        };
        todos.push(newTodo);
        res.status(201).json({ message: "success", todos: todos});
    } catch(err) {
        res.status(404).json({message: 'failed'});
    }
});

//delete
router.delete('/delete/:todoId', (req, res) => {
    try {
        const params = req.params as RequestParams;
        todos = todos.filter((todoItem) => todoItem.id !== params.todoId);
        res.status(200).json({ message: 'deleted', todos: todos });
    } catch(err) {
        res.status(404).json({message: 'failed'});
    }
});

//edit
router.put('/edit/:todoId', (req, res) => {
    try{
        const params = req.params as RequestParams;
        const body = req.body as RequestBody;
        const todoIndex = todos.findIndex(todoItem => todoItem.id === params.todoId);
        if (todoIndex >= 0) {
            todos[todoIndex] = {id: todos[todoIndex].id, text: body.text};
            return res.status(200).json({message: 'edited successfully', todos: todos});
        }
    } catch(err) {
        res.status(404).json({message: 'something went wrong', todos: todos});
    }
})

export default router;