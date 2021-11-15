import create from "zustand";

const useModalStore = create<{ setOpen: (open: string[]) => void; open: string[] }>((set) => ({
  open: [],
  setOpen: (open: string[]) => set({ open }),
}));

export function useModal() {
  const { open, setOpen } = useModalStore();

  function isOpen(id: string) {
    return open.includes(id);
  }

  function openModal(id: string) {
    if (isOpen(id)) return;

    return setOpen([...open, id]);
  }

  function closeModal(id: string) {
    if (!isOpen(id)) return;

    return setOpen(open.filter((v) => v !== id));
  }

  return { openModal, isOpen, closeModal };
}
