// hooks/useUsers.js
import { useEffect, useState } from "react";
import { getProducts} from "../api/users.api";

export const useProducts = () => {
  const [users, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return {
    users,
    loading,
    error,
  };
};