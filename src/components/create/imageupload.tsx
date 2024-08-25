import { PaperclipIcon, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import onUpload from "@/lib/image-upload";

type filetype = {
  file: FileList;
};

function ImageUpload({
  setImagesUrl,
  ImagesUrl,
}: {
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
    <label
      htmlFor="fileinput"
      className="px-3 border-t border-gray-700 flex justify-start py-2 items-center "
    >
      <Input
        id="fileinput"
        type="file"
        {...register("file")}
        className="bg-transparent hidden  outline-none  border-none"
      />
      <button type="button" onClick={handleSubmit(handlePaste)}></button>
      <PaperclipIcon size={18} />
    </label>
  );
}

export default ImageUpload;

{
  /* <div className="flex justify-center items-center gap-4 flex-wrap py-2">
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
</div> */
}
