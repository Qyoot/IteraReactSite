import React, { useState } from 'react';
import { Card, Divider, Button } from 'antd';
import { ToDoItem } from './ToDoItem';
import { ToDoForm } from './ToDoForm';
import {IoTrashBinSharp} from "react-icons/io5";

export const ToDo = () => {
  
  const [todos, setTodos] = useState([
    {id: 1, title: 'Some ToDo', description: "Something like description   Added at: " + GetTime(), checked: false},
    {id: 2, title: 'Another one ToDO', description: "Description without no sence in it   Added at: " + GetTime(), checked: false}
  ]);
  const [idCount, setIdCount] = useState(10);

  const renderTodoItems = (todos) => {
    return (
      <ul className="todo-list">

        Unchecked ToDo: {(todos.filter(todo => todo.checked === false)).length}_ _ _

        <Button onClick = {removeAllCheckedItems} type="primary">Delete selected<IoTrashBinSharp/></Button>
        { todos.map(todo => <ToDoItem 
            key={todo.id}
            item={todo}
            description = {todo.description}
            onRemove={onRemove} 
            onCheck={onCheck} 
          />) }
      </ul>
    )
  }

  const onRemove = (id) => {
    const index = todos.findIndex(todo => todo.id === id);

    if (index !== -1) {
      todos.splice(index, 1);
      setTodos([...todos]);
    }
  }
  const removeAllCheckedItems = () => {
    setTodos(todos.filter(item => !item.checked));
  }
  const onCheck = (id) => {
    const index = todos.findIndex(todo => todo.id === id);
    
    if (index !== -1) {
      const todo = todos[index];

      todo.checked = !todo.checked;
      todos.splice(index, 1, todo);

      setTodos([...todos]);
    }
    
  }

  const onSubmit = (title, description) => {
    const todo = {
      id: idCount,
      title,
      description,
      checked: false
    };

    setTodos([...todos, todo]);
    setIdCount(idCount + 1);
  } 

  return (
    <Card title={'My ToDos'} className="todo-card">
      <ToDoForm onSubmit={onSubmit} />
      <Divider />
      { renderTodoItems(todos) }
    </Card>
  );

  function GetTime()
  {
    var today = new Date();
    var result = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear() + " at " + today.getHours() + ':' + today.getMinutes();
     return result;
  }
}
