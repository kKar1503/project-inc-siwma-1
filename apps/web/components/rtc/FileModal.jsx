import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const ImageModal = () => {
  const supabase = useSupabaseClient();
  const [selectedImage, setSelectedImage] = useState();
  const [isImagePicked, setIsImagePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedImage(event.target.files[0]);
    setIsImagePicked(true);
  };

  const handleUpload = async () => {
    try {
      const { data: uploadBucketData, error } = await supabase.storage
        .from('chat-bucket')
        .upload(`images/${selectedImage.name}`, selectedImage, {
          upsert: true,
        });

      if (!error) {
        const { data, error: insertError } = await supabase
          .from('contents')
          .insert([{ image: uploadBucketData.path }]);

        const imageModal = document.querySelector('#image-modal');

        imageModal.style.display = 'none';

        if (insertError) {
          console.log(insertError);
        }
      }
    } catch (err) {
      alert(err);
    }

    // GET all content_id
    const { data: contentId, error: selectErr } = await supabase
      .from('contents')
      .select('content_id');
    if (selectErr) {
      console.log('error', selectErr);
    } else {
      console.log('no error');
    }

    // INSERT content_id into 'messages' table
    // TODO: Change the profile_uuid value to user.id
    const { msg, error: insertMsgErr } = await supabase.from('messages').insert([
      {
        content: contentId[contentId.length - 1].content_id,
        profile_uuid: 'c078a5eb-e75e-4259-8fdf-2dc196f06cbd',
      },
    ]);

    if (insertMsgErr) {
      console.log('error', insertMsgErr);
    } else {
      console.log('no error');
    }
  };

  return (
    <div className="modal" id="image-modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Image Upload</h3>
        <div className="border-dashed border-2 rounded-md border-sky-500 relative flex justify-center">
          <div className="my-20">
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              className="absolute left-0 right-0 top-0 bottom-0 opacity-0"
              onChange={changeHandler}
            />
            {isImagePicked ? (
              <h2 className="font-bold">Image has been uploaded</h2>
            ) : (
              <h2 className="font-bold">Click here to upload an image</h2>
            )}
          </div>
        </div>
        <div className="modal-action">
          <button className="btn-primary text-white p-2 rounded-md" onClick={handleUpload}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default ImageModal;