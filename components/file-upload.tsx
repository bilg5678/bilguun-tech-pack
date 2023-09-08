import { useCallback, useState } from "react";

type Props = {
  value: any;
  onChange: (value?: any) => void;
};

export const FileUpload = (_props: Props) => {
  const [image, setImage] = useState<{
    file: File;
    url: string;
  }>();
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget && e.currentTarget?.files?.length) {
      const file = e.currentTarget.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(e?.currentTarget?.files[0]);
      reader.onload = (event) => {
        setImage({ url: event?.target?.result as string, file });
      };
    }
  }, []);

  return (
    <div>
      <img src={image?.url} className="w-24 h-24" />
      <input type="file" onChange={onChange} />
    </div>
  );
};
