import { useColorMode, IconButton } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import Navbar from "./components/Navbar";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <div className="App">
      <Navbar children={undefined} />
      <IconButton
        onClick={toggleColorMode}
        icon={isDark ? <FaSun /> : <FaMoon />}
        isRound={true}
        aria-label="sun"
        position="absolute"
        top={{ base: "5" }}
        right="10"
      ></IconButton>
    </div>
  );
}

export default App;
