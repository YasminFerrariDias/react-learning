import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Todos } from "./screans/todos";

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  )
}
