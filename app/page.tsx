import Layout from '@/components/layout/layout';
import React from 'react';

function Home() {
  return (
    <Layout>
      <div className="page-container">
        <section className='bg-gray-700 h-screen flex items-center justify-center text-white text-2xl'>
          Welcome to D-Admin
        </section>
      </div>
    </Layout>
  );
}

export default Home;