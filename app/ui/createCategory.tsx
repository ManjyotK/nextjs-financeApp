"use client";

import { createCategory } from "@/app/lib/actions";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import { PlusIcon } from './icons/plusIcon';

export default function CreateCategoryForm() {
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
              <form action={createCategory}>
              <ModalBody>
                <Input
                  autoFocus
                  placeholder="Enter category name"
                  variant="bordered"
                  name='category'
                />
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