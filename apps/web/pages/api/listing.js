// ! Please ignore this file, it will be removed in the next release.

// export a handler for the listing API (Next.js)

import Listing from '../../model/listing';

export default async function handler(req, res) {
  //   const listing = await getListing(req.query.id);
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 10;
  // const listing = await Listing.getListings(offset, limit);
  const l = await Listing.getListings(offset, limit);
  return res.json(l);
}
