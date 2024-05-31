import React, { useState, useEffect } from 'react';
import { useTodo } from '../context/TodosContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TodoItem({ todo }) {
    const [selectedDate, setSelectedDate] = useState(new Date(todo.datetime || Date.now()));
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.TodoMessage);
    const { updateTodo, deleteTodo, toggleComplete } = useTodo();

    const handleDateChange = (date) => {
        setSelectedDate(date);
        updateTodo(todo.id, { ...todo, datetime: formatDate(date) });
    };

    const editTodo = () => {
        updateTodo(todo.id, { ...todo, TodoMessage: todoMsg });
        setIsTodoEditable(false);
    };

    const toggleCompleted = () => {
        toggleComplete(todo.id);
    };

    

    const formatDate = (date) => {
        if (!date) return '';
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                <input
                    type="text"
                    className={`border outline-none w-full bg-transparent rounded-lg ${
                        isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                    } ${todo.completed ? "line-through" : ""}`}
                    value={todoMsg}
                    onChange={(e) => setTodoMsg(e.target.value)}
                    readOnly={!isTodoEditable}
                />

                <div style={{display:"flex", gap:"50px", width:"100%"}}>
               {selectedDate && <p>Deadline: {formatDate(selectedDate)}</p>}    
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd-MMM-yyyy"
                    placeholderText="Select a date"
                />
               
                </div>
                
            </div>
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;
                    if (isTodoEditable) {
                        editTodo();
                    } else {
                        setIsTodoEditable((prev) => !prev);
                    }
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
