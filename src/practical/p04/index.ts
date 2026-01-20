import axios from 'axios';
import { getPostalAddress } from '../p01';
interface Todos {
  userId: number
  id: number
  title: string
  completed: boolean
}

export async function getTodosByUserId(id:number){
  try{
    let users_data = await getPostalAddress()
    let todo_respont = await axios.get<Todos[]>('https://jsonplaceholder.typicode.com/todos')
    const todos_data = Array.isArray(todo_respont?.data) ? todo_respont.data : []

    let filterUserById = users_data.filter(users => users.id === id)
    let filterTodosById = todos_data.filter(todo => todo.userId === id)
    if(filterUserById.length == 1){
      return {
        ...filterUserById[0],
        todos:filterTodosById
      }
    }
    else{
      return "Invalid id"
    }
  }catch(err){
    return []
  }
}
