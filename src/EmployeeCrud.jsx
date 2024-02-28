import axios from "axios";
import React, { useEffect, useState } from "react";
import ModelBox from "./component/ModelBox";
const API_BASE_URL = "http://localhost:3001";

const EmployeeCrud = () => {
  const [emplist, setEmplist] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectId, setSelectId] = useState(null);

  useEffect(() => {
    getAllEmployee();
  }, []);

  const getAllEmployee = () => {
    axios
      .get(`${API_BASE_URL}/employee`)
      .then((res) => {
        console.log(res.data);
        setEmplist(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSave = (data) => {
    if (selectId) {
      axios
        .put(`${API_BASE_URL}/employee/${selectId.id}`, data)
        .then((res) => {
          console.log(res.data);
          getAllEmployee();
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(`${API_BASE_URL}/employee`, data)
        .then((res) => {
          console.log(res.data);
          getAllEmployee();
        })
        .catch((err) => console.log(err));
    }
    setSelectId(null);
    setOpen(false);
  };

  const handleEdit = (id) => {
    setOpen(true);
    setSelectId(id);
  };
  return (
    <div>
      <h4>Employee Data</h4>
      <button onClick={() => setOpen(true)}>Create New </button>

      <ModelBox
        onClose={() => setOpen(false)}
        open={open}
        handleSave={handleSave}
        selectId={selectId}
      />
      <table width={"50%"}>
        <tr>
          <th>Company</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
        {emplist.length > 0 &&
          emplist.map((item) => (
            <tr>
              <td>{item.company}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
};

export default EmployeeCrud;
