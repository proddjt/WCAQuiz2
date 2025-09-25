import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@heroui/react";

export default function SkipModale({isSkipOpen, onSkipOpenChange, skipAnswer} : {isSkipOpen: any, onSkipOpenChange: any, skipAnswer: Function}) {
    return (
        <Modal isOpen={isSkipOpen} onOpenChange={onSkipOpenChange} size="md">
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Skip answer</ModalHeader>
                <ModalBody>
                    <p>Are you sure you want to skip this answer?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="ghost" onPress={onClose}>
                        No
                    </Button>
                    <Button color="success" variant="ghost" onPress={() => {onClose(); skipAnswer();}}>
                        Yes
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    )
}