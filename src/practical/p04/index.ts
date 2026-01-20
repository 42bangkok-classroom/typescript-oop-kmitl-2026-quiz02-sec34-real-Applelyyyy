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
        const user = users.find(f => f.id === id)
        
        if(!user){
          return "Invalid id"
        }
        
        const userTodos = todos.filter(ff => ff.userId === id)
        
        return {
          id: user.id,
          name: user.name,
          address: user.address || null,
          phone: user.phone,
          todos: userTodos || [],
        }
    }catch(error){
        return "Invalid id"
    }
}
