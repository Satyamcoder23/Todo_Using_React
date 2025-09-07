import { createContext,useContext } from "react";
export const TodoContext = createContext({
    todos:[
        {id:1, title:"Learn React", completed:false}
    ],
    setTodos:()=>{},
    updatedTodo:()=>{},
    deleteTodo:()=>{},
    togglecomplete:()=>{}
});

export const useTodoContext = () => {
    return useContext(TodoContext);}

    export const TodoProvider = TodoContext.Provider;