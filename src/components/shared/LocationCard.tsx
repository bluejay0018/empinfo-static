import React from 'react';
import type { Location } from '../../types';
import styles from './LocationCard.module.css';

interface LocationCardProps {
  location: Location;
  title: string;
  badge?: string;
}

const LocationCard = ({ location, title, badge }: LocationCardProps) => (
  <div className={styles.locationCard}>
    <div className={styles.locationHeader}>
      <h3>{title}</h3>
      {badge && <span className={styles.locationBadge}>{badge}</span>}
    </div>
    <div className={styles.locationDetails}>
      <div className={styles.locationAddress}>
        {location.address}<br />
        {location.city}, {location.state} {location.zipCode}<br />
        {location.country}
      </div>
      <div className={styles.locationMeta}>
        <span className={styles.locationMetaLabel}>Employees:</span>
        <span className={styles.locationMetaValue}>{location.employeeCount}</span>
      </div>
    </div>
  </div>
);

export default React.memo(LocationCard);
