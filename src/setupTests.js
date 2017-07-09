import { setupState } from './utils/test-helpers';

const localStorageMock = {
  getItem: jest.fn().mockReturnValueOnce()
                    .mockReturnValueOnce({})
                    .mockReturnValueOnce(null)
                    .mockReturnValue(setupState),
  setItem: jest.fn(),
  removeItem: jest.fn((arg) => {
      if (arg !== 'test') {
        throw new Error()
      }
    }
  ),
  clear: jest.fn()
};

global.localStorage = localStorageMock;
