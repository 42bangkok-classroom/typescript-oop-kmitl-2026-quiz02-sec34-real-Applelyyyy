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

interface User {
  id: number;
  name: string;
  phone: string;
  address: Address | null;
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


export async function getPostalAddress():Promise<User[]> {
    try{
        let response = await axios.get<ApiUser[]>('https://jsonplaceholder.typicode.com/users')
        const users = Array.isArray(response?.data) ? response.data : []
        return users.map((u:ApiUser) => ({
            id: u.id,
            name: u.name,
            phone: u.phone,
            address: u.address ?? null
        }))
    }catch(error){
        return []
    }
}