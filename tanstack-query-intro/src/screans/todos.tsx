import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

type Todo = {
  id: number;
  title: string;
}

export function Todos() {
  const [todoValue, setTodoValue] = useState('')

  async function getTodos() {
    await new Promise(resolve => setTimeout(resolve, 2000))
    const { data } = await axios.get<Todo[]>('http://localhost:3000/todos');

    return data;
  }

  const { data: todos, isLoading, isError, refetch } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  })

  async function handleAddTodo() {
    await new Promise(resolve => setTimeout(resolve, 2000))

    await axios.post('http://localhost:3000/todos', {
      title: todoValue
    })
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ['create-todo'],
    mutationFn: handleAddTodo,
    onSuccess: () => {
      refetch()
    }
  })

  return (
    <>
      <h1>Iniciando no TanStack Query</h1>
      <div>
        <input
          value={todoValue}
          onChange={(event) => setTodoValue(event.target.value)}
          type="text" placeholder="Digite sua tarefa..."
        />
        <button disabled={isPending} type="button" onClick={() => mutate()}>
          Adicionar
        </button>
      </div>
      <ul>
        {!isLoading && todos && todos.map((todo) => (
          <li key={(todo.id)}>{todo.title}</li>
        ))}

        {isLoading && <p>carregando...</p>}

        {isError && <p>Erro ao carregar</p>}
      </ul>
    </>
  )
}
