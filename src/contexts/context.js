import React, { createContext, Component } from "react";
import Data from '../HOCs/Data';

export const Context = createContext({});

export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();
    this.state = {
      customer: {},
      cart: [],
      error: null, // Initialize error as null
    };
  }

  // Method to fetch customer data
  getCustomer = async () => {
    try {
      const customer = await this.data.getCustomer();
      this.setState({ customer }); // Update state with the fetched customer data
      return customer;
    } catch (error) {
      this.setState({ error });
      console.error("Failed to fetch customer:", error); // Log the error for debugging
    }
  };

  addCustom = (pizza) => {
    this.setState((prevState) => ({
      cart: [...prevState.cart, pizza]
    }));
  }

  render() {
    const value = {
      ...this.state, // Spread the state directly
      actions: {
        getCustomer: this.getCustomer,
        addCustom: this.addCustom
      },
    };

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    );
  }
}