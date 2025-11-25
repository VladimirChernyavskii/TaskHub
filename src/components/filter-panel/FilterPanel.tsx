import { Button } from 'src/ui/button/Button';

import styles from './FilterPanel.module.scss';

type FilterPanelProps = {
  filter: 'all' | 'active' | 'completed';
  filterChange: (filter: 'all' | 'active' | 'completed') => void;
};

export const FilterPanel = ({ filterChange, filter }: FilterPanelProps) => {
  return (
    <section className={styles.container}>
      <Button
        title='Все'
        type='secondary'
        active={filter === 'all'}
        onClick={() => filterChange('all')}
      />
      <Button
        title='Активные'
        type='secondary'
        active={filter === 'active'}
        onClick={() => filterChange('active')}
      />
      <Button
        title='Завершенные'
        type='secondary'
        active={filter === 'completed'}
        onClick={() => filterChange('completed')}
      />
    </section>
  );
};
