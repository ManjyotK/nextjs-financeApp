"use client";

import { deleteCategory } from "@/app/lib/actions";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from '@nextui-org/react';
import { DeleteIcon } from './icons/deleteIcon';
import { Category } from "@prisma/client";
import { useState } from "react";

/**
 * DeleteCategoryForm component.
 *
 * Renders a form for deleting a category.
 *
 * @param {Object} props - The component props.
 * @param {Category} props.category - The category to delete.
 * @return {JSX.Element} The rendered component.
 */
export default function DeleteCategoryForm({category}: {category: Category}) {
  // Hooks
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [error, setError] = useState(false);

  // Bind the deleteCategory function with the category id
  const deleteCategoryAction = deleteCategory.bind(null, category.id);

  const handleClick = async (formData:FormData) => {
    try{
      const res = await deleteCategoryAction()
    } catch(error: any){
      if(error.message == "Not_Empty"){
        setError(true)
        onOpen()
      }
    }
  }

  return (
    // Tooltip for accessibility
    <Tooltip content="Delete">
      <div>
        {/* Button for opening the modal */}
        <Button onPress={onOpen} isIconOnly className="bg-transparent" size="md" aria-label="Delete">
          <DeleteIcon />
        </Button>
        {/* Modal for confirming the deletion */}
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
                <ModalHeader className="flex flex-col gap-1">Delete Category</ModalHeader>
                <form action={!error ? handleClick : () => void 0}> 
                {/* Body of the modal */}
                <ModalBody>
                  {!error ? <h1>Are you sure you want to delete {category.name}?</h1> : 
                  <h1>Error: Category still has related transactions. Please reassign or delete related transactions.</h1>}
                </ModalBody>
                {/* Footer of the modal */}
                <ModalFooter>
                  {/* Button for closing the modal */}
                  {!error ? 
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button> : <></>}
                  {/* Button for submitting the form and deleting the category */}
                  <Button color={!error ? "primary" : "danger"} type="submit" onPress={onClose}>
                    {!error ? "Delete" : "Close"}
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
