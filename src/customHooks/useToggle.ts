import { useState, useCallback } from 'react';


export default (initialValue: boolean): [boolean, (nextValue?: boolean) => void] => {
  const [state, setState] = useState<boolean>(initialValue);

  return [state, useCallback(() => setState(!state), [])];
}

