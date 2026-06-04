// hooks/useUpdateUser.js
import { useState } from "react";
import { updateUser } from "../api/users.api";

export const useUpdateUser = () => {
  
  const [loading, setLoading] = useState(false);

  const update = async (id, data) => {
    try {
      setLoading(true);
      await updateUser(id, data);
    } finally {
      setLoading(false);
    }
  };

  return {
    update,
    loading,
  };
};