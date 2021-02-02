const debounce = (fn, delay) => {
  if (typeof fn !== 'function') throw new Error(`Received ${typeof fn} | Expecting FUNCTION `);
  if (typeof delay !== 'number') throw new Error(`Received ${typeof delay} | Expecting INTEGER `);

  let fnCall;
  return () => {
    clearTimeout(fnCall);
    fnCall = setTimeout(fn, delay);
  };
};

export default debounce;
