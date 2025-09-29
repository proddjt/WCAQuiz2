import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@heroui/react";

export default function ErrorModale({isErrorOpen, onErrorOpenChange} : {isErrorOpen: any, onErrorOpenChange: any}) {
    return (
        <Modal isOpen={isErrorOpen} onOpenChange={onErrorOpenChange} size="md" isDismissable={false} isKeyboardDismissDisabled={true}>
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Ops! 😭</ModalHeader>
                <ModalBody>
                    <p>Sorry but something went wrong! 😣</p>
                    <p>Please reload the page</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="ghost" onPress={() => {onClose(); window.location.reload()}}>
                        Reload
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    )
}