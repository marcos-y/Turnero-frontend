import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

/*🟢 Verde → hasta 5 min
🟡 Amarillo → 6–10 min
🔴 Rojo → más de 10 min
*/

const getColor = (minutos) => {
  if (minutos <= 5) return "#22c55e"; // verde
  if (minutos <= 10) return "#f59e0b"; // amarillo
  return "#ef4444"; // rojo
};

export default function App(props) {
  return (
    <div
      style={{
        width: "100%",
        height: 400,
      }}
    >
      <ResponsiveContainer>
        <BarChart data={props.data}>

        {/* 👇 ACÁ VA EL GRID */}
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="minutos" radius={[8, 8, 0, 0]}>
            {props.data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getColor(entry.minutos)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}