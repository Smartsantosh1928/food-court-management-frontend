import { HomeIcon } from "@heroicons/react/24/solid";
import Home from "./pages/dashboard/Home"
const icon = {
    className: "w-5 h-5",
};

export const routes = {
    title : "Main Menu",
    layout: "dashboard",
    chef : [
        {
            layout: "/dashboard",
            icon: <HomeIcon {...icon} />,
            name: "Home",
            path: "/home",
            element: <Home />,
        },
        {
            layout: "/dashboard",
            icon: <HomeIcon {...icon} />,
            name: "Food Items",
            path: "/food-items",
            element: <Home />,
        },
        {
            layout: "/purchase",
            icon: <HomeIcon {...icon} />,
            name: "Orders",
            path: "/current-orders",
            element: <Home />,
        },
        {
            layout: "/purchase",
            icon: <HomeIcon {...icon} />,
            name: "Payments",
            path: "/order-history",
            element: <Home />,
        },
    ]
}