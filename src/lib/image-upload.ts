import { getSignedUrlAction } from "@/app/actions/image-upload.actions";
import axios from "axios";
import { toast } from "sonner";

const onUpload = (file: File, community_name: string, user_name: string) => {
  console.log("Starting upload process...");
  const promise = getSignedUrlAction({
    filename: file.name,
    size: file.size,
    type: file.type,
    community_name: community_name,
    user_name: user_name,
  });

  return new Promise((resolve, reject) => {
    toast.promise(
      promise.then(async (result) => {
        console.log("Received signed URL action result:", result);
        const [response, error] = result;
        if (error) throw new Error(error.message);

        const { imageUrl, presignedUrl } = response;
        console.log("Uploading image to presigned URL...");
        const img = await axios
          .put(presignedUrl, file, {
            headers: {
              "Content-Type": file.type,
            },
          })
          .catch((e) => {
            console.error("Error uploading image:", e);
            throw new Error("Error uploading image. Please try again.");
          });

        console.log("Image uploaded successfully:", img);
        const image = new Image();
        image.src = imageUrl;
        image.onload = () => {
          resolve(imageUrl);
        };
      }),
      {
        loading: "Uploading image...",
        success: "Image uploaded successfully.",
        error: (e) => {
          console.error("Error in toast promise:", e);
          reject(e);
          return e.message;
        },
      }
    );
  });
};

export default onUpload;
