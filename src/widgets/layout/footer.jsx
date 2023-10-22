import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";

export function Footer({ brandName, brandLink, routes }) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 ">
        <Typography variant="small" className="font-normal text-inherit">
          &copy; {year}, made with{" "}
          <HeartIcon className="-mt-0.5 inline-block h-3.5 w-3.5 animate-pulse text-red-500" /> by{" "}
          <a
            // href={brandLink}
            // target="_blank"
            className="transition-colors hover:text-blue-500 hover:cursor-pointer"
          >
            {brandName}
          </a>{" "}
          for a Better Tech.
        </Typography>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  brandName: "Santosh",
  brandLink: "https://smartsantosh1928.netlify.com",
};

Footer.propTypes = {
  brandName: PropTypes.string,
  brandLink: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
