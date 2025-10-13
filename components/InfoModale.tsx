import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@heroui/react";
import { useTranslation } from "react-i18next";

export default function InfoModale({isOpen, onOpenChange, title, info} : {isOpen: any, onOpenChange: any, title: string, info: string}) {
    const {t} = useTranslation();
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
                        {t("close")}
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    )
}