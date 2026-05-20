import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { STORE_GMAIL } from '../config/contact';
import { saveComplaint } from '../utils/contactStorage';
import '../styles/Contact.css';

const INQUIRY_TYPES = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'complaint', label: 'Register Complaint' },
  { value: 'order', label: 'Order Issue' },
  { value: 'feedback', label: 'Feedback' },
];

const Contact = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    inquiryType: 'general',
    subject: '',
    orderId: '',
    message: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const buildEmailBody = () => {
    const typeLabel =
      INQUIRY_TYPES.find((t) => t.value === form.inquiryType)?.label || form.inquiryType;

    return [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || 'Not provided'}`,
      `Type: ${typeLabel}`,
      form.orderId ? `Order ID: ${form.orderId}` : null,
      '',
      'Message:',
      form.message,
    ]
      .filter(Boolean)
      .join('\n');
  };

  const openGmail = () => {
    const subject = encodeURIComponent(
      `[My Store] ${form.subject || INQUIRY_TYPES.find((t) => t.value === form.inquiryType)?.label}`
    );
    const body = encodeURIComponent(buildEmailBody());
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(STORE_GMAIL)}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(null);

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in name, email, and message.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (form.inquiryType === 'complaint' && form.message.trim().length < 20) {
      setError('Please describe your complaint in at least 20 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      const entry = saveComplaint({
        userId: user?.id || null,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        inquiryType: form.inquiryType,
        subject: form.subject.trim() || INQUIRY_TYPES.find((t) => t.value === form.inquiryType)?.label,
        orderId: form.orderId.trim(),
        message: form.message.trim(),
      });

      openGmail();

      setSuccess({
        id: entry.id,
        isComplaint: form.inquiryType === 'complaint',
      });

      setForm((prev) => ({
        ...prev,
        phone: '',
        subject: '',
        orderId: '',
        message: '',
        inquiryType: 'general',
      }));
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
  <section className="contact-hero">
    <div className="contact-hero-inner">
      <h1>Contact Us</h1>
      <p>Get in touch via Gmail or register your complaint , we&apos;re here to help.</p>
    </div>
      </section>

      <div className="contact-container">
        <div className="contact-grid">
          <aside className="contact-info">
            <h2>Reach Us</h2>
            <p>Send a message directly through Gmail or submit the form ,your request is saved instantly.</p>

            <a
              href={`mailto:${STORE_GMAIL}`}
              className="contact-gmail-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-gmail-icon">
                 <img src="/images/gmail.png" alt="gmail" />
              </span>
              <div>
                <strong>Gmail Support</strong>
                <span>malikdevelopers243@gmail.com</span>
              </div>
            </a>

            <ul className="contact-info-list">
              <li>
                <span>Response time</span>
                <strong>Within 24 hours</strong>
              </li>
              <li>
                <span>Complaints</span>
                <strong>Registered & tracked</strong>
              </li>
              <li>
                <span>Hours</span>
                <strong>Mon – Sat, 9am – 6pm</strong>
              </li>
            </ul>
          </aside>

          <div className="contact-form-card">
            {success ? (
              <div className="contact-success">
                <div className="contact-success-icon">✓</div>
                <h2>
                  {success.isComplaint
                    ? 'Complaint Registered Successfully!'
                    : 'Message Sent Successfully!'}
                </h2>
                <p>
                  Your reference ID: <strong>#{success.id}</strong>
                </p>
                <p className="contact-success-note">
                  Gmail has been opened in a new tab , click Send to deliver your message.
                  {success.isComplaint && ' Your complaint is saved in our system.'}
                </p>
                <button
                  type="button"
                  className="contact-btn contact-btn-secondary"
                  onClick={() => setSuccess(null)}
                >
                  Send Another Message
                </button>
                <Link to="/home" className="contact-btn contact-btn-primary">
                  Back to Home
                </Link>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <h2>Contact us Here</h2>
                <p className="contact-form-subtitle">
                  Fill the form below ,we&apos;ll open Gmail with your details ready to send.
                </p>

                {error && (
                  <div className="contact-error" role="alert">
                    {error}
                  </div>
                )}

                <div className="contact-form-row">
                  <div className="contact-field">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter Your full name"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="email">Email *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your Email Address"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="contact-form-row">
                  <div className="contact-field">
                    <label htmlFor="phone">Phone</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+92 300 0000000"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="inquiryType">Inquiry Type *</label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={form.inquiryType}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    >
                      {INQUIRY_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="contact-form-row">
                  <div className="contact-field">
                    <label htmlFor="subject">Subject</label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Brief subject"
                      disabled={isSubmitting}
                    />
                  </div>
                  {(form.inquiryType === 'complaint' || form.inquiryType === 'order') && (
                    <div className="contact-field">
                      <label htmlFor="orderId">Order ID</label>
                      <input
                        id="orderId"
                        name="orderId"
                        type="text"
                        value={form.orderId}
                        onChange={handleChange}
                        placeholder="e.g. ORD-12345"
                        disabled={isSubmitting}
                      />
                    </div>
                  )}
                </div>

                <div className="contact-field">
                  <label htmlFor="message">
                    {form.inquiryType === 'complaint' ? 'Complaint Details *' : 'Message *'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={
                      form.inquiryType === 'complaint'
                        ? 'Describe your complaint in detail...'
                        : 'How can we help you?'
                    }
                    disabled={isSubmitting}
                  />
                </div>

                <div className="contact-form-actions">
                  <button
                    type="submit"
                    className="contact-btn contact-btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit & Open Gmail'}
                  </button>
                  <button
                    type="button"
                    className="contact-btn contact-btn-outline"
                    onClick={openGmail}
                    disabled={isSubmitting || !form.message.trim()}
                  >
                    Open Gmail Only
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
