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
import { Article } from "../types";
import { NavLink } from "react-router-dom";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import moment from "moment";

import { useGetCryptoNewsQuery } from "../services/newsApi";

const News = () => {
  const { data: cryptoNews, isFetching } =
    useGetCryptoNewsQuery("Cryptocurrency");

  const news = cryptoNews?.value;

  return (
    <>
      <Heading px={20} pt={10}>
        Latest News in Cryptoworld
      </Heading>
      <SimpleGrid
        columns={{ "2xl": 4, xl: 3, lg: 2, base: 1 }}
        px={20}
        gap="7"
        py="10"
        position="relative"
      >
        {isFetching ? (
          <>Loading...</>
        ) : (
          news.map((article: Article, index: number) => (
            <Card maxW="sm" className="slick-slide" key={index}>
              <CardBody>
                <Image
                  src={article?.image?.thumbnail?.contentUrl}
                  alt={article?.image?.thumbnail?.type}
                  borderRadius="lg"
                  mt="4"
                  mb="10"
                  w={20}
                  h={20}
                />

                <Stack mt="6" spacing="3">
                  <Heading size="md" pb={5} min-h={20}>
                    {article?.name.length > 60
                      ? article?.name.slice(0, 60) + "..."
                      : article?.name}
                  </Heading>
                  <Text fontSize="sm">
                    {article?.description.length > 100
                      ? article?.description.slice(0, 100) + "..."
                      : article?.description}
                  </Text>
                </Stack>
                <Flex alignItems={"center"} py={4}>
                  <Link
                    href={article?.url}
                    isExternal
                    position="absolute"
                    bottom={3}
                  >
                    More
                    <ExternalLinkIcon mx="6px" />
                  </Link>
                  <Text position={"absolute"} bottom="3" right="5">
                    {moment(article.datePublished).startOf("s").fromNow()}
                  </Text>
                </Flex>
              </CardBody>
            </Card>
          ))
        )}
      </SimpleGrid>
    </>
  );
};

export default News;
