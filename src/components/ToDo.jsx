import React, { useState, useEffect } from 'react';
import { Card, Divider } from 'antd';
import { ToDoItem } from './ToDoItem';
import { ToDoForm } from './ToDoForm';
import {TodoistApi} from "@doist/todoist-api-typescript";
import 'materialize-css/dist/css/materialize.min.css'


export const ToDo = () => {
  const api = new TodoistApi('4114d16853c84959cd4b40a72fa47f301281415d')
  const [todos, setTodos] = useState([])

  useEffect(() => {
      api.getTasks()
          .then(todos => setTodos(todos))
  });
  const [idCount, setIdCount] = useState(10);

  const renderTodoItems = (todos) => {
    return (
<ul className="todo-list">
        Unchecked ToDOs :{countDoneItems()}
        { todos.map(todo => <ToDoItem 
            key={todo.id}
            item={todo}
            description = {todo.description}
            onRemove={onRemove} 
            onCheck={onCheck} 
            onUpdate = {onUpdate}
          />) }
      </ul>

    )
  }
  const onUpdate = (id) => {
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      const todo = todos[index];

      todo.onUpdate = true;
      todos.splice(index, 1, todo);

      setTodos([...todos]);
    api.updateTask(id,{content: 'Updated Name'}).then(res=> console.log(res))
}
}
  const onRemove = (id) => {
       api.deleteTask(id).then(() => console.log('success')).catch(err => console.log(err))
    }
 
  const onCheck = (id) => {
    api.closeTask(id).then(() => console.log('success')).catch(err => console.log(err))
}
  const onSubmit = (title, description) => {
    
    api.addTask({content: title, description: description}).then(() => console.log('success')).catch(err => console.log(err))
    
  } 
  
  const countDoneItems = () => {
    return todos.reduce((count, item) => {
        if(!item.checked){count++;}
        return count;
    }, 0)
  }

  return (
    <Card title={'My todos'} className="todo-card">
      <ToDoForm onSubmit={onSubmit} />
      <Divider />
      { renderTodoItems(todos) }
    </Card>
  );
}