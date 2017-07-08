import { setupState } from './utils/test-helpers';

const localStorageMock = {
  getItem: jest.fn().mockReturnValueOnce()
                    .mockReturnValueOnce({})
                    .mockReturnValueOnce(null)
                    .mockReturnValue(setupState),
  setItem: jest.fn(),
  clear: jest.fn()
};

global.localStorage = localStorageMock;
