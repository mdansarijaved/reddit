import { X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import onUpload from "@/lib/image-upload";

type filetype = {
  file: FileList;
};

function ImageUpload({
  setImagesUrl,
  ImagesUrl,
  ShowImageContainer,
}: {
  ShowImageContainer: boolean;
  setImagesUrl: (value: string[]) => void;
  ImagesUrl: string[];
}) {
  const [Images, setImages] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<filetype>();
  const removeImage = (index: number) => {
    const newImages = Images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handlePaste = async (data: filetype) => {
    try {
      const file = data.file[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImages([...Images, reader.result as string]);
      };
      reader.readAsDataURL(file);

      const url = await onUpload(data.file[0]);
      setImagesUrl([...ImagesUrl, url as string]);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <div className={`${ShowImageContainer ? "flex flex-col " : "hidden"} `}>
      <div className="flex justify-center items-center pr-3 py-3">
        <Input
          type="file"
          {...register("file")}
          className="bg-transparent outline-none file:text-white border-none"
        />
        <button
          onClick={handleSubmit(handlePaste)}
          className="py-1 px-3 bg-green-900 rounded"
        >
          add
        </button>
      </div>
      <div className="flex justify-center items-center gap-4 flex-wrap py-2">
        {Images.map((image, index) => (
          <div key={index} className="w-fit h-fit relative">
            <span
              className="absolute -top-2 -right-2 bg-black/70 rounded-full"
              onClick={() => removeImage(index)}
            >
              <X size={16} />
            </span>
            {isSubmitting && (
              <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center">
                <p className="text-white">Uploading...</p>
              </div>
            )}
            <Image
              src={image}
              alt="image"
              width={100}
              height={100}
              className="w-20 h-20 bg-cover bg-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUpload;
