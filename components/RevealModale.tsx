import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@heroui/react";

export default function RevealModale({isRevealOpen, onRevealOpenChange, revealAnswer} : {isRevealOpen: any, onRevealOpenChange: any, revealAnswer: Function}) {
    return (
        <Modal isOpen={isRevealOpen} onOpenChange={onRevealOpenChange} size="md">
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Reveal answer</ModalHeader>
                <ModalBody>
                    <p>Are you sure you want to reveal the answer?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="ghost" onPress={onClose}>
                        No
                    </Button>
                    <Button color="success" variant="ghost" onPress={() => {onClose(); revealAnswer();}}>
                        Yes
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    )
}