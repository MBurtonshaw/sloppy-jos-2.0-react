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

  async getCustomer() {
    try {
      return await this.api(`api/customer`, 'GET');
    } catch (error) {
      console.error('Failed to get customer:', error);
      throw error;
    }
  }

  async addSpecialties(cart) {
    if (cart.specialtyPizzas) {
      cart.specialtyPizzas.forEach(item => console.log(item));
    }
  }

  async addCustoms(cart) {
    if (cart.customPizzas) {
      cart.customPizzas.forEach(item => console.log(item));
    }
  }

  async addSides(cart) {
    if (cart.sides) {
      cart.sides.forEach(item => console.log(item));
    }
  }

  async setPrice(cart) {
    console.log(cart.total);
  }

  async submitCustomer(customer) {
    console.log(customer);
  }

}