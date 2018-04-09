import React, { Component }  from 'react';

export default class ToDo extends Component {
   

    render(){
        
    let {todo} = this.props 
    let className;
    if(todo.completed){
        className="completedToDo"
    }

   
    return(  <tr className={className}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.completed ? <input type="checkbox" name="completed" key={todo.id} checked="checked" disabled/> : <input type="checkbox" key={todo.id} name="notCompleted" disabled/>}
                </td>
            </tr>

               
  );
    }
  
}










