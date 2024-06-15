/* eslint-disable react/prop-types */
import * as Dialog from "@radix-ui/react-dialog";
import {ReactNode} from "react";

export const Modal = ({children}: {children: ReactNode}) => {
  return <Dialog.Root>{children}</Dialog.Root>;
};

const ModalContent = ({children, title}: {children: ReactNode; title: string}) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=closed]:animate-[dialog-overlay-hide_200ms] data-[state=open]:animate-[dialog-overlay-show_200ms]" />
      <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md border border-stone-100/20 bg-stone-900 p-8 text-gray-900 shadow data-[state=closed]:animate-[dialog-content-hide_200ms] data-[state=open]:animate-[dialog-content-show_200ms]">
        <div className="flex items-center justify-between">
          <Dialog.Title className="text-xl text-stone-100">{title}</Dialog.Title>
          <Dialog.Close className="text-gray-400 hover:text-gray-500">&times;</Dialog.Close>
        </div>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
};

Modal.Button = Dialog.Trigger;
Modal.Content = ModalContent;
