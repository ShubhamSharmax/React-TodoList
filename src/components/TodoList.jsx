import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Navbar from './Navbar';

const TodoList = () => {

    const [todos, setTodos] = useState(() => {
        const localtodos = localStorage.getItem("todos");
        return localtodos ? JSON.parse(localtodos) : [];
    });

    const [newTodo, setNewTodo] = useState("");
    const [showCompletedtodos, setShowCompletedtodos] = useState(false);
    const [edit, setEdit] = useState(null);
    const [isediting, setIsEditing] = useState(false);
    
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const addTodo = () => {
        if (newTodo.trim() === "") return;

        if(isediting){
            const updateTodos = todos.map((e) => e.id === edit ? { ...e, task: newTodo} : e);
            setTodos(updateTodos);
            setIsEditing(false);
            setEdit(null);
        }else{
            setTodos([...todos, { id: uuidv4(), task: newTodo, done: false }])
        }    
        setNewTodo('');
    };

    const deleteTodo = (id) => {
        const updateTodos = todos.filter((e) => e.id !== id);
        setTodos(updateTodos);
    }

    const completeTodo = (id) => {
        const updateTodos = todos.map((e) => {
            if (e.id === id) {
                return { ...e, done: !e.done }
            }
            return e
        });
        setTodos(updateTodos);
    }

    const editTodo = (id) =>{
        const newTodo = todos.find((e) => e.id === id);
        setNewTodo(newTodo.task);
        setIsEditing(true);
        setEdit(id);
    }

    const showHome = () => {
        setShowCompletedtodos(false);
    }

    const showCompleted = () => {
        setShowCompletedtodos(true);
    }

    const filtertodos = showCompletedtodos ? todos.filter((e) => e.done) : todos;

    return (
        <>
            <div className='bg-[#B6FFFA] h-screen'>
                <Navbar showHome={showHome} showCompleted={showCompleted} />
                <div className='container w-screen my-10 text-center m-auto'>
                    {!showCompletedtodos && (
                        <div>
                            <h1 className='font-bold text-3xl m-20 '>Create New Todo</h1>
                            <input type="text" placeholder='Add New Todo' value={newTodo} onChange={(e) => setNewTodo(e.target.value)} className='w-3/4 bg-slate-200 p-4 rounded-3xl m-2' />
                            <button onClick={addTodo} className='bg-blue-600 hover:bg-blue-800 text-white p-4 px-10 rounded-full '>{isediting ? "Save" : "Add"}</button>
                        </div>
                    )}
                    <ul className="todolist flex justify-center flex-col">
                        {filtertodos.map((item) => {
                            return <li key={item.id} className='todo flex p-4 bg-slate-200 rounded-xl w-3/4 m-auto items-center gap-3 justify-between my-3'>
                                <div className='text-left  font-serif text-blue-600  flex'>
                                    <input type="checkbox" name={item.id} onChange={() => completeTodo(item.id)} checked={item.done} id="" className='h-5 cursor-pointer mx-8 justify-start' />
                                    <p className={item.done ? 'line-through' : ""}>{item.task}</p>
                                </div>
                                <div className="buttons flex gap-4">
                                    <button onClick={() => editTodo(item.id)} className='bg-blue-600 hover:bg-blue-800 p-2 px-4 rounded-full text-white justify-end'>Edit</button>
                                    <button onClick={() => deleteTodo(item.id)} className='bg-blue-600 hover:bg-blue-800 p-2 px-4 rounded-full text-white justify-end'>delete</button>
                                </div>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default TodoList