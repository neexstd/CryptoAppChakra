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
import { useGetCryptosQuery } from "../services/cryptoapi";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Coin } from "../types";
import millify from "millify";
import "../Slick.css";

// Settings for the slider
const settings = {
  className: "center",
  arrows: false,
  infinite: false,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 6,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1441,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
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

export default function CarouselForCurrencies() {
  const { data: cryptoList, isFetching } = useGetCryptosQuery("go");
  const cryptos = cryptoList?.data?.coins;
  const [slider, setSlider] = useState<Slider | null>(null);

  // As we have used custom buttons, we need a reference variable to
  // change the state

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
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
          cryptos.map((coin: Coin, index: number) => {
            if (index > 10) return;
            return (
              <Card maxW="sm" className="slick-slide" key={coin.uuid}>
                <CardBody>
                  <Image
                    src={coin.iconUrl}
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                    w={20}
                    h={20}
                  />
                  <Stack mt="6" spacing="3">
                    <Flex
                      justifyContent="space-between"
                      gap="10px"
                      flexDirection={{ base: "column", lg: "row" }}
                    >
                      <Heading size="md">
                        {coin.name.length > 8
                          ? coin.name.slice(0, 7) + "..."
                          : coin.name}
                      </Heading>
                      <Text fontSize="xl">{millify(coin.price)}$</Text>
                    </Flex>
                    <Flex alignItems={"center"}>
                      <Link href="" isExternal>
                        <NavLink to={"/crypto/" + coin.uuid}>More</NavLink>
                        <ExternalLinkIcon mx="6px" />
                      </Link>
                    </Flex>
                  </Stack>
                </CardBody>
              </Card>
            );
          })
        )}
        <Card
          maxW="sm"
          className="slick-slide"
          h="full"
          color="white"
          bg={
            "linear-gradient(45deg, rgba(184,0,87,1) 16%, rgba(165,0,172,0.6026785714285714) 82%)"
          }
        >
          <CardBody>
            <Box w="20" h="62px" mt="20px">
              <AiFillCaretRight fontSize="50px" />
            </Box>

            <Stack mt="6" spacing="3">
              <Flex justifyContent="space-between" gap="10px">
                <Heading size="md">View All</Heading>
              </Flex>
              <Flex alignItems={"center"}>
                <Link href="#" isExternal>
                  <NavLink to="/cryptocurrencies">More</NavLink>
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
