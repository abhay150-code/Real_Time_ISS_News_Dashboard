import React from 'react';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Layout>
        <Dashboard />
      </Layout>
      <Toaster position="bottom-left" toastOptions={{ className: 'dark:bg-slate-800 dark:text-white' }} />
    </>
  );
}

export default App;
