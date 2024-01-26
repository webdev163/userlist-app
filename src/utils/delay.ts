export const delay = (timeout: number, cb: () => void) => {
  setTimeout(cb, timeout);
};
