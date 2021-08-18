import { enableStaticRendering } from "mobx-react-lite";
import { AppStore } from "./AppStore";

enableStaticRendering(typeof window === "undefined");

let store: AppStore;

export function makeStore(initData: Record<string, unknown> | null = null) {
  const _store = store ?? new AppStore();

  if (initData) {
    _store.hydrate(initData);
  }

  if (typeof window === "undefined") return _store;
  if (!store) store = _store;

  return _store;
}
