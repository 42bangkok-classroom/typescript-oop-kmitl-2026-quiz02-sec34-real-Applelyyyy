import axios from 'axios';

interface ApiUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  } | null;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};


export async function getPostalAddress() {
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