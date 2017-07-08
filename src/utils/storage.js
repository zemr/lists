export const saveStateData = (key, state) => {
  try {
    const storageData = JSON.stringify(state);
    return localStorage.setItem(key, storageData);
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
