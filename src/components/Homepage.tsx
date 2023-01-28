import millify from "millify";

import { useGetCryptosQuery } from "../services/cryptoapi";
import {
  Card,
  CardBody,
  Text,
  SimpleGrid,
  Heading,
  Image,
  Flex,
  Box,
  Button,
  VStack,
  HStack,
  Tag,
} from "@chakra-ui/react";
import { RiStockLine, RiExchangeFill } from "react-icons/ri";
import { SiMarketo } from "react-icons/si";
import { BiTime } from "react-icons/bi";
import { BsCurrencyBitcoin } from "react-icons/bs";
import CarouselForNews from "./Slider";
import CarouselForCurrencies from "./SliderForCurrencies";

const Homepage: React.FC = () => {
  const { data, isFetching } = useGetCryptosQuery("gp");
  const globalStats = data?.data?.stats;
  if (isFetching) return <>"Loading..."</>;

  return (
    <div>
      <Heading px={20} mt={5}>
        Global Crypto Stats
      </Heading>
      <SimpleGrid columns={{ base: 1, lg: 3, xl: 4, "2xl": 5 }} gap={4} p={20}>
        <Card>
          <CardBody>
            <Box fontSize="4xl" mb={4}>
              <RiStockLine />
            </Box>
            <Flex
              alignItems={{ xl: "center", base: "start" }}
              justifyContent="space-between"
              flexDirection={{ xl: "row", md: "column", base: "column" }}
            >
              <Heading fontSize={20} my={2}>
                {millify(globalStats.total)}
              </Heading>
              <Text>Total Currencies</Text>
            </Flex>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Box fontSize="4xl" mb={4}>
              <RiExchangeFill />
            </Box>
            <Flex
              alignItems={{ xl: "center", base: "start" }}
              justifyContent="space-between"
              flexDirection={{ xl: "row", md: "column", base: "column" }}
            >
              <Heading fontSize={20} my={2}>
                {millify(globalStats.totalExchanges)}
              </Heading>
              <Text>Total Exchanges</Text>
            </Flex>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Box fontSize="4xl" mb={4}>
              <SiMarketo />
            </Box>
            <Flex
              alignItems={{ xl: "center", base: "start" }}
              justifyContent="space-between"
              flexDirection={{ xl: "row", md: "column", base: "column" }}
            >
              <Heading fontSize={20} my={2}>
                {millify(globalStats.totalMarketCap)}
              </Heading>
              <Text>Total Market Cap</Text>
            </Flex>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Box fontSize="4xl" mb={4}>
              <BiTime />
            </Box>
            <Flex
              alignItems={{ xl: "center", base: "start" }}
              justifyContent="space-between"
              flexDirection={{ xl: "row", md: "column", base: "column" }}
            >
              <Heading fontSize={20} my={2}>
                {millify(globalStats.total24hVolume)}
              </Heading>
              <Text>Total 24h Volume</Text>
            </Flex>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Box fontSize="4xl" mb={4}>
              <BsCurrencyBitcoin />
            </Box>
            <Flex
              alignItems={{ xl: "center", base: "start" }}
              justifyContent="space-between"
              flexDirection={{ xl: "row", md: "column", base: "column" }}
            >
              <Heading fontSize={20} my={2}>
                {millify(globalStats.totalMarkets)}
              </Heading>
              <Text>Total Markets</Text>
            </Flex>
          </CardBody>
        </Card>
      </SimpleGrid>
      <Heading px={20} mb={20}>
        Popular coins
      </Heading>
      <Box m="70px">
        <CarouselForCurrencies />
      </Box>
      <Heading px={20} mb={20}>
        Latest News
      </Heading>
      <Box m="70px">
        <CarouselForNews />
      </Box>
    </div>
  );
};

export default Homepage;
