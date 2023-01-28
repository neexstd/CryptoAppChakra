import {
  Box,
  IconButton,
  useBreakpointValue,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Flex,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
// Here we have used react-icons package for the icons
import { BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carouscoin Lib
import Slider from "react-slick";
import { AiFillCaretRight } from "react-icons/ai";
import { useGetCryptoNewsQuery } from "../services/newsApi";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import "../Slick.css";

// Settings for the slider
const settings = {
  className: "center",
  arrows: false,
  infinite: false,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 7000,
  slidesToShow: 4,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1441,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

import { Article } from "../types";

export default function CarouselForNews() {
  const [slider, setSlider] = useState<Slider | null>(null);

  const { data: cryptoNews, isFetching } =
    useGetCryptoNewsQuery("Cryptocurrency");

  const news = cryptoNews?.value;

  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "-20px" });

  return (
    <Box position="relative">
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <IconButton
        aria-label="right-arrow"
        colorScheme="purple"
        borderRadius="full"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
        visibility={{ base: "hidden", md: "visible" }}
      >
        <BiRightArrowAlt />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {isFetching ? (
          <div>Loading...</div>
        ) : (
          news.map((article: Article, index: number) => {
            if (index > 10) return;
            return (
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
                      {article?.name.length > 25
                        ? article?.name.slice(0, 25) + "..."
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
                  </Flex>
                </CardBody>
              </Card>
            );
          })
        )}
        <Card
          maxW="sm"
          className="slick-slide"
          color="white"
          bg={
            "linear-gradient(45deg, rgba(184,0,87,1) 16%, rgba(165,0,172,0.6026785714285714) 82%)"
          }
        >
          <CardBody>
            <Box w="20" h="180px" mt="20px">
              <AiFillCaretRight fontSize="130px" />
            </Box>

            <Stack mt="6" spacing="3">
              <Flex justifyContent="space-between" gap="10px">
                <Heading size="md">View All</Heading>
              </Flex>
              <Flex alignItems={"center"}>
                <Link href="#" isExternal>
                  <NavLink to="/news">More</NavLink>
                  <ExternalLinkIcon mx="6px" />
                </Link>
              </Flex>
            </Stack>
          </CardBody>
        </Card>
      </Slider>
    </Box>
  );
}
