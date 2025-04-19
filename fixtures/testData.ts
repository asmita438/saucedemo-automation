import { test as base } from '@playwright/test';
import { users } from './users';
import { products } from './products';
import { TestData } from './types';


export { TestData } from './types';


export const test = base.extend<{ testData: TestData }>({
  testData: async ({}, use) => {
    //Combining imported data
    const testData: TestData = {
      users,
      products
    };

    
    const testDataWithUtils = {
      ...testData,
      getUserByType: (type: keyof typeof users) => users[type],
      getProductsByMaxPrice: (maxPrice: number) => 
        Object.values(products).filter(product => product.price <= maxPrice)
    };

    
    await use(testDataWithUtils as TestData);
  }
});

export { expect } from '@playwright/test';