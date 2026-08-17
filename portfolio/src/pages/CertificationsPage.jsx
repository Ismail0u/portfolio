import React from 'react';
import { useTranslation } from 'react-i18next';
import Certifications from '../components/sections/Certifications';

export default function CertificationsPage() {
  const { t } = useTranslation();
  return (
    <div className="pt-4">
      <Certifications headingTop={t('certifications.headingTopFull')} headingBottom={t('certifications.headingBottomFull')} />
    </div>
  );
}
