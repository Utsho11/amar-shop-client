import { ReactNode, SVGProps } from "react";
import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

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

export type TProduct = {
  id?: string;
  shopId?: string;
  name?: string;
  description?: string;
  price?: string;
  categoryId?: string;
  discount?: string;
  inventoryCount?: number;
  imageUrls?: string[];
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type TUsers = {
  id: string;
  role: string;
  email: string;
  password: string;
  needPasswordChange: boolean;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
