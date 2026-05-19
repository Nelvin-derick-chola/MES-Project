import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import styles from './Contact.module.css';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    //Clear error when user starts typing
    if (error) setError(null);
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    //validation logic...
    if (!formData.name || !formData.email || !formData.subject) {
        setError('Please fill in all required fields');
        setIsSubmitting(false);
        return;
    }

    try {
        //Call to Laravel API endpoint
        const response = await fetch('/api/v1/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            setSubmitted(true);
            // Reset form...
            setFormData({
              name: '',
                email: '',
                subject: '',
                message: '',

            });
            
        } else {
            setError(data.message || 'Failed to send message. Please try again.');
        }
    } catch (err) {
        console.error('Submit error:', err);
        setError('Network error. Please check your connection and try again.');
    } finally {
        setIsSubmitting(false);
    }
};

  return (
    <section className={styles.contact}>
      <div className={styles.header}>
        <h1>Contact us</h1>
        <p className={styles.subtitle}>
          We are committed to processing the information in order to contact you 
          and talk about your Shipment and Queries.
        </p>
      </div>

      <div className={styles.contentGrid}>
        {/* Left Column - Contact Form */}
        <div className={styles.formColumn}>
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Success Message */}
            {submitted && (
              <div className={styles.successMessage}>
                <CheckCircle size={18} />
                <span>Message sent successfully! We'll get back to you soon.</span>
              </div>
            )}
            
            {/* Error Message */}
            {error && (
              <div className={styles.errorMessage}>
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Name <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="Enter your full name"
                disabled={isSubmitting}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email <span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="your@email.com"
                disabled={isSubmitting}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject" className={styles.label}>
                Subject <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="What is this regarding?"
                disabled={isSubmitting}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className={styles.textarea}
                placeholder="Tell us more about your shipment or query..."
                disabled={isSubmitting}
              />
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>Sending...</>
              ) : (
                <>
                  Submit <Send size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column - Contact Info */}
        <div className={styles.infoColumn}>
          <div className={styles.infoCard}>
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <Mail size={22} />
              </div>
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Email</span>
                <a href="mailto:enquiries@mercury.co.zm" className={styles.infoValue}>
                  enquiries@mercury.co.zm
                </a>
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <Phone size={22} />
              </div>
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Phone</span>
                <a href="tel:+260971269390" className={styles.infoValue}>
                  +260 971 269 390
                </a>
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <MapPin size={22} />
              </div>
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Address</span>
                <span className={styles.infoValue}>
                  Plot 6392 Dundudza Chididza Road<br />
                  Longacres, Lusaka, Zambia
                </span>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className={styles.mapPlaceholder}>
            <iframe
              title="Mercury Express Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3846.8074485618!2d28.3227!3d-15.3875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19408b3c9c9c9c9c%3A0x9c9c9c9c9c9c9c9c!2sLongacres%2C%20Lusaka!5e0!3m2!1sen!2szm!4v1620000000000!5m2!1sen!2szm"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className={styles.map}
            />
          </div>
        </div>
      </div>
    </section>
  );
};