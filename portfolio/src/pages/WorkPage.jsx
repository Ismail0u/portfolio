import React from 'react';
import { useTranslation } from 'react-i18next';
import Projects from '../components/sections/Projects';

export default function WorkPage() {
  const { t } = useTranslation();
  return (
    <div className="pt-14">
      <Projects headingTop={t('projects.headingTopFull')} headingBottom={t('projects.headingBottomFull')} />
    </div>
  );
}
