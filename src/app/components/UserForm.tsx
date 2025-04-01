"use client";
import React, { useState, useEffect } from "react";
import { IconButton, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

interface User {
  _id?: string;
  user: string;
  interest: string[];
  age: string;
  mobile: string;
  email: string;
}

interface UserFormProps {
  initialData?: User | null;
  onSubmit: (userData: User) => Promise<void>;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit }) => {
  const [user, setUser] = useState<User>({
    user: "",
    interest: [],
    age: "",
    mobile: "",
    email: "",
  });
  const [newInterest, setNewInterest] = useState("");

  useEffect(() => {
    if (initialData) {
      setUser(initialData);
    }
  }, [initialData]);

  async function submitHandler() {
    if(user.user.trim() !== '' && user.email.trim() !== ''){
        await onSubmit(user);
        setUser({ user: "",interest: [], age: "", mobile: "", email: "" });
    }
  }

  function addInterest() {
    if (newInterest.trim() && !user.interest.includes(newInterest)) {
      setUser((prev) => ({ ...prev, interest: [...prev.interest, newInterest] }));
      setNewInterest(""); 
    }
  }

  function removeInterest(index: number) {
    setUser((prev) => ({
      ...prev,
      interest: prev.interest.filter((_, i) => i !== index),
    }));
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1 className="text-xl font-bold">{initialData ? "Edit User" : "Create User"}</h1>

    {["user", "age", "mobile", "email"].map((field) => (
      <div key={field} className="w-64 mb-4">
        <label htmlFor={field} className="block">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
        <input
          className="p-2 border-2 rounded-lg w-full border-gray-200 focus:outline-none focus:border-gray-600"
          id={field}
          type="text"
          value={user[field as keyof User] || ""}
          onChange={(e) => setUser({ ...user, [field]: e.target.value })}
          placeholder={field}
        />
      </div>
    ))}

<div className="w-64 mb-4">
        <label htmlFor="interest">Interests</label>
        <div className="flex">
          <input
            id="interest"
            className="p-2 border-2 rounded-lg w-full border-gray-300 focus:outline-none focus:border-gray-600"
            type="text"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            placeholder="Add an interest"
            onKeyPress={(e) => e.key === "Enter" && addInterest()} // Press Enter to add
          />
          <IconButton color="primary" onClick={addInterest} className="ml-2">
            <AddIcon />
          </IconButton>
        </div>
      </div>

      <div className="w-64 flex flex-wrap gap-2 mb-4 p-2">
        {user.interest.map((item, index) => (
           <Chip
           key={index}
           label={item}
           onDelete={() => removeInterest(index)}
           deleteIcon={<DeleteIcon sx={{ color: "red" }} />} 
           sx={{ color: "white",  "& .MuiChip-deleteIcon": { color: "red" }, "& .MuiChip-deleteIcon:hover": { color: "darkred" } }}
           variant="outlined"
         />
        ))}
      </div>

      <button onClick={submitHandler} className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600">
        {initialData ? "Update User" : "Add User"}
      </button>
    </div>
  );
};

export default UserForm;
