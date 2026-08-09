import { FaGithub, FaLinkedin, FaCode } from 'react-icons/fa';
import { site } from '../../data/content';
import styles from './Footer.module.css';

const socials = [
  { href: site.github, label: 'GitHub', icon: FaGithub },
  { href: site.linkedin, label: 'LinkedIn', icon: FaLinkedin },
  { href: site.codechef, label: 'CodeChef', icon: FaCode },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <a href="#home" className={styles.brand}>
          <span className={styles.mark}>{site.brand.charAt(0)}</span>
          <span>{site.brand}</span>
        </a>

        <p className={styles.copy}>
          © {year} {site.name}
        </p>

        <div className={styles.socials}>
          {socials.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
