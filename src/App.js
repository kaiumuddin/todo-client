import {useQuery} from "@tanstack/react-query";
import './App.css';
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import {useEffect, useState} from "react";
import AllTodos from "./components/AllTodos";

function App() {

  // const [todos, setTodos] = useState([]);

  // useEffect(() => {
  //   fetch('https://todo-server-brown.vercel.app/todos')
  //     .then(res => res.json())
  //     .then(data => setTodos(data));
  // }, []);

  const {data: todos = [], isLoading, refetch} = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await fetch(`https://todo-server-brown.vercel.app/todos`);
      const data = await res.json();
      return data;
    }
  });

  const handleDelete = (todo) => {
    fetch(`https://todo-server-brown.vercel.app/todos/${todo._id}`,
      {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          console.log("Deleted");
          refetch();
        }
      });
  };

  const handleUpdateDoneTrue = (todo, isDone) => {
    console.log(todo._id);
    fetch(`https://todo-server-brown.vercel.app/todos/${todo._id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({isDone})
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          refetch();
        }
      });
  };


  return (
    <div className="App container mx-auto">
      <Header></Header>
      <div>
        Total task : {todos.length}
      </div>
      <TodoForm todos={todos} refetch={refetch}></TodoForm>
      <AllTodos todos={todos} refetch={refetch} handleDelete={handleDelete} handleUpdateDoneTrue={handleUpdateDoneTrue}></AllTodos>
    </div>
  );
}

export default App;
