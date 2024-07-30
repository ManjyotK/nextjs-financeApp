"use client";

import { createTransaction } from "@/app/lib/actions";
import { Button, DatePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from '@nextui-org/react';
import { PlusIcon } from './icons/plusIcon';
import { Category } from "@prisma/client";
import {now, getLocalTimeZone} from "@internationalized/date";

/**
 * Component for the CreateTransactionForm modal.
 * This component displays a button to open the modal and a modal with a form to create a new transaction.
 * @param {Object} props - The props object containing the categories array.
 * @param {Array} props.categories - The array of categories to display in the select input.
 */
export default function CreateTransactionForm({categories}: {categories: Category[]}) {
  // State and hooks
  const {isOpen, onOpen, onOpenChange} = useDisclosure(); // State for the modal and hooks to control it
  
  return (
    <>
      {/* Button to open the modal */}
      <Button onPress={onOpen} color="primary" endContent={<PlusIcon />}>
        Add New
      </Button>
      {/* Modal with the form to create a new transaction */}
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {/* Callback function to handle the close action */}
          {(onClose) => (
            <>
              {/* Header of the modal */}
              <ModalHeader className="flex flex-col gap-1">Create</ModalHeader>
              {/* Form to create a new transaction */}
              <form action={createTransaction}>
              <ModalBody>
                {/* Input field for the transaction description */}
                <Input
                  autoFocus
                  label="Transaction description"
                  required={true}
                  variant="bordered"
                  name='description'
                />
                {/* Input field for the transaction amount */}
                <Input
                  label="Transaction amount"
                  required={true}
                  variant="bordered"
                  name='amount'
                />
                {/* Date picker for the transaction date */}
                <DatePicker
                  label="Event Date"
                  variant="bordered"
                  hideTimeZone
                  showMonthAndYearPickers
                  defaultValue={now(getLocalTimeZone())}
                  name="date"
                />
                {/* Select input for the transaction category */}
                <Select
                  items={categories}
                  label="Select a category"
                  required={true}
                  className="max-w-xs"
                  name='categoryId'
                >
                  {/* Render each category option */}
                  {(category) => <SelectItem key={category.id}>{category.name}</SelectItem>}
                </Select>
              </ModalBody>
              <ModalFooter>
                {/* Button to close the modal */}
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                {/* Button to submit the form and create a new transaction */}
                <Button color="primary" type="submit" onPress={onClose}>
                  Create
                </Button>
              </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
