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
  import { Link } from "react-router-dom";
  import { useState } from "react";

   
  export function Signup() {

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
        body: JSON.stringify({...details,"enabled": null,"role": "user"})
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
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign Up
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input label="Name" size="lg" name="fullname" onChange={handleChange} />
          <Input label="Email" type="email" name="email" size="lg" onChange={handleChange} />
          <Input label="Password" type="password" name="password" size="lg" onChange={handleChange}/>
          <div className="-ml-2.5">
            <Checkbox label="I agree the Terms and Conditions" name="remind-me" onChange={handleChange} />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth onClick={handleSubmit}>
            Sign Up
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Already have an account?
            <Link to="/auth/signin" className="text-base font-semibold" >Login</Link>
          </Typography>
        </CardFooter>
      </Card>
      </div>
    </>
    );
  }

export default Signup
