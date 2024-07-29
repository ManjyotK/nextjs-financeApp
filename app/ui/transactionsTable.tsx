"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Selection,
  SortDescriptor,
} from "@nextui-org/react";
import { SearchIcon } from "./icons/searchIcon";
import { TransactionFormat } from "../lib/definitions";
import { categoryColorMap } from "../lib/definitions";
import { Category } from "@prisma/client";
import CreateTransactionForm from "./createTransaction";
import DeleteTransactionForm from "./deleteTransaction";
import EditTransactionForm from "./editTransaction";

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

//#region
const columns = [
  {name: "DESCRIPTION", uid: "description", sortable: true},
  {name: "AMOUNT", uid: "amount", sortable: true},
  {name: "DATE", uid: "date", sortable: true},
  {name: "CATEGORY", uid: "category", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];


export default function TransactionsTable({ transactions, categories }: {
  transactions: TransactionFormat[];
  categories: Category[];
}) {
  
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [categoryFilter, setcategoryFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "date",
    direction: "descending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredTransactions = [...transactions];

    if (hasSearchFilter) {
      filteredTransactions = filteredTransactions.filter((transaction) =>
        transaction.description.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    
    if (categoryFilter !== "all" && Array.from(categoryFilter).length !== categories.length) {
      filteredTransactions = filteredTransactions.filter((transaction) =>
        Array.from(categoryFilter).includes((transaction.categoryId).toString()),
      );
    }

    return filteredTransactions;
  }, [transactions, filterValue, categoryFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a: TransactionFormat, b: TransactionFormat) => {
      const first = a[sortDescriptor.column as keyof TransactionFormat] as number;
      const second = b[sortDescriptor.column as keyof TransactionFormat] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedItems.slice(start, end);
  }, [page, sortedItems, rowsPerPage]);

  

  const renderCell = React.useCallback((transaction: TransactionFormat, columnKey: React.Key) => {
    const cellValue = transaction[columnKey as keyof TransactionFormat];

    switch (columnKey) {
      case "description":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "amount":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small">${(Number(cellValue)).toFixed(2)}</p>
            </div>
          );
      case "date":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{(new Date(transaction.date)).toLocaleString()}</p>
          </div>
        );
      case "category":
        return (
          <Chip className={categoryColorMap[(transaction.categoryId % Object.keys(categoryColorMap).length)]} size="md" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-center gap-2">
            <EditTransactionForm transaction={transaction} categories={categories}/>
            <DeleteTransactionForm transaction={transaction} />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={"END"} variant="flat">
                  Categories
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={categoryFilter}
                selectionMode="multiple"
                onSelectionChange={setcategoryFilter}
              >
                {categories.map((category) => (
                  <DropdownItem key={category.id} className="capitalize">
                    {capitalize(category.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <CreateTransactionForm categories={categories} />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {transactions.length} transactions</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    categoryFilter,
    onSearchChange,
    onRowsPerPageChange,
    transactions.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No transactions found"} items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
