declare type ListingType = 1 | 2;
declare type ListingParam = {
  id: number;
} & (
  | {
      datatype: 1;
      value: string;
    }
  | {
      datatype: 2;
      value: number;
    }
  | {
      datatype: 3;
      value: boolean;
    }
);
interface ListingDetails {
  id: number;
  name: string;
  description: string;
  price: number;
  unit_price: boolean;
  negotiable: boolean;
  category: number;
  type: ListingType;
  params: ListingParam[];
}
declare const useCopy: (listingId: number) => [listing: ListingDetails | null, error: Error | null];
export default useCopy;
