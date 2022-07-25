import { useEffect, EffectCallback } from "react";

export function useEffectOnce(callback: EffectCallback): void {
  useEffect(callback, []);
}
