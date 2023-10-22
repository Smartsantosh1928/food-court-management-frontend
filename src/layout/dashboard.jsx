import { Routes, Route,useNavigate } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import Sidenav from "../widgets/layout/sidenav";
import DashboardNavbar from "../widgets/layout/dashboard-navbar";
import Configurator from "../widgets/layout/configurator";
import Footer from "../widgets/layout/footer";
import routes from "../routes";
import { useMaterialTailwindController, setOpenConfigurator } from "../context/index";
import { useEffect, useState } from "react";
import { SearchProvider } from "../context/searchContext";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const navigate = useNavigate()
  const [userData,setUserData]=useState([]);

  useEffect(() => {
    if(!sessionStorage.getItem("user"))
      navigate("/auth/sign-in")
    setUserData(routes["chef"])
  },[])

  return (
    <SearchProvider> 
    <div className="min-h-screen bg-blue-gray-50 poppins">
      <Sidenav
        routes={userData}
        brandImg={
          sidenavType === "dark" ? "/img/logo.jpeg" : "/img/logo.jpeg"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Routes>  
          {userData.map(({ path, element }) => (
            <Route exact key={path} path={path} element={element} />
            ))}  
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  </SearchProvider>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
