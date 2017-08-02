import { saveStateData, loadState, storageAvailable } from '../storage';
import { storageData } from '../test-helpers';

describe('storage', () => {

  it('saves data into localStorage', () => {
    saveStateData('state', storageData);
    const serializedState = JSON.stringify(storageData);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith('state', serializedState);
  });

  it('loads state from localStorage', () => {
    loadState();
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.getItem).toHaveBeenCalledWith('state');

    // errors
    expect(loadState()).toEqual(undefined);
    // no key
    expect(loadState()).toEqual(undefined);
    // data
    expect(loadState()).toEqual(storageData);
  });

  it('checks storage availability', () => {
    const checkStorageTest = storageAvailable('test');
    const checkStorageBlank = storageAvailable();
    const checkStorageError = storageAvailable('error');
    expect(checkStorageTest).toBeTruthy();
    expect(checkStorageBlank).toBeTruthy();
    expect(checkStorageError).toBeFalsy();
  });

});
