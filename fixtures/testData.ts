import { test as base } from '@playwright/test';


export interface UserData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  postalCode: string;
}

export interface ProductData {
  name: string;
  price: number;
  description: string;
}

export interface TestData {
  users: {
    standard: UserData;
    locked: UserData;
    problem: UserData;
    performance: UserData;
    invalid: UserData;
  };
  products: {
    backpack: ProductData;
    bikeLight: ProductData;
    boltTshirt: ProductData;
    fleeceJacket: ProductData;
    onesie: ProductData;
    redTshirt: ProductData;
  };
}


export const test = base.extend<{ testData: TestData }>({
  testData: async ({}, use) => {
    // Defining test data
    const testData: TestData = {
      users: {
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
      },
      products: {
        backpack: {
          name: 'Sauce Labs Backpack',
          price: 29.99,
          description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.'
        },
        bikeLight: {
          name: 'Sauce Labs Bike Light',
          price: 9.99,
          description: 'A red light isn\'t the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.'
        },
        boltTshirt: {
          name: 'Sauce Labs Bolt T-Shirt',
          price: 15.99,
          description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.'
        },
        fleeceJacket: {
          name: 'Sauce Labs Fleece Jacket',
          price: 49.99,
          description: 'It\'s not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.'
        },
        onesie: {
          name: 'Sauce Labs Onesie',
          price: 7.99,
          description: 'Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won\'t unravel.'
        },
        redTshirt: {
          name: 'Test.allTheThings() T-Shirt (Red)',
          price: 15.99,
          description: 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.'
        }
      }
    };

    // Use the fixture
    await use(testData);
  }
});

export { expect } from '@playwright/test';