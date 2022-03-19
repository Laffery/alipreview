import { Subject } from "rxjs";
import { useMemo, useCallback } from "react";
import type { EventHandler } from "./use-event-handler";

function useEventObservable<T>(): [Subject<T>, EventHandler<T>] {
  const subject$ = useMemo(() => new Subject<T>(), []);
  const eventHandler = useCallback<EventHandler<T>>((e: T) => {
    subject$.next(e);
  }, []);
  return [subject$, eventHandler];
}

export default useEventObservable;
