"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { Address } from "@/lib/types";
import { useShopStore } from "@/store/useShopStore";

type PaymentMethod = "credit_card" | "gpay" | "phonepe" | "paytm";

interface PaymentDetails {
  method: PaymentMethod;
  cardholderName?: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  upiId?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, placeOrder, getMixedCatalog } = useShopStore();
  const mixedCatalog = getMixedCatalog();

  const [address, setAddress] = useState<Address>({
    fullName: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [payment, setPayment] = useState<PaymentDetails>({
    method: "credit_card",
  });
  const [error, setError] = useState<string | null>(null);
  const [isPlacing, setIsPlacing] = useState(false);

  const total = useMemo(
    () => cart.reduce((sum, ci) => {
      const p = mixedCatalog.find((x) => x.id === ci.productId);
      return sum + (p ? p.price * ci.quantity : 0);
    }, 0),
    [cart, mixedCatalog]
  );

  function validatePayment(): string | null {
    if (payment.method === "credit_card") {
      if (!payment.cardholderName) return "Cardholder name is required.";
      if (!payment.cardNumber || payment.cardNumber.length !== 16) return "Invalid card number. Must be 16 digits.";
      if (!payment.expiry || !/^\d{2}\/\d{2}$/.test(payment.expiry)) return "Invalid expiry date. Use MM/YY format.";
      if (!payment.cvv || payment.cvv.length !== 3) return "Invalid CVV. Must be 3 digits.";
    } else {
      if (!payment.upiId || !payment.upiId.includes("@")) return "Invalid UPI ID format.";
    }
    return null;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    
    for (const [, value] of Object.entries(address)) {
      if (!value) {
        setError("Please fill all address fields.");
        return;
      }
    }

    const paymentError = validatePayment();
    if (paymentError) {
      setError(`Transaction failed: ${paymentError}`);
      return;
    }

    setIsPlacing(true);
    try {
      const orderId = placeOrder({
        items: cart,
        address,
        status: "processing",
      });
      router.push(`/orders?placed=${orderId}`);
    } catch {
      setError("Checkout failed. Please try again.");
    } finally {
      setIsPlacing(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold dot-matrix mb-2">Checkout</h1>
        <p className="text-gray-600" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Complete your order
        </p>
      </div>

      <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="card p-6 space-y-6">
          <h2 className="text-xl font-semibold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Shipping Address
          </h2>
          <Input label="Full Name" value={address.fullName} onChange={(v) => setAddress({ ...address, fullName: v })} />
          <Input label="Street Address" value={address.street} onChange={(v) => setAddress({ ...address, street: v })} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="City" value={address.city} onChange={(v) => setAddress({ ...address, city: v })} />
            <Input label="State" value={address.state} onChange={(v) => setAddress({ ...address, state: v })} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Postal Code" value={address.postalCode} onChange={(v) => setAddress({ ...address, postalCode: v })} />
            <Input label="Country" value={address.country} onChange={(v) => setAddress({ ...address, country: v })} />
          </div>
        </div>

        <div className="card p-6 space-y-6">
          <h2 className="text-xl font-semibold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Payment Details
          </h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Payment Method
            </label>
            <select 
              value={payment.method} 
              onChange={(e) => setPayment({ method: e.target.value as PaymentMethod })}
              className="input-field"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              <option value="credit_card">Credit Card</option>
              <option value="gpay">GPay</option>
              <option value="phonepe">PhonePe</option>
              <option value="paytm">Paytm</option>
            </select>
          </div>

          {payment.method === "credit_card" ? (
            <>
              <Input 
                label="Cardholder Name" 
                value={payment.cardholderName || ""} 
                onChange={(v) => setPayment({ ...payment, cardholderName: v })} 
                required
              />
              <Input 
                label="Card Number" 
                value={payment.cardNumber || ""} 
                onChange={(v) => setPayment({ ...payment, cardNumber: v.replace(/\D/g, '').slice(0, 16) })} 
                placeholder="1234567890123456"
                pattern="\d{16}"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Expiry (MM/YY)" 
                  value={payment.expiry || ""} 
                  onChange={(v) => setPayment({ ...payment, expiry: v })} 
                  placeholder="12/25"
                  pattern="\d{2}/\d{2}"
                  required
                />
                <Input 
                  label="CVV" 
                  value={payment.cvv || ""} 
                  onChange={(v) => setPayment({ ...payment, cvv: v.replace(/\D/g, '').slice(0, 3) })} 
                  placeholder="123"
                  pattern="\d{3}"
                  required
                />
              </div>
            </>
          ) : (
            <Input 
              label="UPI ID" 
              value={payment.upiId || ""} 
              onChange={(v) => setPayment({ ...payment, upiId: v })} 
              placeholder="yourname@paytm"
              required
            />
          )}

          {error && <div className="text-sm text-red-600 p-3 bg-red-50 rounded-lg" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{error}</div>}
          
          <button 
            disabled={isPlacing} 
            className="btn-primary w-full disabled:opacity-50"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            {isPlacing ? "Placing order..." : `Place Order (₹${(total / 100).toFixed(2)})`}
          </button>
        </div>
        
        <div className="card p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Order Summary
          </h2>
          <div className="space-y-3">
            {cart.map((ci) => {
              const p = mixedCatalog.find((x) => x.id === ci.productId);
              if (!p) return null;
              return (
                <div key={ci.productId} className="flex items-center justify-between text-sm">
                  <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {p.name} × {ci.quantity}
                  </span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    ₹{((p.price * ci.quantity) / 100).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="border-t pt-3 mt-4">
            <div className="flex items-center justify-between text-lg font-bold">
              <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>Total</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>₹{(total / 100).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, pattern, required }: { 
  label: string; 
  value: string; 
  onChange: (v: string) => void;
  placeholder?: string;
  pattern?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
        {label}
      </label>
      <input 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        placeholder={placeholder}
        pattern={pattern}
        required={required}
        className="input-field"
        style={{ fontFamily: 'JetBrains Mono, monospace' }}
      />
    </div>
  );
}


