import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@heroui/react";
import { useTranslation } from "react-i18next";

export default function ErrorModale({isErrorOpen, onErrorOpenChange} : {isErrorOpen: any, onErrorOpenChange: any}) {
    const {t} = useTranslation();
    return (
        <Modal isOpen={isErrorOpen} onOpenChange={onErrorOpenChange} size="md" isDismissable={false} isKeyboardDismissDisabled={true}>
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Ops! 😭</ModalHeader>
                <ModalBody>
                    <p>{t("error_modal_desc_1")}</p>
                    <p>{t("error_modal_desc_2")}</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="ghost" onPress={() => {onClose(); window.location.reload()}}>
                        {t("reload")}
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    )
}