import { useEffect, useState } from "react";
import { getTurnos } from "../api/turnos.api";

export const useTurnos = () => {

  const [turnos, setTurnos] = useState([]);
  const [turnosPosterior,setTurnosPosterior] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTurnos = async () => {
    try {
      const data = await getTurnos();
      setTurnos(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const loadTurnosPosterior = async () => {
    try {
      const data = await getTurnos();
      setTurnosPosterior(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTurnos();
    loadTurnosPosterior();
  }, []);

  return {
    turnos,
    turnosPosterior,
    loadingTurnos: loading,
    error,
    fetchTurnos: loadTurnos,
    fetchTurnosPosterior: loadTurnosPosterior
  };
};