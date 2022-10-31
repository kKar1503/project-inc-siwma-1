import Head from 'next/head';
import CardBackground from '../components/CardBackground';

const buySellListing = () => (
  <>
    <Head>
      <title>Buy Sell Listing</title>
    </Head>

    <main>
      {/* temp navbar */}
      <div className="navbar bg-slate-700">
        <button className="btn btn-ghost normal-case text-xl bg-slate-200 rounded-2xl">
          SIWMA
        </button>
      </div>

      <div className="flex justify-center mt-8 gap-40">
        <div className="flex flex-col">
          <CardBackground />
        </div>
        <div className="flex flex-col">
          <CardBackground />
        </div>
      </div>
    </main>
  </>
);

export default buySellListing;
