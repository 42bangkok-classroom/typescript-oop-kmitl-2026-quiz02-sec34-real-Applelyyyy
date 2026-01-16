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

interface UserResponse {
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

export async function safeFetchUser(userId: number): Promise<UserResponse | null> {
    try{
        const response = await axios.get<ApiUser[]>('https://jsonplaceholder.typicode.com/users')
        const users = response.data
        if (!users){
            return null
        }
        const users_data = users.find(f => f.id === userId)
        if (!users_data){
            return null
        }
        return {
            id: users_data.id,
            name: users_data.name,
            phone: users_data.phone,
            address: users_data.address ? {
                street: users_data.address.street,
                suite: users_data.address.suite,
                city: users_data.address.city,
                zipcode: users_data.address.zipcode,
                geo: {
                  lat: users_data.address.geo.lat,
                  lng: users_data.address.geo.lng
                }
            } : null
        }
    }catch(error){
        return null
    }

}
