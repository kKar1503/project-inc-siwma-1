import useListingsData from '../../../hooks/useListingsData';
import Carousel from '../carousel/Carousel';
import ProductListingItem from '../listing/ProductListingItem';

const MarketplaceRecommendedSection = () => {
  const { listingData, listingStatus, listingIsLoading, listingError } = useListingsData(0, 60);

  return (
    listingData &&
    listingData.length > 0 && (
      <section className="mb-10">
        {/* Title */}
        <h3 className="text-xl font-bold my-2">Recommended</h3>

        {/* Carousel of products */}
        <Carousel name="popular-recommended" wrapperClassName="my-3" itemsToMoveBy={3}>
          {listingData.map(
            ({
              name,
              imageUrl,
              id,
              listing_type: type,
              price,
              negotiable,
              unit_price: unitPrice,
            }) => (
              <ProductListingItem
                className="w-[200px] hover:shadow-lg"
                type={type}
                negotiable={negotiable}
                key={id}
                price={price}
                img={imageUrl}
                name={name}
                rating={4.5}
                unit_price={unitPrice}
                href={`/product/${id}`}
              />
            )
          )}
        </Carousel>
      </section>
    )
  );
};

export default MarketplaceRecommendedSection;
