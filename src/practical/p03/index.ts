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

export async function filterUserById(id: number): Promise<UserResponse | string> {
  try {
    const response = await axios.get<ApiUser[]>('https://jsonplaceholder.typicode.com/users');
    const users = response.data;
    
    const user_data = users.find((user_data) => user_data.id === id);
    
    if (!user_data) {
      return "Invalid id";
    }
    
    return {
      id: user_data.id,
      name: user_data.name,
      phone: user_data.phone,
      address: user_data.address ? {
        street: user_data.address.street,
        suite: user_data.address.suite,
        city: user_data.address.city,
        zipcode: user_data.address.zipcode,
        geo: {
          lat: user_data.address.geo.lat,
          lng: user_data.address.geo.lng
        }
      } : null
    };
  } catch (error) {
    return "Invalid id";
  }
}
