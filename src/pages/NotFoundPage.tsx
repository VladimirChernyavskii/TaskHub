import { Link } from 'react-router-dom';
import styles from '../styles/NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <main className={styles.container}>
      <h1>404</h1>
      <p>Страница не найдена.</p>
      <Link to="/">Вернуться на главную</Link>
    </main>
  );
};
