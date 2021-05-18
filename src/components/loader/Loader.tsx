import { Center } from "./styles";
import PulseLoader from "react-spinners/PulseLoader";
import { NoteyColors } from "@lib/constants";

interface Props {
  fullSize?: boolean;
  center?: boolean;
  color?: string;
  size?: number;
}

const Loader: React.FC<Props> = ({ size, fullSize, center, color }) => {
  return (
    <Center fullSize={fullSize} isCenter={center}>
      <PulseLoader size={size ?? 12} color={color ?? NoteyColors.Text} />
    </Center>
  );
};

export default Loader;
