import React, {useState} from 'react';
import {MdOutlineAddCircleOutline} from "react-icons/md";

function TodoForm({todos, refetch}) {

    const style = {
        form: `flex gap-3 mt-5`,
        input: `bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500`,
        btnadd: `hover:text-black text-slate-500 py-0 px-0 rounded-full text-5xl`,

    };



    const [text, setText] = useState("");


    const handleAddTask = (e) => {
        e.preventDefault();

        if (text) {
            const newTask = {text: text, isDone: false};

            fetch('https://todo-server-brown.vercel.app/todos', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(newTask)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    refetch();
                })
                .catch(err => console.log(err));


            e.target.reset();
        }

    };

    const onChange = (event) => {
        const inputText = event.target.value;
        console.log(inputText);
        setText(inputText);
    };

    return (
        <form className={style.form} onSubmit={handleAddTask}>
            <input
                type="text"
                className={style.input}
                name="todo"
                onChange={onChange}
                placeholder="Add new task..."
            />
            <button className={style.btnadd} type="submit">
                <MdOutlineAddCircleOutline></MdOutlineAddCircleOutline>
            </button>
        </form>
    );
}

export default TodoForm;