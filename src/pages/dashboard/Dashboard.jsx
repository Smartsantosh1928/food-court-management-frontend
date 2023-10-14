import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";
import { routes } from "../../routes"; 
import { Link,Route,Routes,Navigate } from "react-router-dom"

export default function Dashboard() {
  const [open, setOpen] = useState(0);
  const [ userRoutes, setUserRoutes ] = useState([])

  useEffect(() => {
    setUserRoutes(routes.chef)
  })

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-blue-300 mt-[2%] mb-[2%]">
      <div className="mb-2 flex items-center gap-4 p-4">
        <img src="/img/logo.jpeg" alt="brand" className="h-8 w-8" />
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Dashboard
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              {
                userRoutes.map((route, index) => {
                  return (
                    route.layout=="/dashboard" && <>
                      <Link to={route.layout+route.path} key={index}>
                      <ListItem>
                        <ListItemPrefix>
                          {route.icon}
                        </ListItemPrefix>
                        {route.name}
                      </ListItem>
                      </Link>
                      <Routes>
                        <Route path={route.layout+route.path} element={route.element}></Route>
                      </Routes>
                    </>
                  )
                })}
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Purchase Details
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              {
                userRoutes.map((route, index) => {
                  return (
                    route.layout=="/purchase" && <>
                      <Link to={route.layout+route.path} key={index}>
                      <ListItem>
                        <ListItemPrefix>
                          {route.icon}
                        </ListItemPrefix>
                        {route.name}
                      </ListItem>
                      </Link>
                      <Routes>
                        <Route path={route.layout+route.path} element={route.element}></Route>
                      </Routes>
                    </>
                  )
                })
              }
            </List>
          </AccordionBody>
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem onClick={() => {

        }}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}