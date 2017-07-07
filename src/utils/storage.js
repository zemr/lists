export const saveState = (state) => {
  try {
    const storageState = JSON.stringify(state);
    return localStorage.setItem('state', storageState);
  } catch (err) { }
};

export const saveDate = (date) => {
  try {
    const modDate = JSON.stringify(date);
    return localStorage.setItem('date', modDate);
  } catch (err) { }
};

export const loadState = () => {
  try {
    const storageState = localStorage.getItem('state');
    if (storageState === null) {
      return undefined;
    }
    return JSON.parse(storageState);
  } catch (err) {
    return undefined;
  }
};
