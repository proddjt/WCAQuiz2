import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@heroui/react";
import { useTranslation } from "react-i18next";

export default function Modale({isOpen, onOpenChange} : {isOpen: any, onOpenChange: any}) {
    const {t} = useTranslation();
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" size="3xl">
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">{t("versus_modal_title")}</ModalHeader>
                <ModalBody>
                    <h2 className="font-bold">{t("versus_modal_heading_1")}</h2>
                    <p>{t("versus_modal_desc_1")}</p>
                    <p>{t("versus_modal_desc_2")}</p>
                    <p>{t("versus_modal_desc_3")}</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                    {t("close")}
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    )
}