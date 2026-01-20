import axios from 'axios';

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface UserWithTodos {
  id: number;
  name: string;
  address: Address | null;
  phone: string;
  todos: Todo[];
}

interface ApiUser {
  id: number;
  name: string;
  phone: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}
export async function getTodosByUserId(id:number){
    try{
        const [usersResponse, todosResponse] = await Promise.all([
            axios.get<ApiUser[]>('https://jsonplaceholder.typicode.com/users'),
            axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
        ]);
        const users = usersResponse.data
        const todos = todosResponse.data
        const user_data = users.filter(f => f.id === id)
        const userTodos = todos.filter(ff => ff.userId === id)
        if(user_data.length == 1){
          return user_data.map(filtered => ({
            id: filtered.id,
            name: filtered.name,
            address: filtered.address,
            phone: filtered.phone,
            todos: userTodos
          }))[0]
        }else{
          return "Invalid id"
        }
    }catch(error){
        return "Invalid id"
    }
}
