import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Navbar from './Navbar';
import './CheckBox.css'

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

        if (isediting) {
            const updateTodos = todos.map((e) => e.id === edit ? { ...e, task: newTodo } : e);
            setTodos(updateTodos);
            setIsEditing(false);
            setEdit(null);
        } else {
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

    const editTodo = (id) => {
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

    const filtertodos = showCompletedtodos ? todos.filter((e) => e.done) : todos.filter((e) => !e.done);

    return (
        <>
            <div className='bg-[#f6e7fd]  min-h-screen'>
                <Navbar showHome={showHome} showCompleted={showCompleted} />
                <div className='container w-screen mt-4 text-center m-auto'>
                    {!showCompletedtodos && (
                        <div className='bg-[#C4C3EE] p-5 m-auto rounded-3xl max-sm:p-1 max-sm:w-11/12'>
                            <h1 className='font-bold text-[#1B1A55] text-5xl m-10 max-sm:text-2xl max-sm:m-4'>Easily Manage Your Tasks</h1>
                            <input type="text" placeholder='Add New Task' value={newTodo} onChange={(e) => setNewTodo(e.target.value)} className='w-3/5 bg-slate-200 p-4 rounded-3xl m-2 focus:outline-none max-sm:w-5/6 max-sm:m-0 max-sm:p-3'/>
                            <button onClick={addTodo} className='bg-[#3A1078] hover:bg-[#1B1A55] active:bg-[#17153B] text-white p-4 px-10 rounded-full  m-10 max-sm:m-5 max-sm:py-3 '>{isediting ? "Save" : "Add"}</button>
                        </div>
                    )}
                    <ul className="todolist flex justify-center flex-col bg-[#C4C3EE] my-2 mb-10 rounded-3xl max-sm:w-11/12 max-sm:m-auto max-sm:mt-2">                        
                        {filtertodos.length === 0 ? (<h1 className='m-10 font-semibold text-2xl max-sm:text-lg max-sm:m-2'>{!showCompletedtodos ? "Add Your First Task Using The 'Add' Button" : "There is no Completed Todos"}</h1>) : (<h1 className='m-10 font-semibold text-2xl max-sm:text-lg max-sm:m-2'>{!showCompletedtodos ?"Your Tasks" : "Your Completed Tasks"}</h1>)}
                        {filtertodos.map((item) => {
                            return <li key={item.id} className='todo flex p-3 bg-slate-200 rounded-full w-4/5 m-auto items-center gap-3 justify-between my-3 max-sm:w-11/12 max-sm:gap-1 max-sm:flex-col'>
                                <div className='text-left  font-serif text-blue-600  flex max-sm:self-start max-sm:mx-5'>
                                    <div class="checkbox-wrapper-13 mx-5 max-sm:m-0 max-sm:mr-2">
                                        <input id="c1-13" type="checkbox" name={item.id} onChange={() => completeTodo(item.id)} checked={item.done} />
                                    </div>
                                    <p className={item.done ? 'line-through opacity-50' : ""}>{item.task}</p>
                                </div>
                                <div className="buttons flex gap-4 max-sm:gap-2 max-sm:m-auto">
                                    <button onClick={() => editTodo(item.id)} className='bg-[#3A1078] hover:bg-[#1B1A55] active:bg-[#17153B] p-2 px-4 rounded-full text-white max-sm:p-1 max-sm:px-3 max-sm:text-sm'>Edit</button>
                                    <button onClick={() => deleteTodo(item.id)} className='bg-[#3A1078] hover:bg-[#1B1A55] active:bg-[#17153B] p-2 px-4 rounded-full text-white max-sm:p-1 max-sm:px-3 max-sm:text-sm'>delete</button>
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