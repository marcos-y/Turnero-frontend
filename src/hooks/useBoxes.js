import { useEffect, useState } from "react";
import { getBoxes } from "../api/boxes.api";

export const useBoxes = () => {

    const [boxes, setBoxes] = useState([]);
    const [loadingBoxes, setLoadingBoxes] = useState(true);
    const [errorBoxes, setErrorBoxes] = useState(null);

    const loadBoxes = async () => {
        try {
            const data = await getBoxes();
            setBoxes(data);
        } catch (err) {
            setErrorBoxes(err);
        } finally {
            setLoadingBoxes(false);
        }
    };

    useEffect(() => {

        loadBoxes();
        const interval = setInterval(loadBoxes, 5000);
        return () => clearInterval(interval);

    }, []);

    return {
        boxes,
        loadingBoxes,
        errorBoxes,
        fetchBoxes: loadBoxes
    };
};