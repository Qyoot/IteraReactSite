import React from 'react';
import './style.css'
import 'materialize-css/dist/css/materialize.min.css'

export const ToDoItem = (props) => {
const { item, onCheck, onRemove, onUpdate } = props;
  const onRemoveItem = (e) => {
    e.preventDefault();

    if (onRemove) {
      onRemove(item.id);
    }
  }

  const onCheckItem = () => {
    if (onCheck) {
      onCheck(item.id);
    }
  }
  const onUpdateItem = () =>{

    onUpdate(item.id);
  }
  
  return ( <li className="todo-item" key={item.id}>
      <p>
      <label>
        <input type="checkbox" class="filled-in" checked={item.checked}
                onChange={onCheckItem}/>
        <span>{item.content}    Description:  {item.description}</span>
      </label>
    </p>
    <p class="z-depth-2">
    <a class="waves-effect till btn" onClick={onUpdateItem}><i class="material-icons left">update</i>Update</a>
    <a class="waves-effect red btn" onClick={onRemoveItem}><i class="material-icons left">remove</i>Remove</a></p>
  
</li>
    )
}