import { useState, useEffect } from 'react'
import {TodoProvider} from './context/TodosContext'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/*
local storage + contextapi
- adding todos
- on edit , the input readmode gets false , we add the data , and the previous data gets updated with the old data.
- delete
- update


*/
function App() {
  const formatDate = (date) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};


const [filteredTodos,setFilteredTodos] = useState([])
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFilteredTodos(todos.filter((item)=>item.datetime == formatDate(date)))
    setSorted(false)
    
};

const[sorted,setSorted] = useState(false)

const [selectedDate, setSelectedDate] = useState(null);


  const [todos, setTodos] = useState([]) // todos here is the array of objects
  
  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] ) // we need to have the access of previous state otherwise all 
                                                          //the preevious todos will get deleted and new Todo will get added hence we dint do directlys setTodos(todo) rather than pass a callback function to setTodos
  // todo is objct, prev is the old todos array, so here we spread the old array and add the new todo , and set the todos with the 
  // updated todos.
  console.log(todos)  // **why its not showing the updated array??
                                                        }

  const updateTodo = (id, todo) => { // expects the updatedTodo obj
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo ))) // applyng map on previousTodos to
                  // find the todo and update it.    todo here the object., if id matches then update the prevTodo with new todo, map
                  // will return the new todos array , and the previous todos array will be updated by the newTodos array.
  }

  // a new array of Todos is to be made such that it has all the Todos other than the todo with the id :id
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    //console.log(id);
    setTodos((prev) =>  // getting previous state of the todos array
    prev.map((prevTodo) => // map will return new array 
      prevTodo.id === id ? { ...prevTodo, // keeping all the values of prevTodo object as it is just overriding the completed value
        completed: !prevTodo.completed } : prevTodo)) // if id matched then adding new object in the newTodos array , otherwise passing
        /// as it is the object , map will return new array of todos , with the completed property of the given id object of the array as toggled.
        // and setTodos will update the prevTodos
  }

  const [sortedTodos,setSortedTodos] = useState([])

  function sortTodo(){
    setSortedTodos(sortedTodos.slice().sort((a, b) => {
      // Convert the datetime strings to Date objects for comparison
      const dateA = new Date(a.datetime);
      const dateB = new Date(b.datetime);
    
      // Compare the date objects
      return dateA - dateB;
    }));
    setSorted(true)
  }

  

  // untill we are not talking about the server side rendering we can directly access localStorage as localStorage is present in browser
  // we are using useEffect as at first time itself the application loaded. below functionality should be functional.
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) { // json here is the array of objects
      setTodos(todos)
      setFilteredTodos(todos)
      setSortedTodos(todos)
    }
  }, []) // if i gives todos here as the dependencie then the infite loop will be created.

  // when there is change in the todos , then updating the local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  



  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4" style={{display:"flex",flexDirection:"column",gap:"10px"}}>
            {/* Todo form goes here */} 
            <TodoForm />
            <div style={{ display: "flex", gap: "50px", width: "100%", alignItems:"center" ,justifyContent:'space-between'}}>
              <p>Filter By Date: </p>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd-MMM-yyyy"
                placeholderText="Filter By Date"
                className="form-control" // Ensure correct class for styling
                customInput={<input style={{ color: 'black' ,padding:"5px 15px"}} />}
              />

{!sorted ?(<button onClick = {sortTodo}type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                        Sort By Deadline 
                    </button>)

:(  <button type="submit" onClick={()=>setSorted(false)} className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
  Sort By Latest
</button>)
}


            </div>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/* Loop and Add TodoItem here */}
            {sorted?sortedTodos.map((todo) => (
                  <div key={todo.id} className='w-full'>
                    <TodoItem todo={todo} />
                  </div>
                )): selectedDate 
              ? filteredTodos.map((todo) => (
                  <div key={todo.id} className='w-full'>
                    <TodoItem todo={todo} />
                  </div>
                ))
              : todos.map((todo) => (
                  <div key={todo.id} className='w-full'>
                    <TodoItem todo={todo} />
                  </div>
                ))
            }
          </div>
        </div>
      </div>
    </TodoProvider>
  );
  
}

export default App