import { useEffect, useState } from "react";
import { getCajeros } from "../api/cajeros.api";

export const useCajeros = () => {
  
  const [cajeros, setCajeros] = useState([]);
  const [loadingCajeros, setLoadingCajeros] = useState(true);
  const [errorCajeros, setErrorCajeros] = useState(null);

  const loadCajeros = async () => {
    try {
      const data = await getCajeros();
      setCajeros(data);
    } catch (err) {
      setErrorCajeros(err);
    } finally {
      setLoadingCajeros(false);
    }
  };

  useEffect(() => {
    loadCajeros();
  }, []);

  return {
    cajeros,
    loadingCajeros,
    errorCajeros,
    fetchCajeros : loadCajeros
  };
};