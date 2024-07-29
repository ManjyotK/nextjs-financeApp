"use client";

import { updateTransaction } from "@/app/lib/actions";
import { Button, DatePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Tooltip, useDisclosure } from '@nextui-org/react';
import { TransactionFormat } from "../lib/definitions";
import { EditIcon } from "./icons/editIcon";
import { Category } from "@prisma/client";
import {now, getLocalTimeZone} from "@internationalized/date";

export default function EditTransactionForm({transaction, categories}: {transaction: TransactionFormat, categories: Category[]}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const updateTransactionAction = updateTransaction.bind(null, transaction.id);

  return (
    <Tooltip content="Edit">
      <div>
      <Button onPress={onOpen} isIconOnly className="bg-transparent" size="md" aria-label="Edit">
        <EditIcon />
      </Button>
      <Modal 
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
              <ModalHeader className="flex flex-col gap-1">Edit</ModalHeader>
              <form action={updateTransactionAction}>
              <ModalBody>
                <Input
                  autoFocus
                  label="Transaction description"
                  required={true}
                  variant="bordered"
                  defaultValue={transaction.description}
                  name='description'
                />
                <Input
                  label="Transaction amount"
                  required={true}
                  variant="bordered"
                  defaultValue={transaction.amount.toString()}
                  name='amount'
                />
                <DatePicker
                  label="Event Date"
                  variant="bordered"
                  hideTimeZone
                  showMonthAndYearPickers
                  defaultValue={now(getLocalTimeZone())}
                  name="date"
                />
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
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
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