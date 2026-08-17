import React from 'react';
import { useTranslation } from 'react-i18next';
import Timeline from '../components/sections/Timeline';

export default function ExperiencePage() {
  const { t } = useTranslation();
  return (
    <div className="pt-14">
      <Timeline headingTop={t('timeline.headingTopFull')} headingBottom={t('timeline.headingBottomFull')} />
    </div>
  );
}
