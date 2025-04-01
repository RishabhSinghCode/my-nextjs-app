"use client";
import { useRouter, useParams  } from "next/navigation";
import { useEffect, useState } from "react";
import UserForm from "@/app/components/UserForm"
import axios from "axios";

const EditUser = () => {
  const router = useRouter();
  const params = useParams();
  console.log('params::',params)
  const id = params?.id as string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(`/api/users`, {
        params: { id: id },
      });
      console.log('response::',response.data.user)
      setUser(response.data.user);
    }
    if (id) fetchUser();
  }, [id]);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdateUser = async (userData: any) => {
    const response = await axios.put(`/api/users`, { id: parseInt(id), ...userData });
    if (response.status === 200) router.push("/");
  };



  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit User</h1>
      <UserForm initialData={user} onSubmit={handleUpdateUser} />
    </div>
  );
};

export default EditUser;
