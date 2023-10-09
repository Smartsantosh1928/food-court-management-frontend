import { Route,Routes,Navigate } from "react-router-dom"
import Signin from "./pages/auth/Signin"
import Signup from "./pages/auth/Signup"

function App() {

  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/auth/signin" replace />}></Route>
        <Route path="/auth/signin" element={<Signin/>}></Route>
        <Route path="/auth/signup" element={<Signup/>}></Route>
      </Routes>
    </>
  )
}

export default App
