'use client';

import { useSession } from 'next-auth/react';

const Dashboard: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Carregando...</p>;
  }

  if (!session) {
    return <p>Você não está logado.</p>;
  }

  console.log(session);
  return <div>Olá, Dashboard!</div>;
};

export default Dashboard;
