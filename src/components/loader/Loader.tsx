import { Center } from "./styles";
import PulseLoader from "react-spinners/PulseLoader";

interface Props {
  fullSize?: boolean;
  center?: boolean;
  color?: string;
  size?: number;
}

const Loader: React.FC<Props> = ({ size, fullSize, center, color }) => {
  return (
    <Center fullSize={fullSize} isCenter={center}>
      <PulseLoader size={size ?? 12} color={color ?? "#f2f2f2"}></PulseLoader>
    </Center>
  );
};

export default Loader;
