/**
 * Interface for userdata and product data to be used intest fixtures
 */
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
  
  
   //Main test data interface combining all data types
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