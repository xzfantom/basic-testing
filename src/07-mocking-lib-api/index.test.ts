import axios from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const expectedData = 'test';
    mockedAxios.create.mockReturnValueOnce(mockedAxios);
    mockedAxios.get.mockResolvedValueOnce({ data: expectedData });

    await throttledGetDataFromApi('');

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const providedUrl = '/test';
    const expectedData = 'test';
    mockedAxios.create.mockReturnValueOnce(mockedAxios);
    mockedAxios.get.mockResolvedValue({ data: expectedData });

    throttledGetDataFromApi(providedUrl);

    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(mockedAxios.get).toHaveBeenCalledWith(providedUrl);
  });

  test('should return response data', async () => {
    const expectedData = 'test';
    mockedAxios.create.mockReturnValueOnce(mockedAxios);
    mockedAxios.get.mockResolvedValue({ data: expectedData });

    const result = await throttledGetDataFromApi('/test');

    expect(result).toBe(expectedData);
  });
});
