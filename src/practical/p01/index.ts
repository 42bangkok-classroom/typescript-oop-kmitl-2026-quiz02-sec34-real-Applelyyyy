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
        const response = await axios.get<ApiUser[]>('https://jsonplaceholder.typicode.com/users')
        const users = response.data
        if (!users || users.length === 0){  
            return []
        }
        return users.map(u => ({
            id: u.id,
            name: u.name,
            phone: u.phone,
            address: u.address ? {
                street: u.address.street,
                suite: u.address.suite,
                city: u.address.city,
                zipcode: u.address.zipcode,
                geo: {
                    lat: u.address.geo.lat,
                    lng: u.address.geo.lng
                }
            } : null
        }))
    }catch(error){
        return []
    }
}