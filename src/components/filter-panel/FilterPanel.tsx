import { Button } from 'src/ui/button/Button';

import styles from './FilterPanel.module.scss';

type FilterPanelProps = {
  filterChange: (filter: 'all' | 'active' | 'completed') => void;
};

export const FilterPanel = ({filterChange }: FilterPanelProps) => {
  return (
    <section className={styles.container}>
      <Button
        title='Все'
        type='secondary'
        onClick={() => filterChange('all')}
      />
      <Button
        title='Активные'
        type='secondary'
        onClick={() => filterChange('active')}
      />
      <Button
        title='Завершенные'
        type='secondary'
        onClick={() => filterChange('completed')}
      />
    </section>
  );
};
