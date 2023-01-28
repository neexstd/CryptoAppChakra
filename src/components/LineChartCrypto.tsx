import { Box, Flex, Text } from "@chakra-ui/react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from "chart.js";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

Chart.register(LineController, LineElement, PointElement, LinearScale, Title);

type Props = {
  cryptoChange: string;
  currentPrice: string;
  coinName: string;
  cryptoHist: any;
};

const LineChartCrypto: React.FC<Props> = ({
  cryptoChange,
  currentPrice,
  coinName,
  cryptoHist,
}) => {
  console.log(cryptoHist);
  const data =
    // {
    //   name: "Page A",
    //   uv: 4000,
    //   pv: 2400,
    //   amt: 2400,
    // },
    cryptoHist?.sparkline.map((line: string[], index: number) => {
      return {
        name: "",
        Price: Number(line),
      };
    });

  const [chartOptions, setChartOptions] = useState({});

  return (
    <div>
      <Flex gap="5">
        <Text>Current price: {currentPrice}$</Text>
        <Text>
          {cryptoChange[0] === "-" ? (
            <>
              <Text color="red.400">
                <Flex alignItems="center" gap="1">
                  {cryptoChange}%
                  <AiFillCaretDown />
                </Flex>
              </Text>
            </>
          ) : (
            <>
              <Text color="green.600">
                <Flex alignItems="center" gap="1">
                  {cryptoChange}%
                  <AiFillCaretUp />
                </Flex>
              </Text>
            </>
          )}
        </Text>
      </Flex>

      <Box mt="10" w={"100%"} h={"100%"}>
        <div style={{ width: "100%", height: "400px" }}>
          <ResponsiveContainer>
            <LineChart width={1500} height={600} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="Price"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Box>
    </div>
  );
};

export default LineChartCrypto;
