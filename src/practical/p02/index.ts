import axios from 'axios';

type newUser = {
  name: string;
  username?: string;
  email?: string;
  address?: {
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
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

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
export async function addUser(newUser: newUser | null): Promise<UserResponse[]> {
  try{
    const response = await axios.get<ApiUser[]>('https://jsonplaceholder.typicode.com/users');
    const users = response.data;
    const mappedUsers: UserResponse[] = users.map((user_data) => ({
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
    }));

    if (!newUser) {
      return mappedUsers;
    }

    let lastUserId = 0;
    for (let i = 0; i < mappedUsers.length; i++) {
      if (mappedUsers[i].id > lastUserId) {
        lastUserId = mappedUsers[i].id;
      }
    }

    const newUserData: UserResponse = {
      id: lastUserId + 1,
      name: newUser.name,
      phone: newUser.phone,
      address: newUser.address ? {
        street: newUser.address.street,
        suite: newUser.address.suite,
        city: newUser.address.city,
        zipcode: newUser.address.zipcode,
        geo: {
          lat: newUser.address.geo.lat,
          lng: newUser.address.geo.lng
        }
      } : null
    };
    return [...mappedUsers, newUserData];

  }catch(error){
    return[]
  }
}
