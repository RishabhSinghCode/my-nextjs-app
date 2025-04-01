"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface User {
  _id: string;
  user: string;
  email: string;
  age: string;
  mobile: string;
  interest: [];
}

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data.user);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Users List</h1>
      <Link href="/users" className="bg-green-500 text-white p-2 rounded">Add User</Link>

      {users.length > 0 && <TableContainer component={Paper} className="mt-4">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-200">
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Age</strong></TableCell>
              <TableCell><strong>Mobile</strong></TableCell>
              <TableCell><strong>Interest</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.user}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.mobile}</TableCell>
                <TableCell>{user.interest.join(", ")}</TableCell>
                <TableCell>
                  <Link href={`/users/${user._id}`}>
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
       
      {users.length === 0 && <div className="text-center m-auto justify-center">No User Added</div>}
          
    </div>
  );
};

export default UsersList;
