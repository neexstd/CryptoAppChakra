import { useGetCryptosQuery } from "../services/cryptoapi";
import { Coin } from "../types";
import {
  Card,
  CardBody,
  Image,
  Stack,
  Flex,
  Heading,
  Text,
  Link,
  SimpleGrid,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import millify from "millify";
import { AiOutlineSearch } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const Cryptocurrencies = () => {
  const { data: coinsList, isFetching } = useGetCryptosQuery("go");
  const [coins, setCoins] = useState(coinsList?.data?.coins);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    setCoins(coinsList?.data?.coins);

    const filteredData = coinsList?.data?.coins.filter((coin: Coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );

    setCoins(filteredData);
  }, [coinsList, search]);

  return (
    <>
      <Heading px={{ base: 2, md: 10, lg: 20 }} pt={10}>
        All Crypto
      </Heading>
      <InputGroup w={50 + "%"} ml={{ base: "0", md: "20" }} mt="10">
        <InputLeftElement pointerEvents="none" children={<AiOutlineSearch />} />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for coin"
          variant="filled"
          _dark={{ bg: "gray.800" }}
          bg="gray.300"
        />
      </InputGroup>
      <SimpleGrid
        columns={{ xl: 4, lg: 2, base: 1 }}
        px={{ base: 2, md: 10, lg: 20 }}
        gap="7"
        py="10"
      >
        {isFetching ? (
          <>Loading...</>
        ) : (
          coins?.map((coin: Coin, index: number) => (
            <NavLink to={`/crypto/${coin.uuid}`}>
              <Card
                maxW="sm"
                className="slick-slide"
                key={coin.uuid}
                _hover={{
                  bgColor: "gray.200",
                  cursor: "pointer",
                  _dark: { bgColor: "gray.600" },
                }}
              >
                <CardBody>
                  <Image
                    src={coin.iconUrl}
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                    w={20}
                    h={20}
                    mt="4"
                    mb="10"
                  />
                  <Stack mt="6" spacing="3">
                    <Flex justifyContent="space-between" gap="10px">
                      <Heading size="md">{coin.name}</Heading>
                      <Text fontSize="xl">{millify(coin.price)}$</Text>
                    </Flex>
                    <Flex justifyContent="space-between" gap="10px">
                      <Heading size="md" fontSize="md">
                        Daily Change
                      </Heading>
                      <Text fontSize="md">{coin.change}$</Text>
                    </Flex>
                    <Flex justifyContent="space-between" gap="10px">
                      <Heading size="md" fontSize="md">
                        Market Cap
                      </Heading>
                      <Text fontSize="md">{millify(coin.marketCap)}$</Text>
                    </Flex>
                  </Stack>
                </CardBody>
              </Card>
            </NavLink>
          ))
        )}
      </SimpleGrid>
    </>
  );
};

export default Cryptocurrencies;
