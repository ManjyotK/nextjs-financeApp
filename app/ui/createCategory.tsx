"use client";

import { createCategory } from "@/app/lib/actions";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import { PlusIcon } from './icons/plusIcon';

/**
 * Component for the CreateCategoryForm modal.
 * This component displays a button to open the modal and a modal with a form to create a new category.
 */
export default function CreateCategoryForm() {
  // State and hooks
  const {isOpen, onOpen, onOpenChange} = useDisclosure(); // State for the modal and hooks to control it
  
  // Render the component
  return (
    <>
      {/* Button to open the modal */}
      <Button onPress={onOpen} color="primary" endContent={<PlusIcon />}>
        Add New
      </Button>
      {/* Modal with the form to create a new category */}
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
                {/* Form to create a new category */}
                <form action={createCategory}>
                <ModalBody>
                  {/* Input field for the category name */}
                  <Input
                    autoFocus
                    label="Category name"
                    required={true}
                    variant="bordered"
                    name='category'
                  />
                </ModalBody>
                <ModalFooter>
                  {/* Button to close the modal */}
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  {/* Button to submit the form and create a new category */}
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
