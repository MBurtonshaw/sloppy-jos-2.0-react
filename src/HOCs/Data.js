import config from "../config";

export default class Data {
  async api(path, method = "GET", body = null) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
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
        throw new Error(
          `HTTP ${response.status}: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
      throw error; // Re-throw error for further handling
    }
  }

  async createCart() {
    try {
      const id = await this.api(`api/carts/create`, "POST");
      console.log("ID was returned at Data.js: " + id);
      return id;
    } catch (error) {
      console.error("Failed to get hero:", error);
      throw error;
    }
  }

  // async createCart() {
  //   return 1;
  // }

  async addSpecialties(cart) {
    if (cart.specialtyPizzas) {
      // Make API call here, separate call for each item
      const requests = cart.specialtyPizzas.map((item) =>
        this.api(
          `api/carts/${cart.id}/addSpecialty/${item.id}/${item.quantity}`,
          "POST"
        )
      );

      try {
        await Promise.all(requests);
        console.log("All specialty pizzas added successfully");
      } catch (error) {
        console.error("Error adding specialty pizzas:", error);
      }
    }
  }

  async addCustoms(cart) {
    if (cart.customPizzas) {
      const promises = cart.customPizzas.map(async (item) => {
        const pizzaData = {
          sauce_name: item.sauce_name,
          crust_name: item.crust_name,
          size_name: item.size_name,
          toppingIds: item.toppingIds,
        };
        try {
          console.log(pizzaData);
          const response = await this.api(
            `api/carts/${cart.id}/addCustom/${item.quantity}`,
            "POST",
            pizzaData
          );
          return response; // Capture the response which will contain the real ID
        } catch (error) {
          console.error(
            `Failed to add custom pizza to cart ID ${cart.id}:`,
            error.message,
            error.response ? await error.response.json() : null
          );
        }
      });

      // Wait for all API calls to complete
      await Promise.all(promises);
    }
  }

  async addSides(cart) {
    if (cart.sides) {
      // Make API call here, separate call for each item
      const requests = cart.sides.map((item) =>
        this.api(
          `api/carts/${cart.id}/addSide/${item.side_id}/${item.quantity}`,
          "POST"
        )
      );

      try {
        await Promise.all(requests);
        console.log("All sides added successfully");
      } catch (error) {
        console.error("Error adding sides:", error);
      }
    }
  }

  async setPrice(cart) {
    if (cart.total) {
      this.api(`api/carts/${cart.id}/addTotal/${cart.total}`, "POST");
    }
  }

  async submitCustomer(customer) {
    if (!customer) {
      console.error("No customer data provided");
      throw new Error("Customer data is required");
    }

    try {
      const response = await this.api(`api/customers/add`, "POST", customer);

      // Check if the response has the expected structure
      if (!response || typeof response.customer_id !== "number") {
        throw new Error("Customer creation failed: no valid response");
      }
      return response; // Return the entire response object
    } catch (error) {
      console.error("Failed to submit customer data:", error);
      throw error; // Re-throw the error for further handling
    }
  }

  async linkCustomer(customer, cart) {
    if (!cart.id) {
      throw new Error("Cart ID is undefined");
    }
    await this.api(
      `api/customers/${cart.id}/connect`,
      "POST",
      customer.customer_id
    );
  }

  async getCart(id) {
    const newCart = await this.api(`api/carts/${id}`, "GET");
    return newCart;
  }
}
