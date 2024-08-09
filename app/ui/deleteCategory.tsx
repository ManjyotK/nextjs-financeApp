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

  /**
   * Handles the form submission for deleting a category.
   * If the category still has related transactions, it sets the error state to true and opens the modal.
   * If the category is successfully deleted, it sets the error state to false.
   *
   * @param {FormData} formData - The form data, not used in this function.
   * @return {Promise<void>} - A promise that resolves when the function is complete.
   */
  const handleClick = async (formData: FormData): Promise<void> => {
    // Call the deleteCategory function with the category id
    const res: ("OK" | "Not_Empty" | "Unknown_Error") = await deleteCategoryAction();

    // If the category still has related transactions, set the error state to true and open the modal
    if (res === "Not_Empty") {
      setError(true);
      onOpen();
    } else {
      // If the category is successfully deleted, set the error state to false
      setError(false);
    }
  }

  return (
    // Displays a tooltip with the text "Delete" when hovering over the button
    <Tooltip content="Delete">
      <div>
        {/* Button for opening the modal */}
        <Button 
          onPress={onOpen} 
          isIconOnly 
          className="bg-transparent" 
          size="md" 
          aria-label="Delete"
        >
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

                {/* Form for deleting the category */}
                <form action={!error ? handleClick : () => {setError(false)}}> 
                  {/* Body of the modal */}
                  <ModalBody>
                    {/* Display a message based on the error state */}
                    {!error ? 
                      <h1>Are you sure you want to delete {category.name}?</h1> : 
                      <h1>Error: Category still has related transactions. Please reassign or delete related transactions.</h1>}
                  </ModalBody>

                  {/* Footer of the modal */}
                  <ModalFooter>
                    {/* Button for closing the modal */}
                    {!error ? 
                      <Button color="danger" variant="flat" onPress={onClose}>
                        Close
                      </Button> : <></>}
                    {/* Button for submitting the form and deleting the category or closing the modal if there is an error */}
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
