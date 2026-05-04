import axios from "axios";
import { useEffect, useState } from "react"

type Todo = {
  id: number;
  title: string;
}

export function App() {
  const [todoValue, setTodoValue] = useState('')
  const [data, setData] = useState<Todo[]>([]);

  async function getTodos() {
    const { data } = await axios.get<Todo[]>('http://localhost:3000/todos');

    setData(data);
  }

  async function handleAddTood() {
    await axios.post('http://localhost:3000/todos', {
      title: todoValue
    })

    await getTodos()
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
        {data.map((todo) => (
          <li key={(todo.id)}>{todo.title}</li>
        ))}
      </ul>
    </>
  )
}
