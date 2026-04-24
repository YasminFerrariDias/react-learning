import React from "react";
import useUser from "../hooks/use-user"

export default function UseInfo() {
  const { user, userRequestStatus, getUser } = useUser();

  React.useEffect(() => {
    getUser("gus")
  }, [getUser])

  if (userRequestStatus === 'loading') {
    return <div>Carregando usuário...</div>
  }

  return (
    <ul>
      <li>Nome: {user?.name}</li>
      <li>Username: {user?.username}</li>
    </ul>
  )
}
