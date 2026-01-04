import dayjs from "dayjs";
import axios from "axios";
import { useState, useEffect } from "react";
import "./CheckoutPage.css";
import { CheckoutHeader } from "./CheckoutHeader";
import { formatMoney } from "../../utils/money";
import { CartItemDetails } from "./CartItemDetails";
import { DeliveryDate } from "./DeliveryDate.jsx";
export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  useEffect(() => {
    const fetchCheckoutData = async () => {
      let response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime"
      );

      setDeliveryOptions(response.data);

      response = await axios.get("/api/payment-summary");
      setPaymentSummary(response.data);
    };

    fetchCheckoutData();
  }, [cart]);

  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />
      <CheckoutHeader />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {deliveryOptions.length > 0 &&
              cart.map((cartItem) => {
                return (
                  <div key={cartItem.productId} className="cart-item-container">
                    <DeliveryDate
                      cartItem={cartItem}
                      deliveryOptions={deliveryOptions}
                    />
                    <div className="cart-item-details-grid">
                      <CartItemDetails cartItem={cartItem} />
                      <div className="delivery-options">
                        <div className="delivery-options-title">
                          Choose a delivery option:
                        </div>
                        {deliveryOptions.map((deliveryOption) => {
                          let priceString = "FREE Shipping";

                          if (deliveryOption.priceCents > 0) {
                            priceString = `${formatMoney(
                              deliveryOption.priceCents
                            )} - Shipping`;
                          }
                          const updateDeliveryOption = async () => {
                            await axios.put(
                              `/api/cart-items/${cartItem.productId}`,
                              { deliveryOptionId: deliveryOption.id }
                            );
                            await loadCart();
                          };
                          return (
                            <div
                              key={deliveryOption.id}
                              className="delivery-option"
                              onClick={updateDeliveryOption}
                            >
                              <input
                                type="radio"
                                checked={
                                  deliveryOption.id ===
                                  cartItem.deliveryOptionId
                                }
                                onChange={() => {}}
                                className="delivery-option-input"
                                name={`delivery-option-${cartItem.productId}`}
                              />
                              <div>
                                <div className="delivery-option-date">
                                  {dayjs(
                                    deliveryOption.estimatedDeliveryTimeMs
                                  ).format("dddd, MMMM D")}
                                </div>
                                <div className="delivery-option-price">
                                  {priceString}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {paymentSummary && (
            <>
              <div className="payment-summary">
                <div className="payment-summary-title">Payment Summary</div>

                <div className="payment-summary-row">
                  <div>Items ({paymentSummary.totalItems}):</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.productCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div className="payment-summary-money">
                    {" "}
                    {formatMoney(paymentSummary.shippingCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div className="payment-summary-money">
                    {" "}
                    {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div className="payment-summary-money">
                    {" "}
                    {formatMoney(paymentSummary.taxCents)}
                  </div>
                </div>

                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">
                    {" "}
                    {formatMoney(paymentSummary.totalCostCents)}
                  </div>
                </div>

                <button className="place-order-button button-primary">
                  Place your order
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
