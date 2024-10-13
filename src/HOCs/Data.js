import config from '../config';

export default class Data {
  async api(path, method = 'GET', body = null) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);

      if (response.ok) {
        if (response.status === 204) {
          return {}; // Handle no content response
        }
        const text = await response.text();
        return text ? JSON.parse(text) : {}; // Handle response body
      } else {
        const errorData = await response.json();
        throw new Error(`HTTP ${response.status}: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Fetch error:', error.message);
      throw error; // Re-throw error for further handling
    }
  }

  async createCart() {
    try {
      const id = await this.api(`api/carts/create`, 'POST');
      console.log('ID was returned at Data.js: ' + id);
      return id;
    } catch (error) {
      console.error('Failed to get hero:', error);
      throw error;
    }
  }

  // async createCart() {
  //   return 1;
  // }

  async addSpecialties(cart) {
    if (cart.specialtyPizzas) {
      //make API call here, separate call for each item, 
      //cart_id goes in the url, item.id is the body being sent (not as an object, plain integer)
      await cart.specialtyPizzas.forEach((item) => {
        this.api(`api/carts/${cart.id}/addSpecialty`, 'POST', item.id)
      });
    }
  }

  async addCustoms(cart) {
    if (cart.customPizzas) {
        const promises = cart.customPizzas.map(async item => {
          console.log(item.toppingIds)
            // Create the pizza data without an ID
            const pizzaData = {
                sauce_name: item.sauce_name,
                crust_name: item.crust_name,
                size_name: item.size_name,
                toppingIds: item.toppingsIds
            };
            
            try {
              console.log('Topping IDs:', pizzaData.toppingIds);
                const response = await this.api(`api/carts/${cart.id}/addCustom`, 'POST', pizzaData);
                return response;  // Capture the response which will contain the real ID
            } catch (error) {
                console.error(`Failed to add custom pizza to cart ID ${cart.id}:`, error);
            }
        });

        // Wait for all API calls to complete
        await Promise.all(promises);
    }
}


  async addSides(cart) {
    if (cart.sides) {
      //make API call here, separate call for each item, 
      //cart_id goes in the url, item.id is the body being sent (not as an object, plain integer)
      cart.sides.forEach((item) => {
        this.api(`api/carts/${cart.id}/addSide`, 'POST', item.id)
    });
    }
  }

  async setPrice(cart) {
    if (cart.total) {
      console.log({cart});
        this.api(`api/carts/${cart.id}/addTotal/${cart.total}`, 'POST')
    }
  }

  async submitCustomer(customer, cart) {
    console.log({customer});
    console.log({cart});
  }


}