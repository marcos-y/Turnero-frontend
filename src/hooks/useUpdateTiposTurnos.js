// hooks/useUpdateUser.js
import { useState } from "react";
import { updateTipo } from "../api/tiposTurno.api";

export const useUpdateTiposTurnos = () => {
    
  const [loadingTipoTurno, setLoadingTipoTurno] = useState(false);

  const updateTipoTurno = async (id, data) => {
    try {
      setLoading(true);
      await updateTipo(id, data);
    } finally {
      setLoading(false);
    }
  };

  return {
    updateTipoTurno,
    loadingTipoTurno,
  };
};