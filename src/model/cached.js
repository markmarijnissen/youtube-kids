import memoize from "lodash.memoize";
import { get, set, clear } from "idb-keyval";
window.clear = clear;

const cached = (prefix = "cache:", fn) => {
  return memoize(async function(key) {
    const value = await get(prefix + key);
    if (value) return value;
    const result = await fn.apply(fn, arguments);
    set(prefix + key, result);
    return result;
  });
};

export default cached;
