import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@heroui/react";
import { useTranslation } from "react-i18next";

export default function FinalModale({isFinalOpen, onFinalOpenChange, time, podiumsLeft, hasWon} : {isFinalOpen: any, onFinalOpenChange: any, time: number, podiumsLeft: number, hasWon: boolean}) {
    const {t} = useTranslation();
    return (
        <Modal isOpen={isFinalOpen} onOpenChange={onFinalOpenChange} size="md">
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">{hasWon ? t("win_modal_title") : t("lose_modal_title")}</ModalHeader>
                <ModalBody>
                    {
                        hasWon ? `${t("goldrush_win_modal_desc_1")} ${time} ${t("goldrush_win_modal_desc_2")}!` : `${t("goldrush_lose_modal_desc_1")} ${podiumsLeft} ${t("goldrush_lose_modal_desc_2")}!`
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