import axios from "axios";
import React, { useEffect, useState } from "react";
import ModelBox from "./component/ModelBox";
const API_BASE_URL = "http://localhost:3001";

const EmployeeCrud = () => {
  const [emplist, setEmplist] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectId, setSelectId] = useState(null);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState([]);

  useEffect(() => {
    getAllEmployee();
  }, []);

  const getAllEmployee = () => {
    axios
      .get(`${API_BASE_URL}/employee`)
      .then((res) => {
        console.log(res.data);
        setEmplist(res.data);
        setSearchQuery(res.data);
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

  const handleDelete = (id) => {
    axios
      .delete(`${API_BASE_URL}/employee/${id}`)
      .then((res) => {
        console.log(res.data);
        getAllEmployee();
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearch(text);
    if (text === "") {
      setEmplist(searchQuery);
    } else {
      const searchFilterd = searchQuery.filter(
        (item) =>
          item.name.toLowerCase() && item.company.includes(text.toLowerCase())
      );
      setEmplist(searchFilterd);
    }
  };

  //   if (emplist.length <= 0) return "no data found !";
  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h4>Employee Data</h4>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
        />
        <button onClick={() => setOpen(true)}>Create New </button>
      </div>

      <ModelBox
        onClose={() => setOpen(false)}
        open={open}
        handleSave={handleSave}
        selectId={selectId}
      />
      <table width={"100%"}>
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
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
};

export default EmployeeCrud;
