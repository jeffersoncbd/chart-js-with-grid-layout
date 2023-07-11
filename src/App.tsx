import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  PointElement,
  LineElement,
  RadialLinearScale,
  ArcElement
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Line, PolarArea } from "react-chartjs-2";
import { Responsive, WidthProvider } from "react-grid-layout";

import { faker } from "@faker-js/faker";

import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  PointElement,
  LineElement,
  RadialLinearScale,
  ArcElement
);

const graphStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid gray",
  borderRadius: "8px"
};

export default function App() {
  const [values1, setValues1] = useState({
    red: [1, 2, 3, 4],
    blue: [4, 3, 2, 1]
  });
  const [values2, setValues2] = useState({
    red: [3, 1, 4, 2],
    blue: [2, 5, 0, 3]
  });
  const [values3, setValues3] = useState([1, 3, 2, 4]);

  async function sleep() {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }
  function randomValues() {
    return [
      Number(faker.random.numeric(1)),
      Number(faker.random.numeric(1)),
      Number(faker.random.numeric(1)),
      Number(faker.random.numeric(1))
    ];
  }
  async function updateValues() {
    setInterval(() => {
      setValues1({
        blue: values1.blue,
        red: randomValues()
      });
    }, 5000);
    await sleep();
    setInterval(() => {
      setValues1({
        red: values1.red,
        blue: randomValues()
      });
    }, 5000);
    await sleep();
    setInterval(() => {
      setValues2({
        red: values1.red,
        blue: randomValues()
      });
    }, 5000);
    await sleep();
    setInterval(() => {
      setValues2({
        blue: values1.blue,
        red: randomValues()
      });
    }, 5000);
    await sleep();
    setInterval(() => {
      setValues3(randomValues());
    }, 5000);
  }

  useEffect(() => {
    updateValues();
  }, []);

  const [layout, setLayout] = useState<ReactGridLayout.Layout[]>([
    {
      i: "a",
      x: 1,
      y: 0,
      w: 4,
      h: 2,
      isResizable: true,
      resizeHandles: ["se"]
    },
    {
      i: "b",
      x: 1,
      y: 3,
      w: 4,
      h: 2,
      isResizable: true,
      resizeHandles: ["se"]
    },
    {
      i: "c",
      x: 6,
      y: 0,
      w: 4,
      h: 4,
      isResizable: true,
      resizeHandles: ["se"]
    }
  ]);

  return (
    <>
      <ResponsiveGridLayout
        rowHeight={90}
        layouts={{ lg: layout }}
        onLayoutChange={(_, layouts) => setLayout(layouts.lg)}
        useCSSTransforms={false}
        isDroppable
        isDraggable
      >
        <div key="a" style={graphStyle}>
          <Bar
            style={{ margin: "24px" }}
            options={{
              responsive: true,
              plugins: { title: { display: true, text: "Grafico 01" } }
            }}
            data={{
              labels: ["JAN", "FEV", "MAR", "ABR"],
              datasets: [
                {
                  label: "azul",
                  data: values1.blue,
                  backgroundColor: "rgba(53, 162, 235, 0.5)"
                },
                {
                  label: "vermelho",
                  data: values1.red,
                  backgroundColor: "rgba(255, 99, 132, 0.5)"
                }
              ]
            }}
          />
        </div>
        <div key="b" style={graphStyle}>
          <Line
            style={{ margin: "24px" }}
            options={{
              responsive: true,
              plugins: { title: { display: true, text: "Grafico 02" } }
            }}
            data={{
              labels: ["JAN", "FEV", "MAR", "ABR"],
              datasets: [
                {
                  label: "azul",
                  data: values2.blue,
                  backgroundColor: "rgba(53, 162, 235, 0.5)"
                },
                {
                  label: "vermelho",
                  data: values2.red,
                  backgroundColor: "rgba(255, 99, 132, 0.5)"
                }
              ]
            }}
          />
        </div>
        <div key="c" style={graphStyle}>
          <PolarArea
            style={{ margin: "24px" }}
            options={{
              responsive: true,
              plugins: { title: { display: true, text: "Grafico 03" } }
            }}
            data={{
              labels: ["Red", "Yellow", "Green", "Purple"],
              datasets: [
                {
                  label: "# of Votes",
                  data: values3,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    "rgba(75, 192, 192, 0.5)",
                    "rgba(153, 102, 255, 0.5)"
                  ],
                  borderWidth: 1
                }
              ]
            }}
          />
        </div>
      </ResponsiveGridLayout>
    </>
  );
}
