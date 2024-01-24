export const localStorageHelper = {
  add(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove(key: string) {
    if (localStorage.getItem(key)) localStorage.removeItem(key);
  },

  load(key: string) {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key) as string);
    }
  },
};
