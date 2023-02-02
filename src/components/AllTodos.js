import React from 'react';
import Todo from "./Todo";

function AllTodos({refetch, todos, handleDelete, handleUpdateDoneTrue}) {

    return (
        <div className="my-10">
            {
                todos.map((todo, index) => <Todo key={todo._id} refetch={refetch} todo={todo} handleDelete={handleDelete} handleUpdateDoneTrue={handleUpdateDoneTrue}></Todo>)
            }
        </div>
    );
}

export default AllTodos;