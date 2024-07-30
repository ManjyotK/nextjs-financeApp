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
  Chip,
  Pagination,
  SortDescriptor,
} from "@nextui-org/react";
import { Category } from "@prisma/client";
import { SearchIcon } from "./icons/searchIcon";
import { categoryColorMap } from "../lib/definitions";
import DeleteCategoryForm from "./deleteCategory";
import CreateCategoryForm from "./createCategory";
import EditCategoryForm from "./editCategory";

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


/**
 * CategoryTable component displays a table of categories with pagination, sorting and search functionality.
 * It also provides actions to edit and delete categories.
 *
 * @param {Object} props - The props object containing the categories array.
 * @param {Category[]} props.categories - The array of categories to display in the table.
 * @return {JSX.Element} The CategoryTable component.
 */
export default function CategoryTable({categories} : {categories: Category[]}) {

  // State variables
  const [filterValue, setFilterValue] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "category",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  // Helper functions
  const hasSearchFilter = Boolean(filterValue);

  // Table columns
  const headerColumns = [
    {name: "CATEGORY", uid: "category", sortable: true},
    {name: "ACTIONS", uid: "actions", sortable: false},
  ];

  // Filtered and sorted items
  const filteredItems = React.useMemo(() => {
    let filteredCategories = [...categories];

    if (hasSearchFilter) {
      filteredCategories = filteredCategories.filter((category) =>
        category.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    return filteredCategories;
  }, [categories, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);
  
  
  const sortedItems = React.useMemo(() => {
      return [...filteredItems].sort((a: Category, b: Category) => {
        const first = a.name;
        const second = b.name;
        const cmp = first < second ? -1 : first > second ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    }, [sortDescriptor, filteredItems]);

  
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedItems.slice(start, end);
  }, [page, sortedItems, rowsPerPage]);

 

  // Render cell based on column key
  const renderCell = React.useCallback((category: Category, columnKey: React.Key) => {
 
    switch (columnKey) {
      case "category":
        return (
          <Chip className={categoryColorMap[(category.id % Object.keys(categoryColorMap).length)]} size="md" variant="flat">
            {category.name}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-center gap-2">
            <EditCategoryForm category={category} />
            <DeleteCategoryForm category={category} />
          </div>
        );
      default:
        return <></>
    }
  }, []);

  // Event handlers
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

  // Top content of the table
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
            <CreateCategoryForm />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {categories.length} categories</span>
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
    onSearchChange,
    onRowsPerPageChange,
    categories.length,
    hasSearchFilter,
  ]);

  // Bottom content of the table
  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      isStriped
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
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
      <TableBody emptyContent={"No categories found"} items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
