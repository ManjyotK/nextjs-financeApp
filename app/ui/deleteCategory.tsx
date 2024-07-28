"use client";

import { deleteCategory } from "@/app/lib/actions";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from '@nextui-org/react';
import { DeleteIcon } from './icons/deleteIcon';
import { Category } from "@prisma/client";

export default function DeleteCategoryForm({category}: {category: Category}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const deleteCategoryAction = deleteCategory.bind(null, category.id);

  return (
    <Tooltip content="Delete">
      <div>
      <Button onPress={onOpen} isIconOnly className="bg-transparent" size="md" aria-label="Delete">
        <DeleteIcon />
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
                <form action={deleteCategoryAction}>
                <ModalBody>
                  <h1>Are you sure you want to delete {category.name}?</h1>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit" onPress={onClose}>
                    Delete
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