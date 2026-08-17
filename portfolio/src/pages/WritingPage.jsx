import React from 'react';
import { useTranslation } from 'react-i18next';
import CaseStudies from '../components/sections/CaseStudies';

export default function WritingPage() {
  const { t } = useTranslation();
  return (
    <div className="pt-14">
      <CaseStudies headingTop={t('writing.headingTopFull')} headingBottom={t('writing.headingBottomFull')} />
    </div>
  );
}
