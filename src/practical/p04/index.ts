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
export async function getTodosByUserId(id:number):Promise<UserWithTodos | string> {
    try{
        const [usersResponse, todosResponse] = await Promise.all([
            axios.get<ApiUser[]>('https://jsonplaceholder.typicode.com/users'),
            axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
        ]);
        const users = usersResponse.data
        const todos = todosResponse.data
        const user_data = users.find(f => f.id === id)
        if(!user_data){
            return "Invalid id"
        }
        const userTodos = todos.filter(ff => ff.userId === id)

        return {
            id: user_data.id,
            name: user_data.name,
            address: user_data.address ? {
                street: user_data.address.street,
                suite: user_data.address.suite,
                city: user_data.address.city,
                zipcode: user_data.address.zipcode,
                geo: {
                    lat: user_data.address.geo.lat,
                    lng: user_data.address.geo.lng
                }
            } : null,
                phone: user_data.phone,
                todos: userTodos
        };
    }catch(error){
        return "Invalid id"
    }
}
