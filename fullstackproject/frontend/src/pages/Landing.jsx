import { CreateUser } from "../Componants/CreateUser";
import { Login } from "../Componants/Login";
import { useState } from "react";


export function Landing() {

  //view == 0 --> Login
  //View == 1 --> Create
  const [view, setView] = useState(0)
    return (
      <>
      {!view ? 
      <>
      <Login/>
      <button onClick={() => setView(!view)}>Create new Account</button>
      </> :
      <> 
      <CreateUser/>
      <button onClick={() => setView(!view)}>Login existing account</button>
      </>}
      </>
    )
}
