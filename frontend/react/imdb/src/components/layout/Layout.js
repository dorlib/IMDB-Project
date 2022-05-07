import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
import SearchBar from "./search-bar";

function Layout(props) {
  return (
    <div>
      <MainNavigation />
        <SearchBar placeholder={"Enter Movie Name"} />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
