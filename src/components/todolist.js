import React, { useState, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
const Todolist = () => {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);
    const [allTodos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [completedTodos, setCompletedTodos] = useState([]);
    const handleAddTodo = () => {
        let newTodoItem = {
            title: newTitle,
            description: newDescription
        }
        let updatedTodoArr = [...allTodos];
        updatedTodoArr.push(newTodoItem);
        setTodos(updatedTodoArr);
        localStorage.setItem('todolist', JSON.stringify(updatedTodoArr))
    };

    const handleDeleteTodo = (index) => {
        let reducedTodo = [...allTodos];
        reducedTodo.splice(index);
        localStorage.setItem('todolist', JSON.stringify(reducedTodo));
        setTodos(reducedTodo);
    }
    const handleComplete = (index) => {
        let now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth() + 1;
        let yy = now.getFullYear();
        let hh = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();
        let completedOn = dd + '-' + mm + '-' + yy + '-' + 'at' + hh + '-' + m + '-' + s;

        let filteredItem = {
            ...allTodos[index],
            completedOn: completedOn
        }
        let updatedCompletedArr = [...completedTodos];
        updatedCompletedArr.push(filteredItem);
        setCompletedTodos(updatedCompletedArr);
        handleDeleteTodo(index);
        localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
    };
    const handleDeleteCompletedTodo = (index) => {
        let reducedTodo = [...completedTodos];
        reducedTodo.splice(index);
        localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
        setCompletedTodos(reducedTodo);
    };

    useEffect(() => {
        let saveTodolist = JSON.parse(localStorage.getItem('todolist'));
        let saveCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
        if (saveTodolist) {
            setTodos(saveTodolist);
        }
        if (saveCompletedTodo) {
            setCompletedTodos(saveCompletedTodo);
        }
    }, [])
    return (
        <>
            <div className="header text-center">
                <h1>Todo List</h1>
            </div>
            <div className='todo-wrapper'>
                <div className='todo-input'>
                    <div className='todo-input-item'>
                        <label className='lb-item'>Title</label>
                        <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Task's Title?" className='ip-item'></input>
                    </div>
                    <div className='todo-input-item'>
                        <label className='lb-item'>Description</label>
                        <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Task's Description?" className='ip-item' ></input>
                    </div>
                    <div className='todo-input-item'>
                        <button type='button' onClick={handleAddTodo} className='prm-btn' >Add</button>
                    </div>
                </div>

                <div className='btn-area'>
                    <button className={`isCompleteScreen ${isCompleteScreen === false && 'active'}`} onClick={() => setIsCompleteScreen(false)}>Todo</button>
                    <button className={`isCompleteScreen ${isCompleteScreen === true && 'active'}`} onClick={() => setIsCompleteScreen(true)}>Completed</button>
                </div>
                <div className='todo-list'>
                    {isCompleteScreen === false && allTodos.map((item, index) => {
                        return (
                            <div className='todo-list-item' key={index}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                                <div>
                                    <AiOutlineDelete className='icon' onClick={() => handleDeleteTodo(index)} />
                                    <BsCheckLg className='check-icon' onClick={() => handleComplete(index)} />
                                </div>
                            </div>
                        );
                    })}
                    {isCompleteScreen === true && completedTodos.map((item, index) => {
                        return (
                            <div className='todo-list-item' key={index}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <p><i>Completed On: {item.completedOn}</i></p>
                                </div>
                                <div>
                                    <AiOutlineDelete className='icon' onClick={() => handleDeleteCompletedTodo(index)} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};
export default Todolist;
