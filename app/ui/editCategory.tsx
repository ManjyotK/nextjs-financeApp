"use client";

import { updateCategory } from "@/app/lib/actions";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from '@nextui-org/react';
import { EditIcon } from "./icons/editIcon";
import { Category } from "@prisma/client";

/**
 * EditCategoryForm component.
 *
 * Renders a form for editing a category.
 *
 * @param {Object} props - The component props.
 * @param {Category} props.category - The category to edit.
 * @return {JSX.Element} The rendered component.
 */
export default function EditCategoryForm({category}: {category: Category}) {
  // Hooks
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  // Bind the updateCategory function with the category id
  const updateCategoryAction = updateCategory.bind(null, category.id);

  return (
    // Tooltip for accessibility
    <Tooltip content="Edit">
      <div>
        {/* Button for opening the modal */}
        <Button onPress={onOpen} isIconOnly className="bg-transparent" size="md" aria-label="Edit">
          <EditIcon />
        </Button>
        {/* Modal for editing the category */}
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
                <ModalHeader className="flex flex-col gap-1">Edit Category</ModalHeader>
                {/* Form for editing the category */}
                <form action={updateCategoryAction}>
                  <ModalBody>
                    {/* Input field for the category name */}
                    <Input
                      autoFocus
                      label="Category name"
                      required={true}
                      variant="bordered"
                      defaultValue={category.name}
                      name='category' />
                  </ModalBody>
                  <ModalFooter>
                    {/* Button for closing the modal */}
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    {/* Button for submitting the form and updating the category */}
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
