import { useEffect,useState } from 'react'
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
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
import { useNavigate,Link } from 'react-router-dom'

function FoodItems() {

  const navigate = useNavigate()

  const [foodItems,setFoodItems] = useState([])

  useEffect(() => {
    document.title = 'FoodItems'
    fetch("http://localhost:8080/fooditem/getall",{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(data => {
      console.log(data)
      setFoodItems(data)
    }).catch(err => {
      console.log(err)
    })
  },[])

  const TABLE_HEAD = ["Sl No", "Food Img & Name","Food Category", "Price", "Edit"];
  
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

  useEffect(() => {
    if(foodItems.length > 0){
      foodItems.forEach(async (item,index) => {
        const url = await retrieveImage(item.imageId)
        setFoodItems(foodItems => foodItems.map((foodItem, i) => i === index ? {...foodItem, imageUrl: url} : foodItem))
      })
    }
  },[foodItems])

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
      <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray" className='poppins'>
              Food list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal poppins">
              See information about all Food Items
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link to="/dashboard/food-items/add">
              <Button className="flex items-center gap-3 poppins" size="sm">
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add New Food Item
              </Button>
            </Link>
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
              ({ imageId, itemName, id, price, category, imageUrl }, index) => {
                const isLast = index === foodItems.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={id}>
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
                    <td className={classes+" flex items-center justify-center"}>
                      <Link to={`/dashboard/food-items/edit/${id}`}>
                        <Tooltip content="Edit User">
                          <IconButton variant="text">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </Link>
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

export default FoodItems