import { useMetricasGlobales } from "../../hooks/useMetricasGlobales";
import { useMetricasPorDia } from "../../hooks/useMetricasPorDia";
import { useTurnos } from "../../hooks/useTurnos";
import { useTurnosDia } from "../../hooks/useTurnosDia";
import MetricasPorDia from "./MetricasPorDia";

export default function ReportesTab() {

    const {metricasGlobales} = useMetricasGlobales();
    const {metricasPorDia} = useMetricasPorDia();
    const {turnos} = useTurnos();
    const {turnosDia } = useTurnosDia();
    
    function segundosAHumano(segundos) {

        const minutos = Math.floor(segundos / 60);
        const seg = segundos % 60;

        return `${minutos}m ${seg}s`;
    };

    return (
        <>
            <MetricasPorDia 
                metricasPorDia={metricasPorDia} 
                metricasGlobales={metricasGlobales} 
                turnos={turnos} 
                turnosDia={turnosDia}/>
        </>
    );
}