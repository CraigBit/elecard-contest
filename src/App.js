import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { CardView } from './views/CardView';
import { TreeView } from './views/TreeView';

function App() {
  const [view, setView] = useState(null);

  return (
    <Layout setView={setView} view={view}>
      {view !== 'tree' ? <CardView /> : <TreeView />}
    </Layout>
  );
}

export default App;
