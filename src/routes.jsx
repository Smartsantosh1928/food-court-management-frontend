import { HomeIcon } from "@heroicons/react/24/solid";
import Home from "./pages/dashboard/Home"
import FoodItems from "./pages/dashboard/FoodItems"
import NewFoodItem from "./pages/dashboard/NewFoodItem"
import MenuLists from "./pages/dashboard/MenuLists"
import NewMenuList from "./pages/dashboard/NewMenuList"
const icon = {
    className: "w-5 h-5",
};

export const routes = {
    title : "Main Menu",
    layout: "dashboard",
    chef : [
        {
            icon: <HomeIcon {...icon} />,
            name: "Home",
            path: "/home",
            element: <Home />,
        },
        {
            icon: <HomeIcon {...icon} />,
            name: "Food Items",
            path: "/food-items",
            element: <FoodItems />,
        },
        {
            path: "/food-items/add",
            element: <NewFoodItem />,
        },
        {
            path: "/food-items/edit/:id",
            element: <NewFoodItem />,
        },
        {
            icon: <HomeIcon {...icon} />,
            name: "Menu Lists",
            path: "/menu-lists",
            element: <MenuLists />,
        },
        {
            path: "/menu-lists/add",
            element: <NewMenuList />,
        },
        {
            path: "/menu-lists/edit/:id",
            element: <NewMenuList />,
        },
        {
            icon: <HomeIcon {...icon} />,
            name: "Orders",
            path: "/current-orders",
            element: <Home />,
        },
        {
            icon: <HomeIcon {...icon} />,
            name: "Payments",
            path: "/order-history",
            element: <Home />,
        },
    ]
}

export default routes