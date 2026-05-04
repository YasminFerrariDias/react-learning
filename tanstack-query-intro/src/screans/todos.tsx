import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

type Todo = {
  id: number;
  title: string;
}

export function Todos() {
  const [todoValue, setTodoValue] = useState('')

  async function getTodos() {
    const { data } = await axios.get<Todo[]>('http://localhost:3000/todos');

    return data;
  }

  const { data: todos } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  })

  async function handleAddTood() {
    await axios.post('http://localhost:3000/todos', {
      title: todoValue
    })

    await getTodos()
  }

  useEffect(() => {
    getTodos();
  }, [])

  return (
    <>
      <h1>Iniciando no TanStack Query</h1>
      <div>
        <input
          value={todoValue}
          onChange={(event) => setTodoValue(event.target.value)}
          type="text" placeholder="Digite sua tarefa..."
        />
        <button type="button" onClick={handleAddTood}>
          Adicionar
        </button>
      </div>
      <ul>
        {todos && todos.map((todo) => (
          <li key={(todo.id)}>{todo.title}</li>
        ))}
      </ul>
    </>
  )
}