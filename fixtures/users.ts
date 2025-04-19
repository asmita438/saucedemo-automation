import { UserData } from './types';

export const users = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345'
  },
  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce',
    firstName: 'Jane',
    lastName: 'Smith',
    postalCode: '67890'
  },
  problem: {
    username: 'problem_user',
    password: 'secret_sauce',
    firstName: 'Problem',
    lastName: 'User',
    postalCode: '54321'
  },
  performance: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
    firstName: 'Slow',
    lastName: 'Performance',
    postalCode: '98765'
  },
  invalid: {
    username: 'invalid_user',
    password: 'wrong_password',
    firstName: 'Invalid',
    lastName: 'User',
    postalCode: '00000'
  }
};