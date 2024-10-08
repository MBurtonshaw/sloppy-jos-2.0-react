import { useState, useContext, useEffect } from "react";
import { Context } from "../contexts/context.js";
import { useNavigate } from "react-router-dom";

export default function CustomerInfo() {
  const { actions } = useContext(Context);
  const [customerFirstName, setCustomerFirstName] = useState(null);
  const [customerLastName, setCustomerLastName] = useState(null);
  const [customerEmail, setCustomerEmail] = useState(null);
  const [customerPhone, setCustomerPhone] = useState(null);
  const [customerCreditCard, setCustomerCreditCard] = useState(null);
  const [customerCreditExpiry, setCustomerCreditExpiry] = useState(null);
  const [customerCreditCVV, setCustomerCreditCVV] = useState(null);
  const [delivery, setDelivery] = useState("");
  const [desktopMode, setDesktopMode] = useState(false);
  const [tabletMode, setTabletMode] = useState(false);
  const [mobileMode, setMobileMode] = useState(false);
  const customer = {
    customerFirstName,
    customerLastName,
    customerEmail,
    customerPhone,
    customerCreditCard,
    customerCreditExpiry,
    customerCreditCVV
  }

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
    setCustomerFirstName(name.value);
  }

  function handleLastNameChange() {
    let name = document.getElementById("customerLastName");
    setCustomerLastName(name.value);
  }

  function handleEmailChange() {
    let email = document.getElementById("customerEmail");
    setCustomerEmail(email.value);
  }

  function handlePhoneChange() {
    let phone = document.getElementById("customerPhone");
    setCustomerPhone(phone.value);
  }

  function handleCreditCardChange() {
    let credit = document.getElementById("creditCardNumber");
    setCustomerCreditCard(credit.value);
  }

  function handleCreditExpiryChange() {
    let expiry = document.getElementById("creditCardExpiry");
    setCustomerCreditExpiry(expiry.value);
  }

  function handleCreditCVVChange() {
    let CVV = document.getElementById("creditCardCVV");
    setCustomerCreditCVV(CVV.value);
  }

  async function handleSubmit() {
    if (!customer.customerFirstName) {
      window.alert('Please enter a first name');
    } else if (!customer.customerLastName) {
      window.alert('Please enter a last name');
    } else if (!customer.customerEmail) {
      window.alert('Please enter an email address');
    } else if (!customer.customerPhone) {
      window.alert('Please enter a phone number');
    } else if (!customer.customerCreditCard) {
      window.alert('Please enter a credit card number');
    } else if (!customer.customerCreditExpiry) {
      window.alert('Please enter credit card expiration date');
    } else if (!customer.customerCreditCVV) {
      window.alert('Please enter credit card CVV');
    } else if (delivery === "") {
      window.alert('Please enter delivery or takeout');
    } else {
      await actions.fillCustomer(customer);
      navigate('/receipt');
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
              <input className='w-100 m-auto form-control' id="streetAddress"></input>
            </td>
          </tr>
          <tr>
          <td>
            <label htmlFor="unitNumber">Unit # (optional):</label>
          </td>
          <td>
            <input className='w-100 m-auto form-control' id="unitNumber"></input>
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="addressCity">City:</label>
          </td>
          <td>
            <input className='w-100 m-auto form-control' id="addressCity"></input>
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="addressState">State Abbreviation:</label>
          </td>
          <td>
            <input className='w-100 m-auto form-control' id="addressState"></input>
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="addressZip">ZIP Code:</label>
          </td>
          <td>
            <input className='w-100 m-auto form-control' id="addressZip"></input>
          </td>
        </tr>
        </>
        );
      } else {
        return (
          <div className='w-75 m-auto pt-4'>
            <label className='px-2 w-75 m-auto' htmlFor="streetAddress">Street Address:</label>
            <input className='w-75 m-auto form-control' name='streetAddress' id='streetAddress' type='text'></input>
            <label className='px-2 w-75 m-auto pt-3' htmlFor="unitNumber">Unit # (optional):</label>
            <input className='w-75 m-auto form-control'name='unitNumber' id='unitNumber' type='text'></input>
            <label className='px-2 w-75 m-auto pt-3' htmlFor="adddressCity">City:</label>
            <input className='w-75 m-auto form-control'name='adddressCity' id='adddressCity' type='text'></input>
            <label className='px-2 w-75 m-auto pt-3' htmlFor="addressState">State Abbreviation:</label>
            <input className='w-75 m-auto form-control'name='addressState' id='addressState' type='text'></input>
            <label className='px-2 w-75 m-auto pt-3' htmlFor="addressZip">ZIP Code:</label>
            <input className='w-75 m-auto form-control'name='addressZip' id='addressZip' type='text'></input>
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
          <h1 className="customer-information text-start my-5">
            Customer Information
          </h1>
          <div className="mb-4">
            <form>
              <h2 className="text-end">Total : $</h2>
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
                        placeholder=""
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
                        type="text"
                        className="form-control"
                        id="creditCardNumber"
                        placeholder=""
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
                        type="text"
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
                        placeholder=""
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
          <button className='px-5 py-2 mt-2 mb-4' type="button" onClick={handleSubmit}>
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
          <h1 className="customer-information my-5">Customer Information</h1>
          <h2 className="text-end mx-5">Total : $</h2>
          <div className="mb-4">
            <form className="w-75 m-auto">
              <div className="py-4">
                <label htmlFor="customerFirstName">First Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="customerFirstName"
                  placeholder=""
                  onChange={() => handleFirstNameChange()}
                />
              </div>

              <div className="py-4">
                <label htmlFor="customerLastName">Last Name:</label>
                <input
                  type="text"
                  className="form-control"
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
                  className="form-control"
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
                  className="form-control"
                  id="customerPhone"
                  placeholder=""
                  onChange={() => handlePhoneChange()}
                />
              </div>

              <div className="py-3">
                <label htmlFor="creditCardNumber" className="py-1">
                  Credit Card Number:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="creditCardNumber"
                  placeholder=""
                  onChange={() => handleCreditCardChange()}
                />
              </div>

              <div className="py-3">
                <label htmlFor="creditCardExpiry" className="py-1">
                  Expiry Date:
                </label>
                <input
                  type="text"
                  className="form-control"
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
                  className="form-control"
                  id="creditCardCVV"
                  placeholder=""
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
          <button className='px-5 py-2 mb-4' onClick={handleSubmit}>
            Place Order
          </button>
        </div>
      </>
    );
  }
}
