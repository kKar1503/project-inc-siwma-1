import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import CardBackground from '../components/CardBackground';
import Input from '../components/Input';
import RightSide from './rightSide';

const BuySellListing = () => {
  const [selectedImage, setSelectedImage] = React.useState(null);

  return (
    <>
      <Head>
        <title>Buy Sell Listing</title>
      </Head>

      <main>
        {/* temp navbar */}
        <div className="navbar bg-secondary">
          <button className="btn btn-ghost normal-case text-xl bg-slate-200 rounded-2xl">
            SIWMA
          </button>
        </div>

        <div className="flex justify-around mt-8">
          <div className="flex space-y-6 flex-col">
            <CardBackground>
              <label className="flex justify-center w-full h-40 px-4 transition bg-white border-2 border-accent border-dashed rounded-md appearance-none cursor-pointer hover:border-accent-focus focus:outline-none">
                <span className="items-center space-x-4">
                  <div className="btn btn-ghost normal-case text-xl rounded-2xl bg-accent hover:bg-accent-focus">
                    Upload Image
                  </div>
                  <span className="text-xs text-gray-600 text-center my-6">
                    or drag it into this box
                  </span>
                </span>
                <input
                  type="file"
                  className="hidden"
                  onClick={(e) => {
                    setSelectedImage(e.target.files[0]);
                  }}
                  accept="image/*"
                />
              </label>
              {selectedImage && (
                <div className="relative">
                  <Image
                    alt="image not found"
                    src={URL.createObjectURL(selectedImage)}
                    fill
                    sizes="100%"
                    className="object-contain"
                  />
                  <button onClick={() => setSelectedImage(null)}>Remove</button>
                </div>
              )}
            </CardBackground>
            <CardBackground>
              <h1 className="font-bold text-3xl">Dimensions</h1>
              <Input text="Width" />
              <Input text="Height" />
            </CardBackground>
          </div>
          <div className="flex flex-col">
            <CardBackground>
              <RightSide />
            </CardBackground>
          </div>
        </div>
      </main>
    </>
  );
};

export default BuySellListing;
