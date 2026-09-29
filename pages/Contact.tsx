import React from 'react';
import ContactPanel from '../components/site/ContactPanel';
import ContactForm from '../components/site/ContactForm';

/** The closing screen of the home page, with the message form added. */
const Contact: React.FC = () => (
  <ContactPanel number="01" asPage>
    <div style={{ marginTop: 'clamp(36px, 5vw, 64px)' }}>
      <ContactForm />
    </div>
  </ContactPanel>
);

export default Contact;
