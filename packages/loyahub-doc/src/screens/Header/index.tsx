import Heading from '@theme/Heading';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './header.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useHistory } from '@docusaurus/router'; // Import necessário
import { useCallback } from 'react';

export function HomepageHeader() {
  const { siteConfig, i18n } = useDocusaurusContext();
  const history = useHistory(); 

  const toggleLocale = useCallback(() => {
    const newLocale = i18n.currentLocale === 'en' ? 'pt' : 'en';
    const pathWithoutLocale = history.location.pathname.replace(`/${i18n.currentLocale}`, '');
    history.push(`/${newLocale}${pathWithoutLocale}`);
  }, [i18n, history]);

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
          <button
            className="button button--outline button--lg"
            style={{ marginLeft: '10px' }}
            onClick={toggleLocale}
          >
            {i18n.currentLocale === 'en' ? 'Português' : 'English'}
          </button>
        </div>
      </div>
    </header>
  );
}
