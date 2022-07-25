import { Subject, PartialObserver } from "rxjs";
import { useMemo, useCallback } from "react";

export type EventHandler<T> = (event: T) => void;

export function useEventHandler<T>(
  observer: PartialObserver<T>
): EventHandler<T> {
  const subject$ = useMemo(() => new Subject<T>(), []);
  const eventHandler = useCallback<EventHandler<T>>((e: T) => {
    subject$.next(e);
  }, []);
  subject$.subscribe(observer);
  return eventHandler;
}
