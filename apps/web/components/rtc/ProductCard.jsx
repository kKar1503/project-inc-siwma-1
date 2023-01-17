const ProductCard = () => (
  <div className="card rounded-lg bg-base-100 shadow-xl h-60 md:h-80 overflow-y-auto">
    <figure>
      <img
        src="https://rvndpcxlgtqfvrxhahnm.supabase.co/storage/v1/object/public/listing-image-bucket/a51a3ef0-8c1d-11ed-a1eb-0242ac120002"
        alt="Shoes"
      />
    </figure>
    <div className="card-body p-4 md:p-6">
      <h2 className="card-title text-sm md:text-base lg:text-lg">Aluminium I-Beams</h2>
      <h6 className="font-bold text-md">Description</h6>
      <p className="text-sm">
        Aluminium Universal Beam, also known as, Aluminium I-Beam is an extruded aluminium bar
        formed in the shape of “I” that is used to distribute weight of walls and floors above an
        opening. Aluminium I-beams are commonly used for structural and highly stressed
        applications, where lightweight and corrosion resistance is a priority, such as bridges,
        overhead support, construction, civil engineering and other heavy machinery. Aluminium
        I-beam is mostly used to support heavy structures due to its capability to withstand heavy
        loads, primarily by resisting against bending.
      </p>
    </div>
  </div>
);

export default ProductCard;
