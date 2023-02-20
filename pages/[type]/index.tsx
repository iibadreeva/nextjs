import { useState } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import axios from 'axios';

import { withLayout } from '@/layout/Layout';
import { FirstLevelMenuItem, MenuItem } from '@/interfaces/menu.interface';
import { firstLevelMenu } from '@/helpers/helpers';
import { ParsedUrlQuery } from 'querystring';
import { API } from '@/helpers/api';

// lesson 75
function Type({ firstCategory }: TypeProps) {
  const [rating, setRating] = useState<number>(4);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link key={1} rel="icon" href="/favicon.ico" />
      </Head>
      <main>Type {firstCategory}</main>
    </>
  );
}

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map((m) => '/' + m.route),
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({
  params
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true
    };
  }
  const firstCategoryItem = firstLevelMenu.find((r) => r.route === params.type);
  if (!firstCategoryItem) {
    return {
      notFound: true
    };
  }
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory: firstCategoryItem.id
  });
  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id
    }
  };
};

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}