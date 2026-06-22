import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, Truck, CreditCard, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

type CheckoutStep = 'cart' | 'shipping' | 'payment' | 'success';

export default function Cart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartProps) {
  const [step, setStep] = useState<CheckoutStep>('cart');
  
  // Simulated form inputs state
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const qualifiesForFreeShipping = subtotal >= 35;
  const shippingCost = qualifiesForFreeShipping || shippingMethod === 'standard' ? (qualifiesForFreeShipping ? 0 : 4.99) : 9.99;
  const estTax = subtotal * 0.0825; // 8.25%
  const total = subtotal + shippingCost + estTax;

  const handleStepChange = (nextStep: CheckoutStep) => {
    // Basic validations
    if (nextStep === 'payment') {
      const errors: Record<string, string> = {};
      if (!email.includes('@')) errors.email = 'Valid email is required.';
      if (!fullName.trim()) errors.fullName = 'Full name is required.';
      if (!address.trim()) errors.address = 'A delivery physical address is required.';
      if (!city.trim()) errors.city = 'City is required.';
      if (zip.length < 5) errors.zip = 'Valid ZIP code is required.';
      
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
      setFormErrors({});
    }

    if (nextStep === 'success') {
      const errors: Record<string, string> = {};
      if (cardNumber.replace(/\s+/g, '').length < 16) errors.card = 'Simulate 16 digit card entry.';
      if (!expiry.trim()) errors.expiry = 'MM/YY required.';
      if (cvv.length < 3) errors.cvv = 'CVV required.';

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
      setFormErrors({});
    }

    setStep(nextStep);
  };

  const handleOrderSubmitted = () => {
    setStep('success');
  };

  const resetCheckoutStats = () => {
    onClearCart();
    setStep('cart');
    setEmail('');
    setFullName('');
    setAddress('');
    setCity('');
    setZip('');
    setCardNumber('');
    setExpiry('');
    setCvv('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" id="navigation-sidebar-cart">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-emerald-950/40 backdrop-blur-sm"
          />

          {/* Panel slider container */}
          <div className="absolute inset-y-0 right-0 max-w-full pl-10 flex">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-white flex flex-col justify-between shadow-2xl relative"
              id="cart-drawer-sheet"
            >
              {/* Header */}
              <div className="px-5 py-5 border-b border-emerald-50 flex items-center justify-between bg-emerald-50/20">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-emerald-800" />
                  <span className="text-base font-bold text-emerald-950 uppercase tracking-wide">
                    {step === 'cart' && 'Your Shopping Bag'}
                    {step === 'shipping' && 'Delivery Information'}
                    {step === 'payment' && 'Secure Checkout'}
                    {step === 'success' && 'Order Confirmed'}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full bg-emerald-50 p-2 text-emerald-900 hover:bg-emerald-100 transition-colors"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Progress Steps Indicator */}
              {step !== 'success' && cartItems.length > 0 && (
                <div className="px-5 py-3 border-b border-emerald-50/60 bg-white grid grid-cols-3 text-center text-xs font-semibold">
                  <div className={`pb-1 border-b-2 ${step === 'cart' ? 'border-emerald-600 text-emerald-950' : 'border-transparent text-emerald-900/40'}`}>
                    01 Bag
                  </div>
                  <div className={`pb-1 border-b-2 ${step === 'shipping' ? 'border-emerald-600 text-emerald-950' : 'border-transparent text-emerald-900/40'}`}>
                    02 Shipping
                  </div>
                  <div className={`pb-1 border-b-2 ${step === 'payment' ? 'border-emerald-600 text-emerald-950' : 'border-transparent text-emerald-900/40'}`}>
                    03 Purchase
                  </div>
                </div>
              )}

              {/* Main Content Area */}
              <div className="grow overflow-y-auto px-5 py-4 scrollbar-thin">
                <AnimatePresence mode="wait">
                  {cartItems.length === 0 && step !== 'success' ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center py-12"
                      id="empty-cart-splash"
                    >
                      <ShoppingBag className="h-14 w-14 text-emerald-100 animate-pulse" />
                      <h3 className="mt-4 text-base font-bold text-emerald-950">Your bag is empty</h3>
                      <p className="mt-1.5 text-xs text-emerald-900/60 leading-relaxed max-w-xs">
                        Refine your wellness ritual by adding our shade-dried organic Moringa powders, teas, or wellness elixirs here.
                      </p>
                      <button
                        onClick={onClose}
                        className="mt-6 rounded-xl bg-emerald-800 text-white font-semibold text-xs py-2.5 px-5 hover:bg-emerald-950 transition-colors"
                      >
                        Continue Browsing
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      {/* STEP 1: The Shopping Bag List */}
                      {step === 'cart' && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-4"
                          id="cart-step-list"
                        >
                          {cartItems.map((item) => (
                            <div 
                              key={item.product.id} 
                              className="flex gap-4 p-3 rounded-2xl border border-emerald-50 bg-emerald-50/10"
                              id={`cart-item-${item.product.id}`}
                            >
                              <div className="h-20 w-20 rounded-xl overflow-hidden shrink-0 border border-emerald-50">
                                <img
                                  src={item.product.image}
                                  alt={item.product.name}
                                  className="h-full w-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>

                              <div className="grow flex flex-col justify-between">
                                <div>
                                  <h4 className="text-xs font-bold text-emerald-950 line-clamp-1">{item.product.name}</h4>
                                  <p className="text-[10px] text-emerald-900/50 mt-0.5">{item.product.size} • ${item.product.price}</p>
                                </div>

                                <div className="flex items-center justify-between">
                                  {/* Quantity toggler */}
                                  <div className="flex items-center rounded-lg border border-emerald-100 bg-white p-0.5">
                                    <button
                                      onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                      className="px-1.5 py-0.5 text-xs font-bold text-emerald-900"
                                    >
                                      <Minus className="h-3 w-3" />
                                    </button>
                                    <span className="px-2 text-xs font-bold text-emerald-950">{item.quantity}</span>
                                    <button
                                      onClick={() => onUpdateQuantity(item.product.id, Math.min(10, item.quantity + 1))}
                                      className="px-1.5 py-0.5 text-xs font-bold text-emerald-900"
                                    >
                                      <Plus className="h-3 w-3" />
                                    </button>
                                  </div>

                                  <button
                                    onClick={() => onRemoveItem(item.product.id)}
                                    className="p-1.5 text-red-500 hover:text-red-700 transition-colors"
                                    title="Remove item"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}

                      {/* STEP 2: Shipping Details Form */}
                      {step === 'shipping' && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-4"
                          id="checkout-shipping-form"
                        >
                          <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-950">Shipping Destination</h3>
                          
                          <div className="space-y-3">
                            <div>
                              <label className="block text-[10px] font-bold uppercase text-emerald-950">Email Address</label>
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="customer@example.com"
                                className="mt-1 w-full rounded-xl border border-emerald-100 bg-emerald-50/10 px-3.5 py-2.5 text-xs text-emerald-950 placeholder-emerald-900/30 font-medium focus:border-emerald-500 focus:outline-none"
                              />
                              {formErrors.email && <p className="text-[10px] text-red-500 font-semibold mt-1">{formErrors.email}</p>}
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold uppercase text-emerald-950">Full Name</label>
                              <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="John Doe"
                                className="mt-1 w-full rounded-xl border border-emerald-100 bg-emerald-50/10 px-3.5 py-2.5 text-xs text-emerald-950 placeholder-emerald-900/30 font-medium focus:border-emerald-500 focus:outline-none"
                              />
                              {formErrors.fullName && <p className="text-[10px] text-red-500 font-semibold mt-1">{formErrors.fullName}</p>}
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold uppercase text-emerald-950">Street Address</label>
                              <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="123 Wellness Way"
                                className="mt-1 w-full rounded-xl border border-emerald-100 bg-emerald-50/10 px-3.5 py-2.5 text-xs text-emerald-950 placeholder-emerald-900/30 font-medium focus:border-emerald-500 focus:outline-none"
                              />
                              {formErrors.address && <p className="text-[10px] text-red-500 font-semibold mt-1">{formErrors.address}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[10px] font-bold uppercase text-emerald-950">City Name</label>
                                <input
                                  type="text"
                                  value={city}
                                  onChange={(e) => setCity(e.target.value)}
                                  placeholder="Malibu"
                                  className="mt-1 w-full rounded-xl border border-emerald-100 bg-emerald-50/10 px-3.5 py-2.5 text-xs text-emerald-950 placeholder-emerald-900/30 font-medium focus:border-emerald-500 focus:outline-none"
                                />
                                {formErrors.city && <p className="text-[10px] text-red-500 font-semibold mt-1">{formErrors.city}</p>}
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold uppercase text-emerald-950">ZIP Code</label>
                                <input
                                  type="text"
                                  value={zip}
                                  maxLength={5}
                                  onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))}
                                  placeholder="90265"
                                  className="mt-1 w-full rounded-xl border border-emerald-100 bg-emerald-50/10 px-3.5 py-2.5 text-xs text-emerald-950 placeholder-emerald-900/30 font-medium focus:border-emerald-500 focus:outline-none"
                                />
                                {formErrors.zip && <p className="text-[10px] text-red-500 font-semibold mt-1">{formErrors.zip}</p>}
                              </div>
                            </div>
                          </div>

                          {/* Shipping Methods catalog */}
                          <div className="pt-4 border-t border-emerald-50 space-y-2.5">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                              <Truck className="h-4 w-4 text-emerald-700" />
                              Shipping Rate option
                            </h4>
                            
                            <label className="flex items-center justify-between p-3 rounded-xl border border-emerald-150 bg-emerald-50/20 cursor-pointer text-xs font-medium">
                              <div className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name="shipping-rate"
                                  checked={shippingMethod === 'standard'}
                                  onChange={() => setShippingMethod('standard')}
                                  className="accent-emerald-700"
                                />
                                <div>
                                  <span className="font-bold text-emerald-950">Standard Delivery</span>
                                  <p className="text-[10px] text-emerald-900/60">Takes 3-5 business days</p>
                                </div>
                              </div>
                              <span className="font-bold text-emerald-950">
                                {qualifiesForFreeShipping ? 'FREE' : '$4.99'}
                              </span>
                            </label>

                            <label className="flex items-center justify-between p-3 rounded-xl border border-emerald-100 cursor-pointer text-xs font-medium hover:bg-emerald-50/30">
                              <div className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name="shipping-rate"
                                  checked={shippingMethod === 'express'}
                                  onChange={() => setShippingMethod('express')}
                                  className="accent-emerald-700"
                                />
                                <div>
                                  <span className="font-bold text-emerald-950">Express Air Courier</span>
                                  <p className="text-[10px] text-emerald-900/60">Prioritized (1-2 business days)</p>
                                </div>
                              </div>
                              <span className="font-bold text-emerald-950">$9.99</span>
                            </label>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 3: Secure Credit Card Simulation Form */}
                      {step === 'payment' && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-4"
                          id="checkout-payment-form"
                        >
                          <div className="rounded-xl border border-amber-200 bg-amber-50/30 p-4">
                            <div className="flex gap-2.5 items-start">
                              <ShieldCheck className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
                              <div>
                                <h4 className="text-xs font-bold text-amber-900">Sandbox Secure Guarantee</h4>
                                <p className="text-[11px] text-amber-900/80 leading-normal mt-0.5">
                                  This is a local simulated store environment. To qualify, please input dummy billing numbers below. Please do <strong>NOT</strong> write actual secret card details.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3.5">
                            <div>
                              <label className="block text-[10px] font-bold uppercase text-emerald-950">Simulated Card Number</label>
                              <div className="relative">
                                <input
                                  type="text"
                                  maxLength={19}
                                  value={cardNumber}
                                  onChange={(e) => {
                                    // format spaces in card
                                    const value = e.target.value.replace(/\D/g, '').substring(0, 16);
                                    const parts = value.match(/.{1,4}/g);
                                    setCardNumber(parts ? parts.join(' ') : value);
                                  }}
                                  placeholder="4111_ 2222_ 3333_ 4444"
                                  className="mt-1 w-full rounded-xl border border-emerald-100 bg-emerald-50/10 px-3.5 py-2.5 text-xs text-emerald-950 placeholder-emerald-900/30 font-medium focus:border-emerald-500 focus:outline-none"
                                />
                                <CreditCard className="absolute right-3.5 top-3.5 h-4.5 w-4.5 text-emerald-900/30" />
                              </div>
                              {formErrors.card && <p className="text-[10px] text-red-500 font-semibold mt-1">{formErrors.card}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[10px] font-bold uppercase text-emerald-950">Expiry MM/YY</label>
                                <input
                                  type="text"
                                  maxLength={5}
                                  value={expiry}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    if (value.length === 2 && !value.includes('/')) {
                                      setExpiry(value + '/');
                                    } else {
                                      setExpiry(value);
                                    }
                                  }}
                                  placeholder="12/28"
                                  className="mt-1 w-full rounded-xl border border-emerald-100 bg-emerald-50/10 px-3.5 py-2.5 text-xs text-emerald-950 placeholder-emerald-900/30 font-medium focus:border-emerald-500 focus:outline-none"
                                />
                                {formErrors.expiry && <p className="text-[10px] text-red-500 font-semibold mt-1">{formErrors.expiry}</p>}
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold uppercase text-emerald-950">CVV Security Code</label>
                                <input
                                  type="password"
                                  maxLength={3}
                                  value={cvv}
                                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                                  placeholder="123"
                                  className="mt-1 w-full rounded-xl border border-emerald-100 bg-emerald-50/10 px-3.5 py-2.5 text-xs text-emerald-950 placeholder-emerald-900/30 font-medium focus:border-emerald-500 focus:outline-none"
                                />
                                {formErrors.cvv && <p className="text-[10px] text-red-500 font-semibold mt-1">{formErrors.cvv}</p>}
                              </div>
                            </div>
                          </div>

                          <div className="pt-3">
                            <span className="text-[10px] text-emerald-900/60 font-medium">
                              🔒 Your credentials are and will always stay strictly local within your browser sandbox environment.
                            </span>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 4: Order Completion Success Screen */}
                      {step === 'success' && (
                        <motion.div
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="h-full flex flex-col items-center justify-center text-center py-10"
                          id="checkout-success-receipt"
                        >
                          <div className="rounded-full bg-emerald-50 p-4 text-emerald-600">
                            <CheckCircle className="h-14 w-14 animate-bounce" />
                          </div>
                          
                          <h3 className="mt-5 text-lg font-black text-emerald-950">Order Placed Successfully!</h3>
                          
                          <p className="mt-1 text-xs text-emerald-700/80 font-mono-important">
                            Receipt Order: #MW-{Math.floor(100000 + Math.random() * 900000)}
                          </p>

                          <p className="mt-4 text-xs text-emerald-900/70 max-w-xs leading-relaxed">
                            Thank you, <strong>{fullName || 'Wellness Customer'}</strong>! An organic botanical validation has been sent to <strong>{email || 'your email'}</strong>. Your Moringa premium packages will dispatch to <strong>{address}, {city}</strong> within 12 hours.
                          </p>

                          <div className="w-full border-t border-dashed border-emerald-100 my-6 pt-5 flex flex-col gap-2 items-stretch max-w-xs text-left text-xs text-emerald-950 bg-emerald-50/30 p-4 rounded-xl">
                            <div className="flex justify-between font-bold">
                              <span>Items Prepared:</span>
                              <span>{cartItems.reduce((acc, item) => acc + item.quantity, 0)} packages</span>
                            </div>
                            <div className="flex justify-between font-bold text-base text-emerald-800 border-t border-emerald-50 pt-2 mt-1">
                              <span>Total Value Charged:</span>
                              <span>${total.toFixed(2)}</span>
                            </div>
                          </div>

                          <button
                            onClick={resetCheckoutStats}
                            id="finish-order-btn"
                            className="w-full max-w-xs rounded-xl bg-emerald-800 text-white font-bold text-xs py-3.5 hover:bg-emerald-900 transition-colors uppercase tracking-wider"
                          >
                            Close & Continue Shopping
                          </button>
                        </motion.div>
                      )}
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Drawer Sticky Footer: Cost details & flow progression buttons */}
              {cartItems.length > 0 && step !== 'success' && (
                <div className="px-5 py-5 border-t border-emerald-50 bg-emerald-50/10">
                  <div className="space-y-2 text-xs text-emerald-950 pb-4">
                    <div className="flex justify-between font-medium">
                      <span className="text-emerald-900/60">Cart Subtotal:</span>
                      <span className="font-bold">${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between font-medium">
                      <span className="text-emerald-900/60">Shipping Fees:</span>
                      <span className="font-bold">
                        {step === 'cart' 
                          ? (qualifiesForFreeShipping ? 'FREE' : '$4.99')
                          : `$${shippingCost.toFixed(2)}`
                        }
                      </span>
                    </div>

                    <div className="flex justify-between font-medium">
                      <span className="text-emerald-900/60">Estimated Local Taxes (8.25%):</span>
                      <span className="font-bold">${estTax.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-sm font-black border-t border-emerald-100/60 pt-2.5 text-emerald-900">
                      <span>Total Invoice:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>

                    {qualifiesForFreeShipping && step === 'cart' && (
                      <div className="rounded-lg bg-emerald-50 p-2 text-center text-[10px] font-bold text-emerald-800 uppercase tracking-wide flex items-center justify-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        <span>Congratulations! You qualify for Free Standard Delivery</span>
                      </div>
                    )}
                  </div>

                  {/* Flow Action Buttons */}
                  <div className="flex gap-3">
                    {step !== 'cart' && (
                      <button
                        onClick={() => {
                          if (step === 'shipping') setStep('cart');
                          if (step === 'payment') setStep('shipping');
                        }}
                        className="rounded-xl border border-emerald-150 py-3 px-4 font-bold text-xs text-emerald-900 hover:bg-emerald-150 transition-colors uppercase tracking-wider bg-white"
                      >
                        Back
                      </button>
                    )}

                    {step === 'cart' && (
                      <button
                        id="cart-checkout-cta"
                        onClick={() => handleStepChange('shipping')}
                        className="grow rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs py-3.5 flex items-center justify-center gap-1.5 uppercase tracking-wider shadow"
                      >
                        <span>Checkout Destination</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    )}

                    {step === 'shipping' && (
                      <button
                        id="shipping-submit-cta"
                        onClick={() => handleStepChange('payment')}
                        className="grow rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs py-3.5 flex items-center justify-center gap-1.5 uppercase tracking-wider shadow"
                      >
                        <span>Proceed to payment</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    )}

                    {step === 'payment' && (
                      <button
                        id="payment-submit-cta"
                        onClick={() => handleStepChange('success')}
                        className="grow rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-3.5 flex items-center justify-center gap-1.5 uppercase tracking-wider shadow"
                      >
                        <span>Simulate Secure Payment — ${total.toFixed(2)}</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
