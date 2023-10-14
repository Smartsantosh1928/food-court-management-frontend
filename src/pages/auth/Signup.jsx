import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { Link,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
   
  export function Signup() {
    const navigate = useNavigate()
    const [details,setdetails] = useState({})
    const [ checkbox, setCheckBox ] = useState(false)
    const [ errors, serErrors ] = useState(["","","",""])

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
      validate();
    };

    const validate = () => {
    if(details.fullname){
        const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        if(!regex.test(details.fullname)){
          setErrorHelper(0,"Name is not valid");
        }else{
          setErrorHelper(0,"");
        }
      }
      if(details.email){
        const regex = /\S+@\S+\.\S+/;
        if(!regex.test(details.email)){
          setErrorHelper(1,"Email is not valid");
        }else{
          setErrorHelper(1,"");
        }
      }
      if(details.password){
        if(details.password.length < 8){
          setErrorHelper(2,"Password must be at least 8 characters long");
        }else{
          setErrorHelper(2,"");
        }
      }
      if(details.password && details.confirmPassword){
        if(details.password !== details.confirmPassword){
          setErrorHelper(3,"Passwords do not match");
        }else{
          setErrorHelper(3,"");
        }
      }
      function setErrorHelper(index, msg) {
        serErrors(e => {
          const newErrors = [...e];
          newErrors[index] = msg;
          return newErrors;
        });
      }
    }

    const handleSubmit=(e)=>{
      e.preventDefault();
      fetch("http://localhost:8080/register",{
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({...details,"enabled": false,"role": "user"})
      }).then(res => res.json())
      .then(data => {
        const inputs = document.querySelectorAll("input")
        inputs.forEach(input => input.value = "")
        if(data.success){
          setdetails(e => {})
          Swal.fire({
            title: 'Success!',
            text: data.msg,
            icon: 'success',
          })
          navigate("/auth/signin")
        }else{
          setdetails(e => {})
          Swal.fire({
            title: 'Error!',
            text: data.msg,
            icon: 'error',
          })
        }
      })
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
          <Input label="Full Name" size="lg" name="fullname" onChange={handleChange} required />
          {errors[0]!="" && <Typography variant="small" color="red">{errors[0]}</Typography>}
          <Input label="Email" type="email" name="email" size="lg" onChange={handleChange} required />
          {errors[1]!="" && <Typography variant="small" color="red">{errors[1]}</Typography>}
          <Input label="Password" type="password" name="password" size="lg" onChange={handleChange} required />
          {errors[2]!="" && <Typography variant="small" color="red">{errors[2]}</Typography>}
          <Input label="Confirm Password" type="password" name="confirmPassword" size="lg" onChange={handleChange} required />
          {errors[3]!="" && <Typography variant="small" color="red">{errors[3]}</Typography>}
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth onClick={handleSubmit}>
            Sign Up
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Already have an account?
            <Link to="/auth/signin" className="text-base font-semibold hover:animate-pulse text-blue-500 ml-2" >Login</Link>
          </Typography>
        </CardFooter>
      </Card>
      </div>
    </>
    );
  }

export default Signup
