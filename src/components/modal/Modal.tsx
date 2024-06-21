/* eslint-disable react/prop-types */
import * as Dialog from "@radix-ui/react-dialog";
import {ReactNode} from "react";

import {CancelIcon} from "@/icons";

type ModalProps = {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type ModalContentProps = {children: ReactNode; title: string} & Dialog.DialogContentProps;

const Modal = ({children, open, onOpenChange}: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
};

Modal.Trigger = ({children}: {children: ReactNode}) => {
  return <Dialog.Trigger asChild>{children}</Dialog.Trigger>;
};

Modal.Content = ({children, title, ...props}: ModalContentProps) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=closed]:animate-[dialog-overlay-hide_200ms] data-[state=open]:animate-[dialog-overlay-show_200ms]" />
      <Dialog.Content
        {...props}
        className="fixed left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md border border-stone-100/20 bg-stone-900 p-8 text-stone-900 shadow data-[state=closed]:animate-[dialog-content-hide_200ms] data-[state=open]:animate-[dialog-content-show_200ms]"
      >
        <div className="flex items-center justify-between">
          <Dialog.Title className="text-xl text-stone-100">{title}</Dialog.Title>
          <Dialog.Close>
            <CancelIcon className="text-stone-400 transition-colors hover:text-stone-100" />
          </Dialog.Close>
        </div>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default Modal;
