"use client";
// import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Button} from "@nextui-org/react";
// import { Transaction } from "@prisma/client";
import { TransactionFormat } from "../lib/definitions";
import { run } from "../lib/ai_actions";


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


  async function handlePress(){
    const summaryElement = document.getElementById("summary");
    if (summaryElement) {
      summaryElement.innerHTML = "Loading...";
    }
    let summary:string = await run();

    if (summaryElement) {
      summaryElement.innerHTML = summary;
    }
  }
  return (
    <>
    <Button color="primary" onPress={handlePress}>Get AI generated summary</Button>
      <div id="summary"></div>
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
    </>
  );
}
