import axios from "axios";

export async function getPostalAddress() {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    const data = Array.isArray(response?.data) ? response.data : [];
    return data.map((user: user) => ({
      id: user.id,
      name: user.name,
      phone: user.phone,
      address: user.address ?? null,
    }));
  } catch (err) {
    return [];
  }
}

type user = {
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