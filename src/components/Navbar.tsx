import React, { ReactNode } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  DrawerContent,
} from "@chakra-ui/react";
import { FiHome, FiTrendingUp, FiCompass, FiMenu } from "react-icons/fi";
import { BsCurrencyBitcoin } from "react-icons/bs";
import { AiTwotoneBulb } from "react-icons/ai";
import { IconType } from "react-icons";
import Cryptocurrencies from "./Cryptocurrencies";
import CryptoDetails from "./CryptoDetails";
import Homepage from "./Homepage";
import News from "./News";

interface LinkItemProps {
  name: string;
  icon: IconType;
  to: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, to: "/" },
  { name: "Cryptocurrencies", icon: FiTrendingUp, to: "/cryptocurrencies" },

  { name: "News", icon: AiTwotoneBulb, to: "/news" },
];

export default function Navbar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={true}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={true}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route
            path="/cryptocurrencies"
            element={<Cryptocurrencies />}
          ></Route>
          <Route path="/crypto/:coinId" element={<CryptoDetails />}></Route>
          <Route path="/news" element={<News />}></Route>
        </Routes>
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Flex alignItems="center">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            <BsCurrencyBitcoin></BsCurrencyBitcoin>
          </Text>
          <Text fontFamily="monospace" fontSize="xl" mx="3">
            CryptoWorld
          </Text>
        </Flex>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          to={link.to}
          name={link.name}
          onClose={onClose}
        ></NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  to: string;
  name: string;
  onClose: () => void;
}
const NavItem = ({ icon, to, name, onClose }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      style={{ textDecoration: "none" }}
      onClick={() => onClose()}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {name}
      </Flex>
    </NavLink>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
    </Flex>
  );
};
