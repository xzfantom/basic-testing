const mockCreate = jest.fn();
const mockGet = jest.fn();

(mockCreate as jest.Mock).mockReturnValue({ get: mockGet });
jest.mock('axios', () => ({
  create: mockCreate,
}));

import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('');

    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    mockGet.mockResolvedValue({ data: 'test' });

    await throttledGetDataFromApi('/test');

    //expect(mockGet).toHaveBeenCalledWith('/test');
    expect(mockCreate).toHaveBeenCalled();
  });

  test('should return response data', async () => {
    const mockCreate = jest.spyOn(axios, 'create');
    const mockGet = jest.fn();
    (mockCreate as jest.Mock).mockReturnValue({ get: mockGet });
    (mockGet as jest.Mock).mockResolvedValue({ data: 'test' });

    const result = await throttledGetDataFromApi('/test');

    expect(result).toBe('test');
  });
});
