"use client";

import { updateTransaction } from "@/app/lib/actions";
import { Button, DatePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Tooltip, useDisclosure } from '@nextui-org/react';
import { TransactionFormat } from "../lib/definitions";
import { EditIcon } from "./icons/editIcon";
import { Category } from "@prisma/client";
import {now, getLocalTimeZone} from "@internationalized/date";

/**
 * Component for the EditTransactionForm modal.
 * This component displays a button to open the modal and a modal with a form to edit a transaction.
 *
 * @param {Object} props - The props object containing the transaction and categories.
 * @param {TransactionFormat} props.transaction - The transaction to edit.
 * @param {Array} props.categories - The array of categories to display in the select input.
 * @returns {JSX.Element} The rendered component.
 */
export default function EditTransactionForm({transaction, categories}: {transaction: TransactionFormat, categories: Category[]}) {
  // State and hooks
  const {isOpen, onOpen, onOpenChange} = useDisclosure(); // State for the modal and hooks to control it

  // Bind the updateTransaction function with the transaction id
  const updateTransactionAction = updateTransaction.bind(null, transaction.id);

  return (
    // Tooltip for accessibility
    <Tooltip content="Edit">
      <div>
        {/* Button for opening the modal */}
        <Button onPress={onOpen} isIconOnly className="bg-transparent" size="md" aria-label="Edit">
          <EditIcon />
        </Button>
        {/* Modal for editing the transaction */}
        <Modal 
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {/* Callback function for handling the close action */}
            {(onClose) => (
              <>
                {/* Header of the modal */}
                <ModalHeader className="flex flex-col gap-1">Edit</ModalHeader>
                {/* Form to edit the transaction */}
                <form action={updateTransactionAction}>
                <ModalBody>
                  {/* Input field for the transaction description */}
                  <Input
                    autoFocus
                    label="Transaction description"
                    required={true}
                    variant="bordered"
                    defaultValue={transaction.description}
                    name='description'
                  />
                  {/* Input field for the transaction amount */}
                  <Input
                    label="Transaction amount"
                    required={true}
                    variant="bordered"
                    defaultValue={transaction.amount.toString()}
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
                    placeholder="Select a category"
                    className="max-w-xs"
                    defaultSelectedKeys={transaction.categoryId.toString()}
                    name='categoryId'
                  >
                    {(category) => <SelectItem key={category.id}>{category.name}</SelectItem>}
                  </Select>
                </ModalBody>
                <ModalFooter>
                  {/* Button for closing the modal */}
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  {/* Button for submitting the form and updating the transaction */}
                  <Button color="primary" type="submit" onPress={onClose}>
                    Update
                  </Button>
                </ModalFooter>
                </form>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </Tooltip>
  );
}
