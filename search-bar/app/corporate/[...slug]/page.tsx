'use client';

import { CorporateTable, Search } from '@/components';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';

async function updateCorporates(url: string, { arg }: { arg: string }) {
  return axios.get(url + arg).then((res) => res.data);
}

export default function Corporate() {
  const { slug } = useParams();
  const code = slug[0];

  const { trigger, data } = useSWRMutation(
    '/api/search/corporate?code=',
    updateCorporates
  );
  const corporate = data && data[0];

  useEffect(() => {
    if (code) {
      trigger(`${code}`);
    }
  }, [trigger, code]);

  return (
    <section>
      <Search />

      <CorporateTable corporate={corporate} />
    </section>
  );
}
