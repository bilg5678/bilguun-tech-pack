import { PresignedUrlParam } from "@/typing";
import axios from "axios";

export const getPreSignedUrl = async (data: PresignedUrlParam) => {
  try {
    const res = await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_AWS_BASE_URL}/getPreSignedUrl`,
      data: data,
    });
    return res.data.data;
  } catch (err) {}
};

export const uploadFile = async (data: PresignedUrlParam, file: File) => {
  try {
    const presignedUrl = await getPreSignedUrl(data);
    await axios({
      method: "put",
      url: presignedUrl,
      data: file,
      headers: {
        "Content-Type": file.type,
      },
    });
    return true;
  } catch (err) {
    return;
  }
};
