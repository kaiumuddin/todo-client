import React, {useState} from 'react';
import {MdOutlineModeEditOutline, MdDeleteForever, MdDone, MdOutlineCheckBoxOutlineBlank, MdEditOff} from "react-icons/md";


function Todo({refetch, todo, handleDelete, handleUpdateDoneTrue}) {

  const {_id, text, isDone} = todo;

  const [edit, setEdit] = useState(false);

  const [editedTask, setEditedTask] = useState(text);

  const handleOnChange = (e) => {
    setEditedTask(e.target.value);
  };

  const handleOnBlur = (e) => {
    e.preventDefault();

    setEditedTask(editedTask);
    setEdit(false);

    const newText = editedTask;

    fetch(`https://todo-server-brown.vercel.app/edit/${_id}`, {
      method: "PUT",
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({newText})
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        refetch();
      });

  };

  const style = {
    input: `bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500`,
    btnicon: `hover:text-black text-slate-400 py-0 px-0 rounded-full text-3xl`,
  };

  return (
    <div className="bg-slate-200 rounded-md flex gap-3 justify-between items-center px-2 py-5 my-2">
      {
        !isDone && <div className={style.btnicon} onClick={() => handleUpdateDoneTrue(todo, true)}>
          <MdOutlineCheckBoxOutlineBlank></MdOutlineCheckBoxOutlineBlank>
        </div>
      }

      {
        isDone && <div className={style.btnicon} onClick={() => handleUpdateDoneTrue(todo, false)}>
          <MdDone></MdDone>
        </div>
      }
      {
        !edit && <>
          {isDone && <p className="flex-grow text-start line-through">{text}</p>}
          {!isDone && <p className="flex-grow text-start ">{text}</p>}
        </>
      }

      {
        edit &&
        <form className="flex-grow flex" onSubmit={handleOnBlur}>
          <input
            type="text"
            name="updatedText"
            placeholder={editedTask}
            value={editedTask}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            autoFocus
            className="bg-transparent appearance-none border-0 border-gray-200 w-full py-2 px-4  text-gray-700 leading-tight focus:outline-none  focus:border-b-4 focus:border-slate-500" />
        </form>
      }


      <div className="flex gap-5">
        {
          edit &&
          <button className={style.btnicon} onClick={() => setEdit(true)}>
            <MdEditOff></MdEditOff>
          </button>
        }
        {
          !edit &&
          <button className={style.btnicon} onClick={() => setEdit(true)}>
            <MdOutlineModeEditOutline></MdOutlineModeEditOutline>
          </button>
        }
        <button className={style.btnicon} onClick={() => handleDelete(todo)}>
          <MdDeleteForever></MdDeleteForever>
        </button>
      </div>
    </div >
  );
}

export default Todo;