import React,{ useEffect, useState } from 'react'
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

function NewFoodItem() {

  const [foodItem, setFoodItem] = useState({})
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  const { id } = useParams()
 
  useEffect(() => {
    if(id){
      fetch(`http://localhost:8080/fooditem/getById/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setFoodItem(data)
        fetch(`http://localhost:8080/file/download/${data.imageId}`)
        .then(res => res.blob())
        .then(blob => {
          setImage(URL.createObjectURL(blob))
        })
        .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
    }
  },[id])
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setImage(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    if(typeof e === 'string')
      setFoodItem({...foodItem, ['category']: e})
    else
    setFoodItem({...foodItem, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);
    fetch('http://localhost:8080/file/upload', {
      method: 'POST',
      body: formData
    }).then(res => res.text())
    .then(data => {
      console.log(data);
      setFoodItem({...foodItem, ['imageId']: data})
      console.log(foodItem);
      fetch('http://localhost:8080/fooditem/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...foodItem,"imageId": data})
      }).then(res => res.json())
      .then(data => {
        if(data.success){
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: data.msg,
          })
        }
      })
      .catch(err => console.log(err))
    })
  }

  return (
    <div>
      <Card color="white" className='flex items-center justify-center m-10 p-10' shadow>
      <Typography variant="h4" color="blue-gray">
        Add New Food Item
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter the details of the food item
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Select label="Select Category" name='category' onChange={handleChange} value={foodItem.category}>
            <Option value='breakfast'>Breakfast</Option>
            <Option value='lunch'>Lunch</Option>
            <Option value='dinner'>Dinner</Option>
          </Select>
          <Input size="lg" label="Food Name" name='itemName' onChange={handleChange} defaultValue={foodItem.itemName} />
          <Input size="lg" label="price" name='price' onChange={handleChange} defaultValue={foodItem.price} />
          <div className='flex'>
            <div>
              <label >Upload Food Image</label>
              <input type="file" id='image' className="mt-3" onChange={handleFileChange} />
            </div>
            {image && <img src={image} alt="food img" className='w-16 h-16' />}
          </div>
        </div>
        <Button className="mt-6" color='blue' fullWidth onClick={handleSubmit}>
          Add Food
        </Button>
      </form>
    </Card>
    </div>
  )
}

export default NewFoodItem