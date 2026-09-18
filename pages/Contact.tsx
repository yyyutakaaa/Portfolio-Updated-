import React from 'react';
import InkContact from '../components/ink/InkContact';

/** The same contact section that closes the home page, given a page of its own. */
const Contact: React.FC = () => (
  <div className="ink-page">
    <InkContact asPage />
  </div>
);

export default Contact;
