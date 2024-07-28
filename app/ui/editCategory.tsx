"use client";

import { updateCategory } from "@/app/lib/actions";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from '@nextui-org/react';
import { EditIcon } from "./icons/editIcon";
import { Category } from "@prisma/client";

export default function EditCategoryForm({category}: {category: Category}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const updateCategoryAction = updateCategory.bind(null, category.id);

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
              <ModalHeader className="flex flex-col gap-1">Create</ModalHeader>
              <form action={updateCategoryAction}>
              <ModalBody>
                <Input
                  autoFocus
                  label="Category name"
                  required={true}
                  variant="bordered"
                  defaultValue={category.name}
                  name='category'
                />
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