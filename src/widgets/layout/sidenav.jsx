import PropTypes from "prop-types";
import { Link, NavLink, useParams } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "../../context/index";
import { useEffect } from "react";

export function Sidenav({ brandImg, brandName, routes, match }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;

  const { id } = useParams()

  return (
    <aside
      className={`bg-blue-gray-500 ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 overflow-y-auto`}
    >
      <div
        className={`relative border-b ${
          sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
        }`}
      >
        <Link to="/" className="flex items-center gap-4 py-6 px-8">
          <Avatar src={brandImg} className="w-full h-10" />
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
          <ul className="mb-4 flex flex-col gap-1">
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-extrabold text-2xl poppins text-center uppercase text-blue-100"
                >
                  Food Court Management
                </Typography>
              </li>
              <div
                className={`relative border-b mb-5 ${
                  sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
                }`}
              ></div>
            {routes.map(({ icon, name, path, layout },key) => {
                return icon ? <li key={key}>
                <NavLink to={`/${layout ? id+"/"+layout : "dashboard"}${path}`}>
                {({ isActive }) => (
                  <Button
                  variant={isActive ? "gradient" : "text"}
                      color={
                        isActive
                          ? sidenavColor
                          : sidenavType === "dark"
                          ? "white"
                          : "blue-gray"
                      }
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                      onClick={window.innerWidth <= 768 ? ()=> {
                        setOpenSidenav(dispatch, false)
                      } : () => {}}
                      >
                      {icon}
                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                        >
                        {name}
                      </Typography>
                    </Button>
                  )}
                  </NavLink> 
                </li> : <></>
            })}
          </ul>
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo.png",
  brandName: "Environn",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;