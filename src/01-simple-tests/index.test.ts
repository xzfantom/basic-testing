// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
    expect(simpleCalculator({ a: -1, b: 2, action: Action.Add })).toBe(1);
    expect(simpleCalculator({ a: 1, b: -2, action: Action.Add })).toBe(-1);
    // expect(simpleCalculator({ a: 0.1, b: 0.2, action: Action.Add })).toBe(0.3); // This test will fail, hehe
  });

  test('should Subtract two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Subtract })).toBe(-1);
    expect(simpleCalculator({ a: -1, b: 2, action: Action.Subtract })).toBe(-3);
    expect(simpleCalculator({ a: 5, b: -2, action: Action.Subtract })).toBe(7);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Multiply })).toBe(2);
    expect(simpleCalculator({ a: -1, b: 2, action: Action.Multiply })).toBe(-2);
    expect(simpleCalculator({ a: 5, b: -2, action: Action.Multiply })).toBe(
      -10,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: -6, b: 3, action: Action.Divide })).toBe(-2);
    expect(simpleCalculator({ a: 10, b: 2, action: Action.Divide })).toBe(5);
    expect(simpleCalculator({ a: 6, b: -2, action: Action.Divide })).toBe(-3);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Exponentiate })).toBe(
      1,
    );
    expect(simpleCalculator({ a: 10, b: 2, action: Action.Exponentiate })).toBe(
      100,
    );
    expect(simpleCalculator({ a: -5, b: 3, action: Action.Exponentiate })).toBe(
      -125,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 5, b: -2, action: 'add' })).toBeNull();
    expect(simpleCalculator({ a: '2', b: -2, action: undefined })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: undefined, b: -2, action: Action.Add }),
    ).toBeNull();
    expect(
      simpleCalculator({ a: '2', b: -2, action: Action.Subtract }),
    ).toBeNull();
  });
});
