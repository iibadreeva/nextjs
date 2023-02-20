import Head from 'next/head';

import { Htag } from '@/components';
import { withLayout } from '@/layout/Layout';

export function Error404() {
  return <Htag tag="h1">Ошибка 404</Htag>;
}

function Error() {
  return (
    <>
      <Head>
        <title>OWL top</title>
      </Head>
      <main>
        <Error404 />
      </main>
    </>
  );
}

export default withLayout(Error);
