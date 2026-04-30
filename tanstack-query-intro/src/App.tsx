import { useState } from "react"

export function App() {
  const [todoValue, setTodoValue] = useState('')

  return (
    <>
      <h1>Iniciando no TanStack Query</h1>
      <div>
        <input type="text" placeholder="Digite sua tarefa..." />
        <button type="button">Adicionar</button>
      </div>
    </>
  )
}
