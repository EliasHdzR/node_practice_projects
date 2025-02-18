import {BrowserRouter, useRoutes} from "react-router-dom";
import Home from "./Paginas/Home.jsx";
import Test from "./Paginas/Test.jsx";
import Navbar from "./Components/Navbar.jsx";

const AppRoutes = () => {
  let routes = useRoutes([
    {path: "/", element: <Home />},
    {path: "/test", element: <Test />},
  ]);

  return routes
};

function App (){
  return(
    <BrowserRouter>
      <Navbar/>
      <AppRoutes></AppRoutes>
    </BrowserRouter>
  );
}

export default App;