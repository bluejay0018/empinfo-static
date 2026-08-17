import React from 'react';
import type { Contact } from '../../types';
import styles from './ContactCard.module.css';

interface ContactCardProps {
  contact: Contact;
  title: string;
  badge?: string;
}

const ContactCard = ({ contact, title, badge }: ContactCardProps) => (
  <div className={styles.contactCard}>
    <div className={styles.contactHeader}>
      <h3>{title}</h3>
      {badge && <span className={styles.contactBadge}>{badge}</span>}
    </div>
    <div className={styles.contactDetails}>
      <div className={styles.contactName}>{contact.name}</div>
      <div className={styles.contactTitle}>{contact.title}</div>
      <div className={styles.contactInfo}>
        <a href={`mailto:${contact.email}`} className={styles.contactLink}>
          {contact.email}
        </a>
      </div>
      <div className={styles.contactInfo}>
        <a href={`tel:${contact.phone}`} className={styles.contactLink}>
          {contact.phone}
        </a>
      </div>
      <div className={styles.contactMeta}>
        Preferred: <span>{contact.preferredMethod}</span>
      </div>
    </div>
  </div>
);

export default React.memo(ContactCard);
