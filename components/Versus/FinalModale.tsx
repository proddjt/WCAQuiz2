import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@heroui/react";

export default function FinalModale({isFinalOpen, onFinalOpenChange, points} : {isFinalOpen: any, onFinalOpenChange: any, points: number}) {
    return (
        <Modal isOpen={isFinalOpen} onOpenChange={onFinalOpenChange} size="md">
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Oh no! Wrong answer! 🥺</ModalHeader>
                <ModalBody>
                    You got {points} points! Try to beat it with a new game!
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="ghost" onPress={() => {onClose(); window.location.reload()}}>
                        Start a new game
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    )
}