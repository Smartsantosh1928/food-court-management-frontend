import { Route,Routes,Navigate } from "react-router-dom"
import Signin from "./pages/auth/Signin"
import Signup from "./pages/auth/Signup"
import Payment from "./Payment"
import Dashboard from "./pages/dashboard/Dashboard"

function App() {

  return (
    <>
      <Routes>
        <Route path="/auth/signin" element={<Signin/>}></Route>
        <Route path="/auth/signup" element={<Signup/>}></Route>
        <Route path="/dashboard/*" element={<Dashboard/>}></Route>
        <Route path="/payment" element={<Payment/>}></Route>
        <Route path="*" element={<Navigate to="/auth/signin" replace />}></Route>
      </Routes>
    </>
  )
}

export default App
