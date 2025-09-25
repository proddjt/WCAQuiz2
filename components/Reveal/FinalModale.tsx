import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@heroui/react";

export default function FinalModale({isFinalOpen, onFinalOpenChange, name, points, hasWon} : {isFinalOpen: any, onFinalOpenChange: any, name: string, points: number, hasWon: boolean}) {
    return (
        <Modal isOpen={isFinalOpen} onOpenChange={onFinalOpenChange} size="md">
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">{hasWon ? `Hurray! You won! 🥳` : `Oh no! You lost! 🥺`}</ModalHeader>
                <ModalBody>
                    {
                        hasWon ? `You got ${points} points! Congratulations guessing ${name}!` : `Unfortunately it was ${name}. You got ${points} points. Better luck next time!`
                    }
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="ghost" onPress={onClose}>
                        Close
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    )
}