import { Subject, Observer } from "rxjs";
import { useMemo, useCallback } from "react";

export type EventHandler<T> = (event: T) => void;

function useEventHandler<T>(observer: Partial<Observer<T>>): EventHandler<T> {
  const subject$ = useMemo(() => new Subject<T>(), []);
  const eventHandler = useCallback<EventHandler<T>>((e: T) => {
    subject$.next(e);
  }, []);
  subject$.subscribe(observer);
  return eventHandler;
}

export default useEventHandler;
