import {ReactNode} from "react";
import * as TooltipR from "@radix-ui/react-tooltip";

type ToolTipProps = {children: ReactNode};

type ToolTipContentProps = ToolTipProps & TooltipR.TooltipContentProps;

export const ToolTip = ({children}: ToolTipProps) => {
  return <TooltipR.Root delayDuration={400}>{children}</TooltipR.Root>;
};

ToolTip.Trigger = ({children}: ToolTipProps) => {
  return <TooltipR.Trigger asChild>{children}</TooltipR.Trigger>;
};

ToolTip.Content = ({children, ...props}: ToolTipContentProps) => {
  return (
    <TooltipR.Portal>
      <TooltipR.Content
        {...props}
        className="select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none text-violet-400 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade"
        sideOffset={5}
      >
        {children}
        <TooltipR.Arrow className="fill-white" />
      </TooltipR.Content>
    </TooltipR.Portal>
  );
};

export default ToolTip;
