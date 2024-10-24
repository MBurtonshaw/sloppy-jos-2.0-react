import { useState, useContext, useEffect } from "react";
import { Context } from "../contexts/context.js";
import { useNavigate } from "react-router-dom";

export default function CustomerInfo() {
  const { actions, cart } = useContext(Context);
  const [first_name, setFirst_name] = useState(null);
  const [last_name, setLast_name] = useState(null);
  const [email_address, setEmail_address] = useState(null);
  const [phone_number, setPhone_number] = useState(null);
  const [credit_card, setCredit_card] = useState(null);
  const [credit_expiry, setCredit_expiry] = useState(null);
  const [credit_cvv, setCredit_cvv] = useState(null);
  const [delivery, setDelivery] = useState("");
  const [desktopMode, setDesktopMode] = useState(false);
  const [tabletMode, setTabletMode] = useState(false);
  const [mobileMode, setMobileMode] = useState(false);
  const customer = {
    first_name,
    last_name,
    email_address,
    phone_number,
    credit_card,
    credit_cvv,
  };

  const phoneRegEx = new RegExp(
    "^(\\+0?1\\s)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$"
  );
  const creditCardRegEx = new RegExp("^(?:\\d{4}[-\\s]?){3}\\d{4}$");
  const cvvRegEx = new RegExp("^\\d{3}$");

  const navigate = useNavigate();

  const updateMode = () => {
    if (window.innerWidth <= 779) {
      setDesktopMode(false);
      setTabletMode(false);
      setMobileMode(true);
    } else if (window.innerWidth <= 1104) {
      setDesktopMode(false);
      setTabletMode(true);
      setMobileMode(false);
    } else {
      setDesktopMode(true);
      setTabletMode(false);
      setMobileMode(false);
    }
  };

  useEffect(() => {
    updateMode(); // Set initial mode on mount
    window.addEventListener("resize", updateMode); // Add event listener for resize

    return () => {
      window.removeEventListener("resize", updateMode); // Cleanup on unmount
    };
  }, []);

  function handleFirstNameChange() {
    let name = document.getElementById("customerFirstName");
    setFirst_name(name.value);
  }

  function handleLastNameChange() {
    let name = document.getElementById("customerLastName");
    setLast_name(name.value);
  }

  function handleEmailChange() {
    let email = document.getElementById("customerEmail");
    setEmail_address(email.value);
  }

  function handlePhoneChange() {
    let phone = document.getElementById("customerPhone");
    setPhone_number(phone.value);
  }

  function handleCreditCardChange() {
    let credit = document.getElementById("creditCardNumber");
    setCredit_card(credit.value);
  }

  function handleCreditExpiryChange() {
    let expiry = document.getElementById("creditCardExpiry");
    setCredit_expiry(expiry.value);
  }

  function handleCreditCVVChange() {
    let CVV = document.getElementById("creditCardCVV");
    setCredit_cvv(CVV.value);
  }

  async function handleSubmit() {
    if (!customer.first_name) {
      window.alert("Please enter a first name");
    } else if (!customer.last_name) {
      window.alert("Please enter a last name");
    } else if (!customer.email_address) {
      window.alert("Please enter a valid email address");
    } else if (
      !customer.phone_number ||
      !phoneRegEx.test(customer.phone_number)
    ) {
      window.alert("Please enter a valid US phone number - 10 digits");
    } else if (!customer.credit_card || !creditCardRegEx.test(credit_card)) {
      window.alert("Please enter a valid 16-digit credit card number");
    } else if (!credit_expiry) {
      window.alert("Please enter credit card expiration date");
    } else if (!customer.credit_cvv || !cvvRegEx.test(credit_cvv)) {
      window.alert("Please enter a valid 3-digit credit card CVV");
    } else if (delivery === "") {
      window.alert("Please enter delivery or takeout");
    } else {
      const customer = {
        first_name,
        last_name,
        email_address,
        phone_number,
        credit_card,
        credit_cvv,
      };
      //populate customer object in context state
      await actions.fillCustomer(customer);
      //passes customer object and cart to backend
      try {
        const response = await actions.submitCustomer(customer);
        // Navigate or show success message based on the response
        navigate("/receipt");
      } catch (error) {
        console.error("Error submitting customer data:", error);
        // Show an error message to the user if needed
      }
    }
  }

  const renderAddressField = () => {
    if (delivery) {
      if (desktopMode) {
        return (
          <>
            <tr>
              <td>
                <label htmlFor="streetAddress">Street Address:</label>
              </td>
              <td>
                <input
                  className="w-100 m-auto form-control"
                  id="streetAddress"
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="unitNumber">Unit # (optional):</label>
              </td>
              <td>
                <input
                  className="w-100 m-auto form-control"
                  id="unitNumber"
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="addressCity">City:</label>
              </td>
              <td>
                <input
                  className="w-100 m-auto form-control"
                  id="addressCity"
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="addressState">State Abbreviation:</label>
              </td>
              <td>
                <input
                  className="w-100 m-auto form-control"
                  id="addressState"
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="addressZip">ZIP Code:</label>
              </td>
              <td>
                <input
                  className="w-100 m-auto form-control"
                  id="addressZip"
                ></input>
              </td>
            </tr>
          </>
        );
      } else {
        return (
          <div className="w-75 m-auto pt-4">
            <label className="px-2 w-75 m-auto" htmlFor="streetAddress">
              Street Address:
            </label>
            <input
              className="w-75 m-auto form-control"
              name="streetAddress"
              id="streetAddress"
              type="text"
            ></input>
            <label className="px-2 w-75 m-auto pt-3" htmlFor="unitNumber">
              Unit # (optional):
            </label>
            <input
              className="w-75 m-auto form-control"
              name="unitNumber"
              id="unitNumber"
              type="text"
            ></input>
            <label className="px-2 w-75 m-auto pt-3" htmlFor="adddressCity">
              City:
            </label>
            <input
              className="w-75 m-auto form-control"
              name="addressCity"
              id="addressCity"
              type="text"
            ></input>
            <label className="px-2 w-75 m-auto pt-3" htmlFor="addressState">
              State Abbreviation:
            </label>
            <input
              className="w-75 m-auto form-control"
              name="addressState"
              id="addressState"
              type="text"
            ></input>
            <label className="px-2 w-75 m-auto pt-3" htmlFor="addressZip">
              ZIP Code:
            </label>
            <input
              className="w-75 m-auto form-control"
              name="addressZip"
              id="addressZip"
              type="text"
            ></input>
          </div>
        );
      }
    }
    return null;
  };

  if (desktopMode) {
    return (
      <>
        <div className="w-50 m-auto">
          <h1 className="customer-information text-start mt-5 mb-3 text-center">
            Customer Information
          </h1>
          <div className="mb-4">
            <form>
              <div className="text-center mb-4">
                <span>This app is for demonstration purposes only. </span>
                <p>
                  Even so, please do not enter an actual credit card number.
                </p>
              </div>
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="customerFirstName">First Name:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        id="customerFirstName"
                        placeholder=""
                        onChange={() => handleFirstNameChange()}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="customerLastName">Last Name:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        id="customerLastName"
                        placeholder=""
                        onChange={() => handleLastNameChange()}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="customerEmail">Email:</label>
                    </td>
                    <td>
                      <input
                        type="email"
                        className="form-control"
                        id="customerEmail"
                        placeholder=""
                        onChange={() => handleEmailChange()}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="customerPhone">Phone Number:</label>
                    </td>
                    <td>
                      <input
                        type="tel"
                        className="form-control"
                        id="customerPhone"
                        placeholder="000-000-0000"
                        onChange={() => handlePhoneChange()}
                      />
                    </td>
                  </tr>

                  {/* <tr v-if="orderType === 'delivery'">
                            <td><label for="customerAddress">Address:</label></td>
                            <td><textarea className="form-control" id="customerAddress" rows="3" placeholder=""></textarea></td>
                        </tr> */}
                  <tr>
                    <td>
                      <label htmlFor="creditCardNumber">
                        Credit Card Number:
                      </label>
                    </td>
                    <td>
                      <input
                        type="tel"
                        className="form-control"
                        id="creditCardNumber"
                        placeholder="xxxx-xxxx-xxxx-xxxx"
                        maxLength="20"
                        onChange={() => handleCreditCardChange()}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="creditCardExpiry">Expiry Date:</label>
                    </td>
                    <td>
                      <input
                        type="date"
                        className="form-control"
                        id="creditCardExpiry"
                        placeholder=""
                        onChange={() => handleCreditExpiryChange()}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="creditCardCVV">CVV:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        id="creditCardCVV"
                        placeholder="xxx"
                        maxLength="3"
                        onChange={() => handleCreditCVVChange()}
                      />
                    </td>
                  </tr>
                  <tr className="text-center">
                    <td className="py-3">
                      <label className="px-2" htmlFor="delivery">
                        Delivery
                      </label>
                      <input
                        id="delivery"
                        name="orderType"
                        type="radio"
                        value="delivery"
                        onClick={() => setDelivery(true)}
                      />
                    </td>
                    <td className="py-3">
                      <label className="px-2" htmlFor="takeout">
                        Takeout
                      </label>
                      <input
                        id="takeout"
                        name="orderType"
                        type="radio"
                        value="takeout"
                        onClick={() => setDelivery(false)}
                      />
                    </td>
                  </tr>
                  {renderAddressField()}
                </tbody>
              </table>
            </form>
          </div>
        </div>
        <div className="submit text-center">
          <button
            className="px-5 py-2 mt-2 mb-4"
            type="button"
            onClick={handleSubmit}
          >
            Place Order
          </button>
        </div>
      </>
    );
  }

  if (tabletMode || mobileMode) {
    return (
      <>
        <div className="w-100 m-auto text-center">
          <h1 className="customer-information mt-5 mb-3">
            Customer Information
          </h1>
          <span>This app is for demonstration purposes only. </span>
          <br></br>
          <p>Even so, please do not enter an actual credit card number.</p>
          <div className="mb-4">
            <form className="w-75 m-auto">
              <div className="py-4">
                <label htmlFor="customerFirstName">First Name:</label>
                <input
                  type="text"
                  className="form-control text-center"
                  id="customerFirstName"
                  placeholder=""
                  onChange={() => handleFirstNameChange()}
                />
              </div>

              <div className="py-4">
                <label htmlFor="customerLastName">Last Name:</label>
                <input
                  type="text"
                  className="form-control text-center"
                  id="customerLastName"
                  placeholder=""
                  onChange={() => handleLastNameChange()}
                />
              </div>

              <div className="py-3">
                <label htmlFor="customerEmail" className="py-1">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control text-center"
                  id="customerEmail"
                  placeholder=""
                  onChange={() => handleEmailChange()}
                />
              </div>

              <div className="py-3">
                <label htmlFor="customerPhone" className="py-1">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  className="form-control text-center"
                  id="customerPhone"
                  placeholder="000-000-0000"
                  onChange={() => handlePhoneChange()}
                />
              </div>

              <div className="py-3">
                <label htmlFor="creditCardNumber" className="py-1">
                  Credit Card Number:
                </label>
                <input
                  type="tel"
                  className="form-control text-center"
                  id="creditCardNumber"
                  placeholder="xxxx-xxxx-xxxx-xxxx"
                  maxLength="20"
                  onChange={() => handleCreditCardChange()}
                />
              </div>

              <div className="py-3">
                <label htmlFor="creditCardExpiry" className="py-1">
                  Expiry Date:
                </label>
                <input
                  type="date"
                  className="form-control text-center"
                  id="creditCardExpiry"
                  placeholder=""
                  onChange={() => handleCreditExpiryChange()}
                />
              </div>

              <div className="py-3">
                <label htmlFor="creditCardCVV" className="py-1">
                  CVV:
                </label>
                <input
                  type="text"
                  className="form-control text-center"
                  id="creditCardCVV"
                  placeholder="xxx"
                  maxLength="3"
                  onChange={() => handleCreditCVVChange()}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="pt-2 pb-5 text-center w-100 m-auto">
          <div className="w-50 m-auto d-flex">
            <div className="w-100 m-auto">
              <label className="px-2" htmlFor="delivery">
                Delivery
              </label>
              <input
                id="delivery"
                name="orderType"
                type="radio"
                value="delivery"
                onClick={() => setDelivery(true)}
              />
            </div>
            <div className="w-100 m-auto">
              <label className="px-2" htmlFor="takeout">
                Takeout
              </label>
              <input
                id="takeout"
                name="orderType"
                type="radio"
                value="takeout"
                onClick={() => setDelivery(false)}
              />
            </div>
          </div>
          {renderAddressField()}
        </div>
        <div className="submit text-center">
          <button className="px-5 py-2 mb-4" onClick={handleSubmit}>
            Place Order
          </button>
        </div>
      </>
    );
  }
}
