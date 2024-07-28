"use client";

import { createTransaction } from "@/app/lib/actions";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from '@nextui-org/react';
import { PlusIcon } from './icons/plusIcon';
import { Category } from "@prisma/client";
import { useMemo, useState } from "react";

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
                  placeholder="Enter transaction description"
                  variant="bordered"
                  name='description'
                />
                <Input
                  placeholder="Enter transaction amount"
                  variant="bordered"
                  name='amount'
                />
                <Select
                  items={categories}
                  placeholder="Select a category"
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