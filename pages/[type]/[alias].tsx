import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Head from 'next/head';
import axios from 'axios';

import { withLayout } from '@/layout/Layout';
import { MenuItem } from '@/interfaces/menu.interface';
import { TopLevelCategory, TopPageModel } from '@/interfaces/toppage.interface';
import { ProductModel } from '@/interfaces/product.interface';
import { firstLevelMenu } from '@/helpers/helpers';
import { TopPageComponent } from '@/page-components';
import { API } from '@/helpers/api';
import { Error404 } from '@/pages/404';

function TopPage({ firstCategory, page, products }: TopPageProps) {
  if (!page || !products) {
    return <Error404 />;
  }
  return (
    <>
      <Head>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <meta property="og:title" content={page.metaTitle} />
        <meta property="og:description" content={page.metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link key={1} rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <TopPageComponent
          firstCategory={firstCategory}
          page={page}
          products={products}
        />
      </main>
    </>
  );
}

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];
  for (const m of firstLevelMenu) {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: m.id
    });
    paths = paths.concat(
      menu.flatMap((r) => r.pages.map((p) => `/${m.route}/${p.alias}`))
    );
  }

  // console.log('--', paths); // не в браузере
  return {
    // paths: menu.flatMap((r) => r.pages.map((p) => '/courses/' + p.alias)),
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({
  params
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true
    };
  }
  // const firstCategory = 0;
  const firstCategoryItem = firstLevelMenu.find((r) => r.route === params.type);
  if (!firstCategoryItem) {
    return {
      notFound: true
    };
  }
  try {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: firstCategoryItem.id
    });
    const { data: page } = await axios.get<TopPageModel>(
      API.topPage.byAlias + params.alias
    );
    const { data: products } = await axios.post<ProductModel[]>(
      API.product.find,
      { category: page.category, limit: 10 }
    );
    if (menu.length === 0 || !products) {
      return {
        notFound: true
      };
    }
    return {
      props: {
        menu,
        firstCategory: firstCategoryItem.id,
        page,
        products
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};

interface TopPageProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}
