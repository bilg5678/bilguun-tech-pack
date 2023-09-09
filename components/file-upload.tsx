import { useCallback, useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import Image from "next/image";

type Props = {
  value: any;
  onChange: (value?: any) => void;
};

export const FileUpload = (props: Props) => {
  const [image, setImage] = useState<{
    file?: File;
    url: string;
  }>();

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = acceptedFiles[0];
    setImage({ url: URL.createObjectURL(file) as string, file });
    props.onChange(file);
  }, []);

  const onSubmit = async () => {
    console.log("upload");
  };

  const { getRootProps, getInputProps, acceptedFiles, open } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".png"],
    },
    onDrop,
    noClick: true,
    noKeyboard: true,
  });
  if (props.value) {
    return (
      <div className="relative h-48 w-80">
        <Image
          src={image?.url || ""}
          alt="Upload"
          fill
          className="rounded-md absolute top-0 left-0 w-24 h-24"
        />
        <button
          onClick={() => props.onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="w-4 h-4" />
        </button>
        <Button
          type="button"
          onClick={onSubmit}
          className="absolute bottom-4 left-24"
        >
          Зураг явуулах
        </Button>
      </div>
    );
  }
  return (
    <section className={`container`}>
      <div
        {...getRootProps({
          className:
            "dropzone  border-[1px] border-dashed w-80 h-48 rounded-md flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        <UploadCloud className="w-8 h-8" />
        <p className="font-bold">Та дарж зургаа сонгон уу</p>
        <Button type="button" onClick={open}>
          Зураг сонгох
        </Button>
      </div>
    </section>
  );
};
