import * as RTooltip from "@radix-ui/react-tooltip";

interface Props {
  children: React.ReactChild;
  trigger: any;
}

export const Tooltip = ({ trigger: Trigger, children }: Props) => {
  return (
    <RTooltip.Root delayDuration={50}>
      <RTooltip.Trigger asChild>
        <span>{Trigger}</span>
      </RTooltip.Trigger>

      <RTooltip.Content className="p-1.5 px-3 rounded-md shadow-md bg-dark-3 tooltipOpen max-w-[300px] font-medium">
        {children}
      </RTooltip.Content>
    </RTooltip.Root>
  );
};
