import { useEffect, useState } from "react";
import { getTurnosVisor } from "../api/turnos.api";

export const useTurnosVisor = () => {

  const [turnosVisor, setTurnosVisor] = useState([]);
  const [turnosPosterior,setTurnosPosterior] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTurnosVisor = async () => {
    try {
      const data = await getTurnosVisor();
      setTurnosVisor(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const loadTurnosPosterior = async () => {
    try {
      const data = await getTurnosVisor();
      setTurnosPosterior(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTurnosVisor();
    loadTurnosPosterior();
  }, []);

  return {
    turnosVisor,
    turnosPosterior,
    loadingTurnos: loading,
    error,
    fetchTurnosVisor: loadTurnosVisor,
    fetchTurnosPosterior: loadTurnosPosterior
  };
};