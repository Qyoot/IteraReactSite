import React from 'react';
import { Button, Checkbox} from 'antd';
import Collapsible from 'react-collapsible';
import './style.css'
import {FaTrash} from "react-icons/fa";
import Time from 'react-time-format'

export const ToDoItem = (props) => {
  const { item, onCheck, onRemove } = props;
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
  if(item.checked!==true){
  return (
    <li className="todo-item" key={item.id}>
      <Collapsible trigger={item.title}>
      <p>
        {"\nDescription: " + item.description }
      </p>
    </Collapsible> 
    <li>
      <Checkbox className = "checkBox"
          checked={item.checked}
          onChange={onCheckItem}
        ></Checkbox>
        <Button danger onClick={onRemoveItem}><FaTrash/></Button>
      </li>
    </li>
  )}
  else
  {
    return (
      <li  style={{
        backgroundColor: '#cfe8ba',
         }} className="todo-item" key={item.id}>
       
      
        <Collapsible  triggerStyle = {{
          textDecoration: 'line-through',
          textAlign: 'left'
         }} trigger={item.title}>
        <p style={{
          textDecoration: 'line-through',
          textAlign: "center"
         }} >
          {"\nDescription: " + item.description+ "    "}<Time value={Date.now()} style={{color:'red'}} />
        </p>
      </Collapsible> 
      <li>
      <Checkbox className = "checkBox"
          checked={item.checked}
          onChange={onCheckItem}
        ></Checkbox>
        <Button danger onClick={onRemoveItem}><FaTrash/></Button>
      
      </li>
      
      </li>
    )
  }
}