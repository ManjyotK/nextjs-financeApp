// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
import {SVGProps} from "react";


export type boredapi = {
  activity: string;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
  accessibility: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type TransactionFormat = {
  id: number;
  description: string;
  amount: number;
  date: string;
  categoryId: number;
  userId: number;
};

export type CategorySum = {
  sum: number;
  categoryId: number;
  name: string;
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

