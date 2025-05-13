import React from 'react';
import  { useEffect, useState } from "react";
import axios from "../services/axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error,setError] = useState(null);
  useEffect(() => {
    axios
      .get("/0")
      .then((response) => {
        console.log(response.data);
        setUsers(response.data.data.usuarios);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError("Error del servidor (api).");
        }
        console.error(err);
      });      
  }, []);

  return (
    <div>
      <h2>Lista de usuarios</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.alias}&nbsp;&nbsp;&nbsp;{user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
