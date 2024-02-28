import axios from "axios";
import React, { useEffect, useState } from "react";
import Model from "../component/Model";

const API_BASE_URL = "http://localhost:3001";

const CrudApp = () => {
  const [data, setData] = useState([]);
  const [isModel, setModel] = useState(false);
  const [selectId, setSelectId] = useState(null);
  useEffect(() => {
    getList();
  }, []);
  const getList = () => {
    axios
      .get(`${API_BASE_URL}/items`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => console.log(error));
  };

  //   delet functionality
  const handelDelete = (id) => {
    axios
      .delete(`${API_BASE_URL}/items/${id}`)
      .then((res) => {
        console.log(res);
        getList();
      })
      .catch((error) => console.log(error));
  };

  //   edit functionality
  const handleEdit = (id) => {
    console.log(selectId);
    setSelectId(id);
    setModel(true);

  };

  //   create and update functionality & api calling
  const handleSave = (editData) => {
    if (selectId) {
      axios
        .put(`${API_BASE_URL}/items/${selectId.id}`, editData)
        .then((res) => {
          console.log(res.data);
          getList();
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(`${API_BASE_URL}/items`, editData)
        .then((res) => {
          console.log(res.data);
          getList();
        })
        .catch((error) => console.log(error));
    }
    setSelectId(null);
    setModel(false);
  };
  return (
    <>
      <h5>crud App</h5>
      <button onClick={() => setModel(true)}>Create</button>
      <Model
        open={isModel}
        onClose={() => {
          setModel(false);
          setSelectId(null);
        }}
        handleSave={(data) => handleSave(data)}
        selectId={selectId}
      />
      <table width={"100%"}>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
        <tbody>
          {data.map((list) => (
            <tr key={list.id}>
              <td>{list.name}</td>
              <td>{list.price}</td>
              <td>
                <button onClick={() => handelDelete(list.id)}>delete</button>
              </td>
              <td>
                <button onClick={() => handleEdit(list)}>edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CrudApp;
