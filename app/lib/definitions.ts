// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
import {SVGProps} from "react";

export const categoryColorMap:{[key: number]: string} = {
  1: 'bg-blue-200',
  2: 'bg-red-300',
  3: 'bg-green-400',
  4: 'bg-yellow-500',
  5: 'bg-purple-400',
  6: 'bg-pink-400',
  7: 'bg-indigo-400',
  8: 'bg-teal-400',
  9: 'bg-orange-100',
  10: 'bg-gray-200',
  11: 'bg-lime-300',
  12: 'bg-cyan-400'
};


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
  category: string;
};

export type CategorySum = {
  sum: number;
  categoryId: number;
  name: string;
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

