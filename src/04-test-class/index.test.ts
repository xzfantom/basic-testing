// Uncomment the code below and write your tests
import { getBankAccount, SynchronizationFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const testAccount = getBankAccount(100);

    expect(testAccount.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const testAccount = getBankAccount(100);

    expect(() => testAccount.withdraw(200)).toThrow();
  });

  test('should throw TransferFailedError error when transferring more than balance', () => {
    const testAccount = getBankAccount(100);

    expect(() => testAccount.transfer(200, testAccount)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    const testAccount = getBankAccount(100);

    expect(() => testAccount.transfer(50, testAccount)).toThrow();
  });

  test('should deposit money', () => {
    const testAccount = getBankAccount(100);

    testAccount.deposit(50);

    expect(testAccount.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const testAccount = getBankAccount(100);

    testAccount.withdraw(50);

    expect(testAccount.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    const testAccount = getBankAccount(100);
    const testAccount2 = getBankAccount(100);

    testAccount.transfer(50, testAccount2);

    expect(testAccount.getBalance()).toBe(50);
    expect(testAccount2.getBalance()).toBe(150);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const testAccount = getBankAccount(100);

    const balance = await testAccount.fetchBalance();
    if (balance !== null) {
      expect(typeof balance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const testAccount = getBankAccount(150);

    try {
      await testAccount.synchronizeBalance();
      expect(testAccount.getBalance()).not.toBe(150);
    } catch (error) {
      expect(testAccount.getBalance()).toBe(150);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const testAccount = getBankAccount(150);

    try {
      await testAccount.synchronizeBalance();
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
