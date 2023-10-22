import { useEffect,useState } from 'react'
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  CheckCircleIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useNavigate,Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';

function NewMenuList() {

  const { id } = useParams()
  const user = JSON.parse(sessionStorage.getItem("user")).fullName
  const [ foodItems,setFoodItems ] = useState([])
  const [ load,setLoad ] = useState(false)
  const [ menuData,setMenuData ] = useState({createdBy:user,activeToday:false,foodItems:[],name:''})

  useEffect(() => {
    document.title = 'FoodItems'
  
    const retrieveImage = async (id) => {
      try {
        const res = await fetch(`http://localhost:8080/file/download/${id}`);
        if (res.ok) {
          const blob = await res.blob();
          return URL.createObjectURL(blob);
        } else {
          throw new Error('Failed to fetch image');
        }
      } catch (err) {
        console.error(err);
        return ''; 
      }
    };

    fetch("http://localhost:8080/fooditem/getall",{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(data => {
      if(data.length > 0){
        if(id){
          let menu;
          fetch(`http://localhost:8080/menuList/get/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              menu = data.t;
              setMenuData(data.t);
            }
          })
          .catch((err) => console.log(err));
          data.forEach(async (item,index) => {
            const url = await retrieveImage(item.imageId)
            data = data.map((foodItem, i) => i === index ? {...foodItem, clicked:menu.foodItems.some((item) => item.id === foodItem.id), imageUrl: url} : foodItem)
            setFoodItems(data)
          })
        }else{
          data.forEach(async (item,index) => {
            const url = await retrieveImage(item.imageId)
            data = data.map((foodItem, i) => i === index ? {...foodItem, clicked:false, imageUrl: url} : foodItem)
            setFoodItems(data)
          })
        }
      }
    }).catch(err => {
      console.log(err)
    })
  },[])

  const TABLE_HEAD = ["Status","Sl No", "Food Img & Name","Food Category", "Price"];
  
  const setMenuItem = (index) => {
    setFoodItems((foodItems) =>
      foodItems.map((foodItem,key) =>
      key === index ? { ...foodItem, clicked: true } : foodItem
    ));
    const foodItem = foodItems[index]
    setMenuData((menuData) => ({ ...menuData, foodItems: [...menuData.foodItems, foodItem] }));
    console.log(menuData);
  }
  
  const removeMenuItem = (index) => {
    setFoodItems((foodItems) =>
      foodItems.map((foodItem,key) =>
      key === index ? { ...foodItem, clicked: false } : foodItem
    ));
    setMenuData((menuData) => ({ ...menuData, foodItems: menuData.foodItems.filter((foodItem) => foodItem.id !== foodItems[index].id) }));
    console.log(menuData);
  }

  const handleChange = (e) => {
    const { name,value } = e.target
    setMenuData((menuData) => ({ ...menuData, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(id){
      fetch(`http://localhost:8080/menuList/update`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(menuData)
      }).then(res => res.json())
      .then(data => {
        if(data.success){
          console.log(data)
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: data.msg,
          })
          setMenuData({createdBy:user,activeToday:false,foodItems:[],name:''});
          setFoodItems(foodItems.map((foodItem) => ({ ...foodItem, clicked: false })))
        }
      }).catch(err => console.log(err))
    }else{
      fetch("http://localhost:8080/menuList/add",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(menuData)
      }).then(res => res.json())
      .then(data => {
        if(data.success){
          console.log(data)
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: data.msg,
          })
          setMenuData({createdBy:user,activeToday:false,foodItems:[],name:''});
          setFoodItems(foodItems.map((foodItem) => ({ ...foodItem, clicked: false })))
        }
      }).catch(err => console.log(err))
    }
  }

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
      <div className="flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray" className='poppins'>
              {id ? "Update" : "New"} Menu List
            </Typography>
            <div className='mt-2'>
              <Input color="blue" name='name' label="Menu Name" onChange={handleChange} value={menuData.name} />
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button className="flex items-center gap-3 poppins" size="sm" onClick={handleSubmit}>
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add New Menu List
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-center gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {foodItems.map(
              ({ imageId, itemName, id, clicked, price, category, imageUrl }, index) => {
                const isLast = index === foodItems.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={id}>
                    <td className={classes} onClick={() => {clicked ? removeMenuItem(index) : setMenuItem(index)}}>
                      <div className='flex justify-center items-center flex-col'>
                        {clicked ? 
                        <><CheckCircleIcon strokeWidth={2} className="h-8 w-8 cursor-pointer text-blue-500" /><Typography>Selected</Typography></>
                        : <><XCircleIcon strokeWidth={2} className="h-8 w-8 cursor-pointer text-red-500" /><Typography>Unselected</Typography></>}
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {index+1}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center justify-start gap-3">
                        <Avatar src={imageUrl} alt={itemName} size="md" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue"
                            className="font-normal poppins uppercase"
                          >
                            {itemName}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal poppins opacity-70"
                          >
                            {category}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center justify-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-2xl uppercase"
                        >
                          {category}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center justify-center">
                        <Typography
                          variant="small"
                          color="teal"
                          className="font-extrabold"
                        >
                          {price}
                        </Typography>
                      </div>
                    </td>
                    
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default NewMenuList