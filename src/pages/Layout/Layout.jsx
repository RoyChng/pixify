import styles from "./Layout.module.css";
import MainNavigation from "../../components/Navigation/MainNavigation";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
