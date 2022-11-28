import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const Listing = () => {
  const { query, isReady } = useRouter();

  const client = useSupabaseClient();

  const [listing, setListing] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [carouselImages, setCarouselImages] = React.useState([]);

  return (
    <main>
      <h1>query.id</h1>
    </main>
  );
};

export default Listing;
