import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TCategory = {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
