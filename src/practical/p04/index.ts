import axios from 'axios';

interface Todos {
  userId: number
  id: number
  title: string
  completed: boolean
}
interface User  {
  id: number
  name: string
  address: {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: {
      lat: string
      lng: string }
  } | null
  phone: string
  website: string
}

export async function getTodosByUserId(id:number){
  try{
    let user_respont = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
    const users_data = Array.isArray(user_respont?.data) ? user_respont.data : []
    let todo_respont = await axios.get<Todos[]>('https://jsonplaceholder.typicode.com/todos')
    const todos_data = Array.isArray(todo_respont?.data) ? todo_respont.data : []

    let filterUserById = users_data.filter(users => users.id === id)
    let filterTodosById = todos_data.filter(todo => todo.userId === id)
    if(filterUserById.length == 1){
      const { id, name, address, phone } = filterUserById[0];
      return {
        id,
        name,
        address,
        phone,
        todos: filterTodosById
      }
    }
    else{
      return "Invalid id"
    }
  }catch(err){
    return []
  }
}
