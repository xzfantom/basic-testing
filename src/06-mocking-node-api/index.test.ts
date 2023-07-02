jest.mock('path');
jest.mock('fs/promises');
jest.mock('fs');

import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { join } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockSetTimeout = jest.spyOn(global, 'setTimeout');
    const mockCallback = jest.fn();
    doStuffByTimeout(mockCallback, 1000);

    expect(mockSetTimeout).toHaveBeenCalledWith(mockCallback, 1000);
  });

  test('should call callback only after timeout', () => {
    const mockCallback = jest.fn();
    doStuffByTimeout(mockCallback, 1000);

    expect(mockCallback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(mockCallback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mockSetInterval = jest.spyOn(global, 'setInterval');
    const mockCallback = jest.fn();
    doStuffByInterval(mockCallback, 1000);

    expect(mockSetInterval).toHaveBeenCalledWith(mockCallback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockCallback = jest.fn();
    doStuffByInterval(mockCallback, 1000);

    expect(mockCallback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);

    expect(mockCallback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);

    expect(mockCallback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    await readFileAsynchronously('path/to/file');

    expect(join).toHaveBeenCalledWith(__dirname, 'path/to/file');
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously('path/to/file');

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue('file content');

    const result = await readFileAsynchronously('path/to/file');

    expect(result).toBe('file content');
  });
});
