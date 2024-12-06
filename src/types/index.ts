import { ReactNode, SVGProps } from "react";

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

export type TRoute = {
  path: string;
  element: ReactNode;
};
export type TSidebarItem =
  | {
      key: string;
      label: ReactNode;
      children?: TSidebarItem[];
    }
  | undefined;

export type TUserPath = {
  name?: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPath[];
};
