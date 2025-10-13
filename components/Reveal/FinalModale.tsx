import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@heroui/react";
import { useTranslation } from "react-i18next";

export default function FinalModale({isFinalOpen, onFinalOpenChange, name, points, hasWon} : {isFinalOpen: any, onFinalOpenChange: any, name: string, points: number, hasWon: boolean}) {
    const {t} = useTranslation();
    return (
        <Modal isOpen={isFinalOpen} onOpenChange={onFinalOpenChange} size="md">
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">{hasWon ? t("win_modal_title") : t("lose_modal_title")}</ModalHeader>
                <ModalBody>
                    {
                        hasWon ? `${t("win_modal_desc_1")} ${points} ${t("win_modal_desc_2")} ${name}!` : `${t("lose_modal_desc_1")} ${name}. ${t("lose_modal_desc_2")} ${points} ${t("lose_modal_desc_3")}`
                    }
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