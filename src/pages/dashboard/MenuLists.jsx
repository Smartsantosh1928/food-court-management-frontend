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
  Switch,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useNavigate,Link } from 'react-router-dom'

function MenuLists() {

  const navigate = useNavigate()

  const [ menuLists,setMenuLists ] = useState([])

  const TABLE_HEAD = ["Sl No", "Menu Name","Food Items", "Created By", "Active Status", "Edit"];
  
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
    document.title = 'MenuLists';
    fetch("http://localhost:8080/menuList/getall", {
      method: 'GET',
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);

        const menuListsWithImages = await Promise.all(data.map(async (menu) => {
          const foodItemsWithImages = await Promise.all(menu.foodItems.map(async (foodItem) => {
            const imageUrl = await retrieveImage(foodItem.imageId);
            return { ...foodItem, imageUrl };
          }));

          return { ...menu, foodItems: foodItemsWithImages };
        }));

        setMenuLists(menuListsWithImages);
        console.log(menuListsWithImages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const toggleToday = (id) => {
    fetch(`http://localhost:8080/menuList/set-today-menu/${id}`, {
      method: 'POST',
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const newMenuLists = menuLists.map((menu) => {
        if(menu.activeToday) {
          return { ...menu, activeToday: false }; 
        }else if (menu.id === id) {
          return { ...menu, activeToday: !menu.activeToday };
        } else {
          return menu;
        }
      });
      setMenuLists(newMenuLists);
    })
    .catch((err) => console.log(err) );
  }

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
      <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray" className='poppins'>
              Menu lists
            </Typography>
            <Typography color="gray" className="mt-1 font-normal poppins">
              See information about all Menu Lists
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link to="add">
              <Button className="flex items-center gap-3 poppins" size="sm">
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add New Menu List
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
            {menuLists.map(
              ({ id, name, activeToday, createdBy, foodItems }, index) => {
                const isLast = index === MenuLists.length - 1;
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
                      <div className="flex items-center justify-center">
                          <Typography
                            variant="small"
                            color="blue"
                            className="font-normal text-xl poppins uppercase"
                          >
                            {name}
                          </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center justify-center -space-x-4">
                        {foodItems.map(({imageUrl},index) => 
                        index>8 ? null :
                          <Avatar
                            variant="circular"
                            alt={"Food Item"+index}
                            className="border-2 border-white hover:z-10 focus:z-10"
                            src={imageUrl}
                          />
                        )}
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center justify-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-base uppercase"
                        >
                          {createdBy}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center justify-center">
                        <Switch color="blue" checked={activeToday} disabled={activeToday} onClick={() => toggleToday(id)} />
                      </div>
                    </td>
                    <td className={classes+" flex items-center justify-center"}>
                      <Link to={`edit/${id}`}>
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

export default MenuLists