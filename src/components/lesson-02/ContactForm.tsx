import React, { useState } from 'react';

interface ContactFormProps {
  onSubmit?: (data: FormData) => Promise<void>;
  initialData?: Partial<FormData>;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  newsletter: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<FormData>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    subject: initialData?.subject || '',
    message: initialData?.message || '',
    newsletter: initialData?.newsletter || false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      setSubmitStatus('success');
      
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        newsletter: false
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      newsletter: false
    });
    setErrors({});
    setSubmitStatus('idle');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="contact-form"
      data-testid="contact-form"
      aria-label="Contact form"
    >
      <h2>Contact Us</h2>
      
      {submitStatus === 'success' && (
        <div 
          className="alert alert-success" 
          role="alert"
          data-testid="success-message"
        >
          Thank you! Your message has been sent successfully.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div 
          className="alert alert-error" 
          role="alert"
          data-testid="error-message"
        >
          Sorry, there was an error sending your message. Please try again.
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={errors.name ? 'error' : ''}
          aria-describedby={errors.name ? 'name-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.name && (
          <span 
            id="name-error" 
            className="error-message" 
            role="alert"
            data-testid="name-error"
          >
            {errors.name}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={errors.email ? 'error' : ''}
          aria-describedby={errors.email ? 'email-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.email && (
          <span 
            id="email-error" 
            className="error-message" 
            role="alert"
            data-testid="email-error"
          >
            {errors.email}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="subject">Subject *</label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          className={errors.subject ? 'error' : ''}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          disabled={isSubmitting}
        >
          <option value="">Please select a subject</option>
          <option value="general">General Inquiry</option>
          <option value="support">Technical Support</option>
          <option value="billing">Billing Question</option>
          <option value="feedback">Feedback</option>
        </select>
        {errors.subject && (
          <span 
            id="subject-error" 
            className="error-message" 
            role="alert"
            data-testid="subject-error"
          >
            {errors.subject}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={5}
          className={errors.message ? 'error' : ''}
          aria-describedby={errors.message ? 'message-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.message && (
          <span 
            id="message-error" 
            className="error-message" 
            role="alert"
            data-testid="message-error"
          >
            {errors.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleInputChange}
            disabled={isSubmitting}
          />
          Subscribe to our newsletter
        </label>
      </div>

      <div className="form-actions">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary"
          aria-describedby="submit-help"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
        
        <button
          type="button"
          onClick={handleReset}
          disabled={isSubmitting}
          className="btn btn-secondary"
        >
          Reset
        </button>
      </div>
      
      <p id="submit-help" className="help-text">
        * Required fields
      </p>
    </form>
  );
};

export default ContactForm; 