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
import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function Signin() {

  const [details,setdetails] = useState({})
  const [ checkbox, setCheckBox ] = useState(false)
  const [ validated, setValidated] = useState(false)
  const [ errors, serErrors ] = useState(["",""])

  const navigate = useNavigate()

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"))
    if(!user)
      user = JSON.parse(sessionStorage.getItem("user"))
    if(user){
      fetch("http://localhost:8080/auto-login",{
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email: user.email,password: user.password,"fullName": null,"enabled": null,"role": null})
      }).then(res => res.json())
      .then(data => {
        if(data.success){
          sessionStorage.setItem("user",JSON.stringify(data.t))
          navigate("/dashboard/home")
        }else{
          localStorage.removeItem("user")
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },[])

  const validate = () => {
    let isValid = true; // Assume the form is valid by default
  
    if(details){

      if (details.email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(details.email)) {
          setErrorHelper(0, "Email is not valid");
          isValid = false; // Set isValid to false if there's an error
        } else {
          setErrorHelper(0, "");
        }
      }
      
      if (details.password) {
        if (details.password.length < 8) {
          setErrorHelper(1, "Password must be at least 8 characters long");
          isValid = false; // Set isValid to false if there's an error
        } else {
          setErrorHelper(1, "");
        }
      }
      
      setValidated(isValid); 
    }
  };
  
  useEffect(validate, [details]);

  function setErrorHelper(index, msg) {
    serErrors(e => {
      const newErrors = [...e];
      newErrors[index] = msg;
      return newErrors;
    });
  }

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
    fetch("http://localhost:8080/login",{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({...details,"fullName": null,"enabled": null,"role": null})
    }).then(res => res.json())
    .then(data => {
      console.log(data)
      const inputs = document.querySelectorAll("input")
      inputs.forEach(input => input.value = "")
      if(data.success){
        setdetails(e => {})
        sessionStorage.setItem("user",JSON.stringify(data.t))
        if(checkbox)
          localStorage.setItem("user",JSON.stringify(data.t))
        navigate("/dashboard/home")
      }else{
        setdetails(e => {})
        Swal.fire({
          title: 'Error!',
          text: data.msg,
          icon: 'error',
        })
      }
    }).catch(err => {
      console.log(err)
      Swal.fire({
        title: 'Error!',
        text: "Something went wrong",
        icon: 'error',
      })
    })
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
        {errors[0]!="" && <Typography variant="small" color="red">{errors[0]}</Typography>}
        <Input label="Password" name="password" type="password" onChange={handleChange} size="lg" />
        {errors[1]!="" && <Typography variant="small" color="red">{errors[1]}</Typography>}
        <div className="-ml-2.5">
          <Checkbox label="Remember Me" name="remind-me" onChange={handleChange} />
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" onClick={validated && handleSubmit} fullWidth>
          Sign In
        </Button>
        <Typography variant="small" className="mt-6 flex justify-center">
          Don&apos;t have an account?
          <Link to="/auth/signup" className="text-base font-semibold hover:animate-pulse text-blue-500 ml-2" >Sign up</Link>
        </Typography>
      </CardFooter>
    </Card>
    </div>
  </>
  );
}

export default Signin