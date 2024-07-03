"use client";
// import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
// import { Transaction } from "@prisma/client";
import { getTransactions } from "../lib/data";
import { TransactionFormat } from "../lib/definitions";

export default async function TransactionTable({
    transactions
}:
{
    transactions:TransactionFormat[]
}) {
    
  const columns = [
    {
      key: "description",
      label: "Description",
    },
    {
      key: "amount",
      label: "Amount",
    },
    {
      key: "date",
      label: "Date",
    },
  ];

  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader>
        {columns.map((column) =>
          <TableColumn key={column.key}>{column.label}</TableColumn>
        )}
      </TableHeader>
      <TableBody>
        {transactions.map((row) =>
          <TableRow key={row.id}>
            {(columnKey) => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
