import React, { Component }  from 'react';
import axios from "axios";
import ToDo from './todo';

class ToDos extends Component {
constructor(props){
    super(props);
    this.state = {
        todos : [],
        userId : parseInt(props.userId,10) ,
        }
    }
   
    componentDidMount(){
        axios.get("https://jsonplaceholder.typicode.com/todos").then((response)=>{
            return response.data           
        }).then((data)=>{
            return data.filter((todo)=>{
                return todo.userId === this.state.userId
            })
        }).then((todos) => { 
            this.setState({...this.state,todos:todos});
      
        });              
    }

  render(){      
   
        return (
        <div className="table-responsive">
            <table className="table user-list">
                <thead>
                    <tr>
                    <th><span>Id</span></th>
                    <th><span>Title</span></th>
                    <th><span>completed</span></th>
                    </tr>
                </thead>
                <tbody>            
                  {this.state.todos.map((todo,index)=>
                    <ToDo key={index} todo={todo} />
                  )}
                </tbody>
            </table>
        </div>        
        
      );   

    }
  
}




export default (ToDos)











