import React from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import {
  useGetCryptoDetailQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoapi";
import {
  AiOutlineThunderbolt,
  AiOutlineNumber,
  AiOutlineCheckCircle,
  AiOutlineTrophy,
  AiOutlineStop,
  AiOutlineExclamationCircle,
  AiOutlineFundProjectionScreen,
  AiOutlineDollarCircle,
  AiOutlineMoneyCollect,
} from "react-icons/ai";
import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  Select,
  TableContainer,
  Table,
  Tfoot,
  Tr,
  Th,
  Tbody,
  Td,
  Thead,
} from "@chakra-ui/react";
import { Coin } from "../types";
import { useState } from "react";
import LineChartCrypto from "./LineChartCrypto";

const CryptoDetails = () => {
  const [timePeriod, setTimePeriod] = useState("7d");
  const { coinId } = useParams();
  const { data, isFetching } = useGetCryptoDetailQuery(coinId);
  const { data: cryptoHist } = useGetCryptoHistoryQuery({ coinId, timePeriod });
  console.log(cryptoHist);
  const cryptoDetails = data?.data?.coin;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    { title: "Rank", value: cryptoDetails?.rank, icon: <AiOutlineNumber /> },
    {
      title: "Price to USD",
      value: `$${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <AiOutlineDollarCircle />,
    },
    {
      title: "24h Volume",
      value: `$${
        cryptoDetails?.["24hVolume"] && millify(cryptoDetails?.["24hVolume"])
      }`,
      icon: <AiOutlineThunderbolt />,
    },
    {
      title: "Market Cap",
      value: `$${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <AiOutlineDollarCircle />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$${millify(cryptoDetails?.allTimeHigh?.price)}`,
      icon: <AiOutlineTrophy />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <AiOutlineFundProjectionScreen />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <AiOutlineMoneyCollect />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <AiOutlineCheckCircle />
      ) : (
        <AiOutlineStop />
      ),
      icon: <AiOutlineExclamationCircle />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails?.supply?.circulating)}`,
      icon: <AiOutlineExclamationCircle />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(cryptoDetails?.supply?.total)}`,
      icon: <AiOutlineExclamationCircle />,
    },
  ];

  return (
    <div>
      {isFetching ? (
        <>Loading...</>
      ) : (
        <Box p={{ base: "10px", md: 20 }}>
          <Flex
            alignItems={{ base: "start", md: "center" }}
            justifyContent={{ base: "start", md: "space-between" }}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Box>
              <Flex alignItems="center">
                <Image src={cryptoDetails.iconUrl} w="100px" />
                <Heading ml="10">{cryptoDetails.name}</Heading>
              </Flex>
            </Box>
            <Select
              w={{ base: "40%", md: "20%", lg: "10%" }}
              onChange={(e) => setTimePeriod(e.target.value)}
              mt={{ base: "20px", md: "0px" }}
            >
              {time.map((timeStamp) => (
                <option key={timeStamp} value={timeStamp}>
                  {timeStamp}
                </option>
              ))}
            </Select>
          </Flex>
          <Box mt="10">
            <LineChartCrypto
              cryptoChange={cryptoDetails.change}
              currentPrice={millify(cryptoDetails.price)}
              coinName={cryptoDetails.name}
              cryptoHist={cryptoHist?.data?.coins[0]}
            />
          </Box>
          <Heading fontSize="md" mt="20" mb="10">
            Global stats
          </Heading>

          <TableContainer>
            <Table size="md">
              <Thead>
                <Tr>
                  <Th>Stat</Th>
                  <Th>Value</Th>
                </Tr>
              </Thead>
              <Tbody>
                {/* <Tr>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                </Tr> */}
                {stats.map((tableInfo, index: number) => (
                  <Tr key={index}>
                    <Td>
                      <Flex alignItems="center" gap="3">
                        {tableInfo.icon} {tableInfo.title}
                      </Flex>
                    </Td>
                    <Td>{tableInfo.value}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Heading fontSize="md" mt="20" mb="10">
            Generic stats
          </Heading>
          <TableContainer>
            <Table size="md">
              <Thead>
                <Tr>
                  <Th>Stat</Th>
                  <Th>Value</Th>
                </Tr>
              </Thead>
              <Tbody>
                {/* <Tr>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                </Tr> */}
                {genericStats.map((tableInfo, index: number) => (
                  <Tr key={index}>
                    <Td>
                      <Flex alignItems="center" gap="3">
                        {tableInfo.icon} {tableInfo.title}
                      </Flex>
                    </Td>
                    <Td>{tableInfo.value}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </div>
  );
};

export default CryptoDetails;
