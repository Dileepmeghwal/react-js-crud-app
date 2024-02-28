import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./App.css";
import ItemCrud from "./component/ItemCrud";
import CrudApp from "./component/CrudApp";
import EmployeeCrud from "./EmployeeCrud";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <ItemCrud /> */}
      {/* <CrudApp /> */}
      <EmployeeCrud />
    </>
  );
}

export default App;
