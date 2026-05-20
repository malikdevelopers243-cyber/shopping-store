import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/Payment.css';

const PaymentMethod = () => {
  const navigate = useNavigate();
  const { getTotalPrice, clearCart } = useCart();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [step, setStep] = useState(1); // 1: Method Selection, 2: Details, 3: Success

  const paymentMethods = [
    {
      id: 'jazzcash',
      name: 'JazzCash',
      icon: '/images/jazzcash.png',
      color: 'rgb(223, 197, 51)',
      description: 'Fast & Secure Mobile Payment'
    },
    {
      id: 'easypaisa',
      name: 'Easypaisa',
      icon: '/images/Easypaisa.png',
      color: '#00A651',
      description: 'Pakistan\'s Leading Payment Platform'
    },
    {
      id: 'sadapay',
      name: 'SadaPay',
      icon: '/images/sadapay.png',
      color: '#FF6B35',
      description: 'Instant Wallet Transfer'
    },
    {
      id: 'upaisa',
      name: 'UPaisa',
      icon: '/images/upaisa.png',
      color: '#0052CC',
      description: 'Secure Digital Payment'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: '/images/bank.png',
      color: '#1F1F1F',
      description: 'Direct Bank Account Transfer'
    }
  ];

  const banks = [
    'State Bank of Pakistan (SBP)',
    'Habib Bank Limited (HBL)',
    'United Bank Limited (UBL)',
    'Allied Bank Limited (ABL)',
    'National Bank of Pakistan (NBP)',
    'Bank Alfalah',
    'Askari Bank',
    'Summit Bank',
    'MCB Bank',
    'Faysal Bank',
    'HSBC Pakistan',
    'Deutsche Bank Pakistan',
    'Meezan Bank',
    'Bank Islami'
  ];

  const handleSelectMethod = (methodId) => {
    setSelectedMethod(methodId);
    setStep(2);
  };

  const handlePayment = () => {
    setStep(3);
    setTimeout(() => {
      clearCart();
      navigate('/payment-success');
    }, 2000);
  };

  return (
    <div className="payment-container">
      {step === 1 && (
        <div className="payment-wrapper">
          <div className="payment-header">
            <h1>Select Payment Method</h1>
            <p>Choose your preferred payment method</p>
          </div>

          <div className="payment-methods-grid">
            {paymentMethods.map(method => (
              <div
                key={method.id}
                className="payment-method-card"
                style={{ borderColor: method.color }}
                onClick={() => handleSelectMethod(method.id)}
              >
               {/* <div className="method-icon" style={{ background: method.color }}>
              <img 
                 src={method.icon} 
               alt={method.name}
                 className="payment-icon-img"
               />
                    </div> */}

                    <div className="method-icon" style={{ background: method.color }}>
                      <img 
                        src={method.icon} 
                        alt={method.name}
                        className="payment-icon-img"
                        style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                      />
                    </div>
                <h3>{method.name}</h3>
                <p>{method.description}</p>
                <button className="method-btn" style={{ background: method.color }}>
                  Select
                </button>
              </div>
            ))}
          </div>
          <div className="order-summary">
            <div className="summary-item">
              <span>Total Amount:</span>
              <span className="amount">PKR {getTotalPrice().toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {step === 2 && selectedMethod && (
        <PaymentDetailsForm
          method={selectedMethod}
          paymentMethods={paymentMethods}
          banks={banks}
          totalPrice={getTotalPrice()}
          onBack={() => setStep(1)}
          onConfirm={handlePayment}
        />
      )}
      {step === 3 && (
        <div className="payment-processing">
          <div className="loader">
            <div className="spinner"></div>
          </div>
          <h2>Processing Payment...</h2>
          <p>Please wait while we process your payment</p>
        </div>
      )}
    </div>
  );
};
const PaymentDetailsForm = ({ method, paymentMethods, banks, totalPrice, onBack, onConfirm }) => {
  const selectedPayment = paymentMethods.find(m => m.id === method);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    accountNumber: '',
    selectedBank: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    if (method === 'bank' && !formData.selectedBank) {
      newErrors.selectedBank = 'Please select a bank';
    }
    if (method === 'bank' && !formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required';
    }
    if (method !== 'bank' && !formData.accountNumber.trim()) {
      newErrors.accountNumber = `${selectedPayment.name} account is required`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onConfirm();
    }
  };

  return (
    <div className="payment-details-wrapper">
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>

      <div className="payment-details-container">
        <div className="payment-form-section">
          <div className="form-header">
            <div className="method-badge" style={{ background: selectedPayment.color }}>
               <img 
      src={selectedPayment.icon} 
      alt={selectedPayment.name}
      className="payment-form-icon"
      style={{ width: '60px', height: '60px', objectFit: 'contain' }}
    />
            </div>
            <div>
              <h2>{selectedPayment.name}</h2>
              <p>{selectedPayment.description}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="payment-form">
            <div className="form-section">
              <h3> Delivery Information</h3>
              
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={errors.fullName ? 'input-error' : ''}
                />
                {errors.fullName && <span className="error-text">{errors.fullName}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className={errors.email ? 'input-error' : ''}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+92 3XX-XXXXXXX"
                    className={errors.phone ? 'input-error' : ''}
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Street Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  className={errors.address ? 'input-error' : ''}
                />
                {errors.address && <span className="error-text">{errors.address}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Karachi"
                    className={errors.city ? 'input-error' : ''}
                  />
                  {errors.city && <span className="error-text">{errors.city}</span>}
                </div>

                <div className="form-group">
                  <label>ZIP Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="75000"
                    className={errors.zipCode ? 'input-error' : ''}
                  />
                  {errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
                </div>
              </div>
            </div>

            {/* Payment Account Information */}
            <div className="form-section">
              <h3>Payment Information</h3>

              {method === 'bank' ? (
                <>
                  <div className="form-group">
                    <label>Select Bank *</label>
                    <select
                      name="selectedBank"
                      value={formData.selectedBank}
                      onChange={handleInputChange}
                      className={errors.selectedBank ? 'input-error' : ''}
                    >
                      <option value="">Choose a bank...</option>
                      {banks.map(bank => (
                        <option key={bank} value={bank}>
                          {bank}
                        </option>
                      ))}
                    </select>
                    {errors.selectedBank && <span className="error-text">{errors.selectedBank}</span>}
                  </div>

                  <div className="form-group">
                    <label>Account Number *</label>
                    <input
                      type="text"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleInputChange}
                      placeholder="Enter your account number"
                      className={errors.accountNumber ? 'input-error' : ''}
                    />
                    {errors.accountNumber && <span className="error-text">{errors.accountNumber}</span>}
                  </div>
                </>
              ) : (
                <div className="form-group">
                  <label>{selectedPayment.name} Account *</label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    placeholder={`Enter your ${selectedPayment.name} account number`}
                    className={errors.accountNumber ? 'input-error' : ''}
                  />
                  {errors.accountNumber && <span className="error-text">{errors.accountNumber}</span>}
                </div>
              )}
            </div>

            <button type="submit" className="btn-pay" style={{ background: selectedPayment.color }}>
               Pay PKR {totalPrice.toLocaleString()}
            </button>
          </form>
        </div>
        <div className="order-summary-section">
          <div className="summary-card">
            <h3>Order Summary</h3>
            
            <div className="summary-item">
              <span>Subtotal</span>
              <span>PKR {totalPrice.toLocaleString()}</span>
            </div>
            
            <div className="summary-item">
              <span>Shipping</span>
              <span className="free">FREE</span>
            </div>
            
            <div className="summary-item">
              <span>Tax</span>
              <span>PKR {(totalPrice * 0.17).toLocaleString('en-PK', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              })}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-item total">
              <span>Total</span>
              <span>PKR {(totalPrice * 1.17).toLocaleString('en-PK', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              })}</span>
            </div>

            <div className="security-badge">
               <img 
    src="/images/security.png" 
    alt="Security"
    className="security-badge-img"
  />
              <p>Your payment is secure and encrypted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;