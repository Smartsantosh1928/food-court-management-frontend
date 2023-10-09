import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Signin() {

  const [details,setdetails] = useState({})
  const [ checkbox, setCheckBox ] = useState(false)

  const handleChange =(e)=>{
    const {name,value}=e.target
    if(name=="remind-me"){
      setdetails((prev)=>{
        return {...prev,"remind-me": !checkbox}
      })
      setCheckBox(!checkbox);
    }else
    setdetails((prev)=>{
      return {...prev,[name]: value}
    })
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(details);
    fetch("http://localhost:8080/register",{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({...details,"fullName": null,"enabled": null,"role": null})
    }).then(res => res.text())
    .then(data => console.log(data))
  }

  return (
    <>
    <div className="flex justify-center items-center h-screen bg-blue-gray-300">
    <Card className="w-96 ">
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-28 place-items-center">
        <Typography variant="h3" color="white">
          Sign In
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input label="Email" name="email" onChange={handleChange} size="lg" />
        <Input label="Password" name="password" type="password" onChange={handleChange} size="lg" />
        <div className="-ml-2.5">
          <Checkbox label="Remember Me" name="remind-me" onChange={handleChange} />
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" onClick={handleSubmit} fullWidth>
          Sign In
        </Button>
        <Typography variant="small" className="mt-6 flex justify-center">
          Don&apos;t have an account?
          <Link to="/auth/signup" className="text-base font-semibold" >Sign up</Link>
        </Typography>
      </CardFooter>
    </Card>
    </div>
  </>
  );
}

export default Signin