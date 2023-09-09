import {
  Avatar as AvatarShadCn,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
type Props = {
  thumbnail: string;
};
export const Avatar = ({ thumbnail }: Props) => {
  return (
    <AvatarShadCn>
      <AvatarImage
        src={thumbnail || "https://github.com/shadcn.png"}
        alt="@shadcn"
      />
      <AvatarFallback>CN</AvatarFallback>
    </AvatarShadCn>
  );
};
