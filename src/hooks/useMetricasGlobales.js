import { useEffect, useState } from "react";
import { getMetricasGlobales } from "../api/turnos.api";

export const useMetricasGlobales = () => {

  const [metricasGlobales, setMetricasGlobales] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMetricasGlobales = async () => {

    try {

      setLoading(true);

      const data = await getMetricasGlobales();

      setMetricasGlobales(data);

    } catch (err) {

      setError(err);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    loadMetricasGlobales();
  }, []);

  return {
    metricasGlobales,
    loadingMetricasGlobales: loading,
    error,
    fetchMetricasGlobales: loadMetricasGlobales
  };
};