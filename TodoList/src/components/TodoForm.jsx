import React, { useState } from 'react';
import { useTodo } from '../context/TodosContext';


function TodoForm() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [TodoMessage, setTodoMessage] = useState("");
    const { addTodo } = useTodo();

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const formatDate = (date) => {
        if (!date) return '';
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const getFormattedDate = () => {
        let currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.toLocaleString('default', { month: 'short' });
        let year = currentDate.getFullYear();
        let formattedDateTime = `${day}/${month}/${year}`;
        return formattedDateTime;
    };

    const add = (e) => {
        e.preventDefault();
        if (!TodoMessage) return;
        addTodo({
            TodoMessage,
            completed: false,
            datetime: selectedDate ? selectedDate.toISOString() : getFormattedDate()
        });
        setTodoMessage("");
        setSelectedDate(null);
    };

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", gap: '10px' }}>
                <form onSubmit={add} className="flex">
                    <input
                        type="text"
                        placeholder="Write Todo..."
                        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                        value={TodoMessage}
                        onChange={(e) => setTodoMessage(e.target.value)}
                    />
                    <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                        Add
                    </button>
                </form>
               
            </div>
        </>
    );
}

export default TodoForm;
