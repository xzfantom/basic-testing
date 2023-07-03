import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const expectedResults = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: {
              value: 5,
              next: {
                value: null,
                next: null,
              },
            },
          },
        },
      },
    };
    const result = generateLinkedList([1, 2, 3, 4, 5]);

    expect(result).toStrictEqual(expectedResults);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const result = generateLinkedList([1, 2, 3, 4, 5]);

    expect(result).toMatchSnapshot();
  });
});
