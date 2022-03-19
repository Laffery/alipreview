import { useState, useEffect } from "react";
import { Observable } from "rxjs";

/**
 * make a value observable
 * @param input$
 * @param initState
 * @returns value
 */
function useObservable<T>(input$: Observable<T>, initState?: T) {
  const [value, setValue] = useState(initState);
  useEffect(() => {
    const subscription = input$.subscribe({
      next: (value) => setValue(value),
    });

    return () => subscription.unsubscribe();
  }, [input$]);

  return value;
}

export default useObservable;
