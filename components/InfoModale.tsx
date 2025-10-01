import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@heroui/react";

export default function InfoModale({isOpen, onOpenChange, title, info} : {isOpen: any, onOpenChange: any, title: string, info: string}) {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">{title} mode info</ModalHeader>
                <ModalBody>
                    <p>{info}</p>
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