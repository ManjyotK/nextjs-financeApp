"use client";

import { createTransaction } from "@/app/lib/actions";
import { Button, DatePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from '@nextui-org/react';
import { PlusIcon } from './icons/plusIcon';
import { Category } from "@prisma/client";
import {now, getLocalTimeZone} from "@internationalized/date";

export default function CreateTransactionForm({categories}: {categories: Category[]}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
    <Button onPress={onOpen} color="primary" endContent={<PlusIcon />}>
      Add New
    </Button>
    <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create</ModalHeader>
              <form action={createTransaction}>
              <ModalBody>
                <Input
                  autoFocus
                  label="Transaction description"
                  required={true}
                  variant="bordered"
                  name='description'
                />
                <Input
                  label="Transaction amount"
                  required={true}
                  variant="bordered"
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
                  className="max-w-xs"
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