import axios from 'axios';
import { getPostalAddress } from '../p01';

interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}
export async function Todos() {
  try{
    let todos_respont = await axios.get<Todo>("https://jsonplaceholder.typicode.com/todos")
    const todos_data = Array.isArray(todos_respont?.data) ? todos_respont.data : []
    return todos_data
  }catch(err){
    return [];
  }
}

export async function getTodosByUserId(id:number){
  try{
    let users_data = await getPostalAddress()
    let todos_data = await Todos()
    let filterUserById = users_data.filter(users => users.id === id)
    let filterTodosById = todos_data.filter(todo => todo.userId === id)
    if (!filterTodosById) filterTodosById = [];
    if(filterUserById.length == 1 && filterUserById[0].name !== undefined && filterUserById[0].phone !== undefined && filterUserById[0].address !== null){
      return {
        ...filterUserById[0],
        todos:filterTodosById
      }
    }
    else{
      return "Invalid id"
    }
  }catch(err){
    return [];
  }
}
