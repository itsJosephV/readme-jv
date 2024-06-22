import {ReactNode} from "react";
import * as TooltipR from "@radix-ui/react-tooltip";

import {cn} from "@/utils";

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
        className={cn(
          "radix-side-top:animate-slide-down-fade",
          "radix-side-right:animate-slide-left-fade",
          "radix-side-bottom:animate-slide-up-fade",
          "radix-side-left:animate-slide-right-fade",
          "inline-flex items-center rounded-md px-4 py-2.5",
          "select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none text-violet-400 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]",
        )}
        sideOffset={5}
      >
        {children}
        <TooltipR.Arrow className="fill-white" />
      </TooltipR.Content>
    </TooltipR.Portal>
  );
};

export default ToolTip;
