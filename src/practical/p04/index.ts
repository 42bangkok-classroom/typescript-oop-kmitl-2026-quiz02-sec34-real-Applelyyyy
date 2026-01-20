import axios from "axios";
import { getPostalAddress } from "../p01";

export async function getTodosByUserId(id: number) {
  let todos = await getTodos();
  let users = await getPostalAddress();

  let filterUser = users.filter((user) => user.id == id);
  let filterTodo = todos.filter((todo) => todo.userId == id);
  if (filterUser.length == 1) {
    return { ...filterUser[0], todos: filterTodo };
  } else {
    return "Invalid id";
  }
}

export async function getTodos() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    const data = Array.isArray(response?.data) ? response.data : [];
    return data;
  } catch (err) {
    return [];
  }
}