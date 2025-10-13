import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@heroui/react";
import { useTranslation } from "react-i18next";

export default function FinalModale({isFinalOpen, onFinalOpenChange, points} : {isFinalOpen: any, onFinalOpenChange: any, points: number}) {
    const {t} = useTranslation();
    return (
        <Modal isOpen={isFinalOpen} onOpenChange={onFinalOpenChange} size="md">
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">{t("versus_lose_modal_title")}</ModalHeader>
                <ModalBody>
                    {t("versus_lose_modal_desc_1")} {points} {t("versus_lose_modal_desc_2")}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="ghost" onPress={() => {onClose(); window.location.reload()}}>
                        {t("start_new")}
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    )
}