import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiMail, FiSend } from 'react-icons/fi';
import { site } from '../../data/content';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import SectionHeader from '../SectionHeader/SectionHeader';
import styles from './Contact.module.css';

const INITIAL = { name: '', email: '', message: '' };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!values.message.trim()) {
    errors.message = 'Please write a short message.';
  } else if (values.message.trim().length < 10) {
    errors.message = 'Message should be at least 10 characters.';
  }
  return errors;
}

export default function Contact() {
  const reducedMotion = usePrefersReducedMotion();
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setStatus({ type: '', message: '' });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus({ type: 'error', message: 'Please fix the highlighted fields.' });
      return;
    }

    setSubmitting(true);
    try {
      const subject = encodeURIComponent(`Portfolio message from ${values.name.trim()}`);
      const body = encodeURIComponent(
        `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`,
      );
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus({
        type: 'success',
        message: 'Thanks! Your email client should open with the message ready to send.',
      });
      setValues(INITIAL);
    } catch {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please email me directly instead.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <div className="container">
        <SectionHeader
          eyebrow="Contact"
          title="LET'S BUILD SOMETHING TOGETHER."
          subtitle="Have a role, project, or collaboration in mind? Send a note."
        />

        <div className={styles.layout}>
          <motion.div
            className={`glass-card ${styles.details}`}
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className={styles.detailsTitle}>Get in touch</h3>
            <p className={styles.detailsLead}>
              Prefer email or social? Reach out through any of these channels.
            </p>

            <a href={`mailto:${site.email}`} className={styles.detail}>
              <FiMail aria-hidden="true" />
              <span>{site.email}</span>
            </a>
            <a
              href={site.github}
              className={styles.detail}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub aria-hidden="true" />
              <span>GitHub</span>
            </a>
            <a
              href={site.linkedin}
              className={styles.detail}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
          </motion.div>

          <motion.form
            className={`glass-card ${styles.form}`}
            onSubmit={onSubmit}
            noValidate
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {['name', 'email', 'message'].map((field) => {
              const isTextarea = field === 'message';
              const label = field.charAt(0).toUpperCase() + field.slice(1);
              const Field = isTextarea ? 'textarea' : 'input';
              return (
                <motion.label
                  key={field}
                  className={`${styles.field} ${focused === field ? styles.fieldFocused : ''} ${errors[field] ? styles.fieldError : ''}`}
                  animate={
                    reducedMotion
                      ? undefined
                      : focused === field
                        ? { scale: 1.01 }
                        : { scale: 1 }
                  }
                  transition={{ duration: 0.2 }}
                >
                  <span>{label}</span>
                  <Field
                    name={field}
                    value={values[field]}
                    onChange={onChange}
                    onFocus={() => setFocused(field)}
                    onBlur={() => setFocused('')}
                    {...(isTextarea
                      ? { rows: 5, placeholder: 'Tell me about the opportunity or idea…' }
                      : {
                          type: field === 'email' ? 'email' : 'text',
                          placeholder: field === 'email' ? 'you@example.com' : 'Your name',
                          autoComplete: field === 'email' ? 'email' : 'name',
                        })}
                    aria-invalid={Boolean(errors[field])}
                    aria-describedby={errors[field] ? `${field}-error` : undefined}
                  />
                  {errors[field] ? (
                    <em id={`${field}-error`} className={styles.error}>
                      {errors[field]}
                    </em>
                  ) : null}
                </motion.label>
              );
            })}

            <button type="submit" className="btn btn--primary btn--full" disabled={submitting}>
              <FiSend aria-hidden="true" />
              {submitting ? 'Preparing…' : 'Send Message'}
            </button>

            {status.message ? (
              <p
                className={`${styles.status} ${status.type === 'success' ? styles.success : styles.fail}`}
                role="status"
              >
                {status.message}
              </p>
            ) : null}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
