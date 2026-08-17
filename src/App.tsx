import { useState } from 'react';
import { useDarkMode, useSidebarCollapsed } from './hooks';
import Sidebar from './components/layout/Sidebar';
import type { ViewId } from './components/layout/Sidebar';
import Header from './components/layout/Header';
import ReportsPage from './pages/Reports/ReportsPage';
import EmptyState from './components/shared/EmptyState';
import styles from './App.module.css';

const VIEW_LABELS: Record<Exclude<ViewId, 'reports'>, string> = {
  dashboard: 'Dashboard',
  employees: 'Employees',
  messages: 'Messages',
  settings: 'Settings',
};

function App() {
  const [darkMode, setDarkMode] = useDarkMode();
  const [collapsed, setCollapsed] = useSidebarCollapsed();
  const [activeView, setActiveView] = useState<ViewId>('reports');

  return (
    <div className={styles.shell}>
      <Sidebar
        activeView={activeView}
        onNavigate={setActiveView}
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed(c => !c)}
      />
      <div className={styles.main}>
        <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode(d => !d)} />
        <div className={styles.content}>
          {activeView === 'reports' ? (
            <ReportsPage />
          ) : (
            <div className={styles.comingSoon}>
              <EmptyState title={`${VIEW_LABELS[activeView]} coming soon`} hint="This section hasn't been built yet." />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
