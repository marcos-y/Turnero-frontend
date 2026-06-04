import { useEffect, useState } from "react";
import { getMetricasPorDia } from "../api/turnos.api";

export const useMetricasPorDia = () => {

  const [metricasPorDia, setMetricasPorDia] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const loadMetricasPorDia = async () => {

    try {

      setLoading(true);

      const data = await getMetricasPorDia();

      setMetricasPorDia(data);

    } catch (err) {

      setError(err);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    loadMetricasPorDia();
  }, []);

  return {
    metricasPorDia,
    loadingMetricasPorDia: loading,
    error,
    fetchMetricasPorDia: loadMetricasPorDia
  };
};