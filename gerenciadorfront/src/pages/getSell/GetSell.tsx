import * as C from "./GetSell.style";

import TitleContent from "../../components/titlePages/titlePages.style";
import { sellContainer as Container } from "../sell/Sell.style";

import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryTooltip,
  VictoryZoomContainer,
} from "victory";
import { useEffect, useState } from "react";

import { TypeMapProducts } from "../../types/TypeProductMap";

import { instanceApiMain } from "../../utils/instance";
import { getTokenAuthorization } from "../../utils/handleCookies";

import { TypeSalesMap } from "../../types/TypeSalesMap";
import { greenMain } from "../../colors/colorsMain";
import CircleLoad from "../../components/circleLoad/CircleLoad";
import DisplayInfo from "../../components/displayInfo/DisplayInfo";

type SeriesType = {
  name: string;
  data: number[];
};

type DatesChartWithSumType = {
  normalizeDateLoop: Date;
  sumResult: number;
}[];

const GetSell = () => {
  const [info, setInfo] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [load, setLoad] = useState<boolean>(true);

  const [data, setData] = useState<[]>([]);
  const [chartData, setChartData] = useState<DatesChartWithSumType>([]);

  const [total, setTotal] = useState<number>(0);
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const handleData = async () => {
      setLoad(true);
      await instanceApiMain
        .get("/sell/get", {
          headers: {
            Authorization: `Bearer ${getTokenAuthorization()}`,
          },
        })
        .then((response) => {
          setData(response.data.sales);
          setLoad(false);
        })
        .catch((err) => {
          setError(err.response.data.message);
          setLoad(false);
        });
    };

    handleData();
  }, []);

  useEffect(() => {
    sumDaySell();
  }, [data, date]);

  const sumDaySell = () => {
    //datas do grafico com soma das vendas diarias
    const datesChartWithSum: DatesChartWithSumType = [];
    // data de referência, proximos 30 dias
    const referenceDate: Date = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 30
    );

    for (
      let dateLoop = new Date(date);
      dateLoop < referenceDate;
      dateLoop.setDate(dateLoop.getDate() + 1)
    ) {
      // normalizando a data do loop, zerando o horario
      const normalizeDateLoop = new Date(
        dateLoop.getFullYear(),
        dateLoop.getMonth(),
        dateLoop.getDate()
      );

      //filtrar vendas realizadas no dia atual do loop
      const salesActualDate: TypeSalesMap[] = data.filter(
        (sell: TypeSalesMap) => {
          const dateCreatedAt = new Date(sell.createdAt);
          // normalizando a data da venda, zerando o horario
          const normalizeDate = new Date(
            dateCreatedAt.getFullYear(),
            dateCreatedAt.getMonth(),
            dateCreatedAt.getDate()
          );

          // comparação
          if (normalizeDate.getTime() === normalizeDateLoop.getTime()) {
            return sell;
          }
        }
      );

      let sumResult = 0;
      for (let sell of salesActualDate) {
        sumResult += sell.amount;
      }

      datesChartWithSum.push({ normalizeDateLoop, sumResult });
    }

    setChartData(datesChartWithSum);
    getTotalChart(datesChartWithSum);
  };

  const getTotalChart = (date: DatesChartWithSumType): void => {
    let sumInterval = 0;
    for (let item of date) {
      sumInterval += item.sumResult;
    }

    setTotal(sumInterval);
  };

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dates = e.target.value.split("-");
    const dateParse = new Date(
      parseInt(dates[0]),
      parseInt(dates[1]) - 1,
      parseInt(dates[2])
    );
    setDate(dateParse);
  };

  const getDomainY = (): [number, number] => {
    const maxDaySellSum = Math.max(
      ...chartData.map((item) => item.sumResult ?? 0)
    );
    console.log(maxDaySellSum);

    // retornando a trupla para o dominio do eixo y
    return [0, maxDaySellSum + maxDaySellSum * 0.1 || 1];
  };

  return (
    <Container>
      <TitleContent>Vendas</TitleContent>
      {load ? (
        <CircleLoad size={40} />
      ) : (
        <>
           <form className="formGetSell">
              <label>Escolha uma data - intervalo de 30 dias</label>
              <input onChange={handleDate} type="date"></input>
            </form>

          <C.ContainerDisplays>
            <DisplayInfo title="Valor total em vendas" total={total}/>
            <DisplayInfo title="Valor total lucro líquido" total={0}/>
            <DisplayInfo title="Despesas" total={0}/>
          </C.ContainerDisplays>

          <C.ContainerChart>
            {chartData && chartData.length > 0 && (
              <VictoryChart
                domain={{ x: [0, 31], y: getDomainY() }}
                theme={VictoryTheme.clean}
                height={600}
                width={1100}
                containerComponent={
                  <VictoryZoomContainer
                    zoomDimension="x"
                    allowPan={true}
                    allowZoom={false}
                    minimumZoom={{ x: 1 }}
                    zoomDomain={{ x: [0, 9] }}
                  />
                }
                padding={{ left: 100, top: 50, right: 100, bottom: 80 }}
              >
                <VictoryBar
                  labels={({ datum }) => datum.y + " R$"}
                  labelComponent={<VictoryLabel dy={0} />}
                  data={chartData.map((d, i) => ({
                    y: d.sumResult,
                    x: i + 1,
                  }))}
                  style={{
                    data: {
                      fill: `${greenMain}`,
                      width: 20,
                    },
                    labels: { fontSize: 11 },
                  }}
                />

                <VictoryAxis
                  crossAxis
                  tickCount={chartData.length}
                  tickFormat={(x) =>
                    chartData[x - 1]
                      ? chartData[x - 1].normalizeDateLoop.toLocaleDateString(
                          "pt-BR"
                        )
                      : ""
                  }
                  style={{
                    tickLabels: { angle: -45, fontSize: 12, padding: 30 },
                  }}
                />
                <VictoryAxis
                  dependentAxis
                  style={{
                    grid: {
                      stroke: "#CFD8DC",
                      strokeDasharray: "10, 5",
                    },
                  }}
                  tickFormat={(y) => {
                    return `${y} R$`;
                  }}
                />
              </VictoryChart>
            )}
          </C.ContainerChart>
        </>
      )}
    </Container>
  );
};

export default GetSell;
