import create from "zustand";

interface ModalStore {
  open: string[];
  setOpen(open: string[]): void;

  payload: Record<string, any>;
  setPayload(key: string, data: any): void;
}

const useModalStore = create<ModalStore>((set, get) => ({
  open: [],
  setOpen: (open: string[]) => set({ open }),

  payload: {},
  setPayload: (k, data) => set({ payload: { ...get().payload, [k]: data } }),
}));

export function useModal() {
  const { open, payload, setOpen, setPayload } = useModalStore();
  const isModalsOpen = open.length > 0;

  function isOpen(id: string) {
    return open.includes(id);
  }

  function openModal(id: string, payload?: any) {
    if (isOpen(id)) return;

    setPayload(id, payload);
    return setOpen([...open, id]);
  }

  function getPayload<T = any>(id: string): T {
    return payload[id] ?? null;
  }

  function closeModal(id: string) {
    if (!isOpen(id)) return;

    setPayload(id, undefined);
    return setOpen(open.filter((v) => v !== id));
  }

  return { getPayload, openModal, isOpen, closeModal, isModalsOpen };
}
