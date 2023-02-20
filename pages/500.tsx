import Head from 'next/head';

import { Htag } from '@/components';
import { withLayout } from '@/layout/Layout';

function Error500() {
  return (
    <>
      <Head>
        <title>OWL top</title>
      </Head>
      <main>
        <Htag tag="h1">Ошибка 500</Htag>
      </main>
    </>
  );
}

export default withLayout(Error500);
