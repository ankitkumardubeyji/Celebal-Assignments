import {createContext, useContext} from "react"

export const TodoContext = createContext({
    todos:[
        {
            id:1,
            TodoMessage:' Todo msg',
            completed:false,
            datetime:new Date()
        },
    ],

    addTodo:(todo)=>{}, // all thse are the functions and there functionalities will be written in the app.jsx
    updatedTodo:(id,todo) => {}, // todo is the todo msg
    deleteTodo:(id)=>{},
    toggleComplete:(id) =>{}  // for editing the css of the todo item
})

export const useTodo = ()=>{
    return useContext(TodoContext)  // useContext must be given the paraneter of the context whose context is to be created
}

export const TodoProvider = TodoContext.Provider