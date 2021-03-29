import { Center } from "./styles";

const Loader = ({ fullSize, center, color }) => {
  return (
    <Center fullSize={fullSize} isCenter={center}>
      Loading...
      {/* <PulseLoader size={10} color={color ? color : "#f2f2f2"}></PulseLoader> */}
    </Center>
  );
};

export default Loader;
