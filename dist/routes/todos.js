"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.status(200).json({ todos: todos });
});
//post
router.post('/todos', (req, res) => {
    try {
        const body = req.body;
        const newTodo = {
            id: new Date().toISOString(),
            text: body.text
        };
        todos.push(newTodo);
        res.status(201).json({ message: "success", todos: todos });
    }
    catch (err) {
        res.status(404).json({ message: 'failed' });
    }
});
//delete
router.delete('/delete/:todoId', (req, res) => {
    try {
        const params = req.params;
        todos = todos.filter((todoItem) => todoItem.id !== params.todoId);
        res.status(200).json({ message: 'deleted', todos: todos });
    }
    catch (err) {
        res.status(404).json({ message: 'failed' });
    }
});
//edit
router.put('/edit/:todoId', (req, res) => {
    try {
        const params = req.params;
        const body = req.body;
        const todoIndex = todos.findIndex(todoItem => todoItem.id === params.todoId);
        if (todoIndex >= 0) {
            todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
            return res.status(200).json({ message: 'edited successfully', todos: todos });
        }
    }
    catch (err) {
        res.status(404).json({ message: 'something went wrong', todos: todos });
    }
});
exports.default = router;
