import { useDarkMode } from './hooks';
import StatCard from './components/shared/StatCard';
import DataTable from './components/shared/DataTable';
import type { ColumnDef } from './components/shared/DataTable';

interface SampleRow {
  id: string;
  name: string;
}

const columns: ColumnDef<SampleRow>[] = [
  { key: 'name', header: 'Name', cell: (row) => row.name },
];

function App() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle dark mode (currently {darkMode ? 'on' : 'off'})
      </button>

      <div style={{ display: 'flex', gap: 16 }}>
        <StatCard label="Sample Metric" value={42} color="blue" />
        <StatCard label="Another Metric" value="1,204" color="green" />
      </div>

      <DataTable
        columns={columns}
        rows={[]}
        rowKey={(row) => row.id}
      />
    </div>
  );
}

export default App;
