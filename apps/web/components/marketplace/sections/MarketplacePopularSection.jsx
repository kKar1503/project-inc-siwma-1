import useListingsData from '../../../hooks/useListingsData';
import ProductListingItemSkeleton from '../../skeleton/ProductListingItemSkeleton';
import Carousel from '../carousel/Carousel';
import ProductListingItem from '../listing/ProductListingItem';

const MarketplacePopularSection = () => {
  const { listingData, listingStatus, listingIsLoading, listingError } = useListingsData(0, 60);

  if (listingIsLoading) {
    return (
      <section className="mb-10">
        {/* Title */}
        <h3 className="text-xl font-bold my-2">Popular</h3>

        <Carousel name="popular-products-loading" showButtons={false} wrapperClassName="my-3">
          {[...Array(10)].map((_, i) => (
            <ProductListingItemSkeleton className="w-[200px] hover:shadow-lg" key={i} />
          ))}
        </Carousel>
      </section>
    );
  }

  return (
    <section className="mb-10">
      {/* Title */}
      <h3 className="text-xl font-bold my-2">Popular</h3>

      {listingError && <div className="text-red-500">There was an error loading the listings.</div>}

      {/* Carousel of products */}
      {listingData && listingData.length > 0 && (
        <Carousel name="popular-products" wrapperClassName="my-3" itemsToMoveBy={3}>
          {listingData.map(
            ({
              name,
              imageUrl,
              id,
              listing_type: type,
              price,
              negotiable,
              created_at: createdAt,
              owner: ownerId,
              fullname: ownerFullName,
              unit_price: unitPrice,
              company_name: companyName,
            }) => (
              <ProductListingItem
                className="w-[200px] hover:shadow-lg"
                companyName={companyName}
                type={type}
                negotiable={negotiable}
                key={id}
                price={price}
                img={imageUrl}
                name={name}
                rating={4.5}
                ownerId={ownerId}
                ownerFullName={ownerFullName}
                createdAt={createdAt}
                unit_price={unitPrice}
                href={`/product/${id}`}
              />
            )
          )}
        </Carousel>
      )}
    </section>
  );
};

export default MarketplacePopularSection;
