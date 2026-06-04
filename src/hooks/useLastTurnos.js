import { useEffect, useState } from "react";
import { getUltimosTurnos } from "../api/turnos.api";

export const useLastTurnos = () => {

    const [lastTurnos, setLastTurnos] = useState([]);
    const [loadingLastTurnos, setLoadingLastTurnos] = useState(true);
    const [errorLastTurnos, setErrorLastTurnos] = useState(null);

    const loadLastTurnos = async () => {
        try {
            const data = await getUltimosTurnos();
            setLastTurnos(data);
        } catch (err) {
            setErrorLastTurnos(err);
        } finally {
            setLoadingLastTurnos(false);
        }
    };

    useEffect(() => {
        loadLastTurnos();
    }, []);

    return {
        lastTurnos,
        loadingLastTurnos,
        errorLastTurnos,
        fetchlastTurnos: loadLastTurnos
    };
};