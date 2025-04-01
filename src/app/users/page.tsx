"use client";
import { useRouter } from "next/navigation";
import UserForm from "@/app/components/UserForm"
import axios from "axios";

const CreateUser = () => {
  const router = useRouter();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreateUser = async (userData: any) => {
    const response = await axios.post("/api/users", userData);
    if (response.status === 200) router.push("/");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create User</h1>
      <UserForm onSubmit={handleCreateUser} />
    </div>
  );
};

export default CreateUser;