"use client";

import { deleteTransaction } from "@/app/lib/actions";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from '@nextui-org/react';
import { DeleteIcon } from './icons/deleteIcon';
import { TransactionFormat } from "../lib/definitions";

/**
 * DeleteTransactionForm component.
 *
 * Renders a form for deleting a transaction.
 *
 * @param {Object} props - The component props.
 * @param {TransactionFormat} props.transaction - The transaction to delete.
 * @return {JSX.Element} The rendered component.
 */
export default function DeleteTransactionForm({transaction}: {transaction: TransactionFormat}) {
  // Hooks
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  // Bind the deleteTransaction function with the transaction id
  const deleteTransactionAction = deleteTransaction.bind(null, transaction.id);

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
                <ModalHeader className="flex flex-col gap-1">Delete Transaction</ModalHeader>
                <form action={deleteTransactionAction}>
                {/* Body of the modal */}
                <ModalBody>
                  <h1>Are you sure you want to delete {transaction.description}?</h1>
                </ModalBody>
                {/* Footer of the modal */}
                <ModalFooter>
                  {/* Button for closing the modal */}
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  {/* Button for submitting the form and deleting the transaction */}
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
