import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@heroui/react";

export default function Modale({isOpen, onOpenChange} : {isOpen: any, onOpenChange: any}) {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" size="3xl">
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Versus Quiz – Game Rules</ModalHeader>
                <ModalBody>
                    <h2 className="font-bold">Objective</h2>
                    <p>Guess who has the lower official single or average in the selected event.</p>
                    <p>If you guess correct, you get 1 point. If you guess wrong, your score is reset to 0.</p>
                    <p>Try to reach the highest streak possible.</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                    Close
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    )
}