import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@heroui/react";
import { useTranslation } from "react-i18next";

export default function RevealModale({isRevealOpen, onRevealOpenChange, revealAnswer} : {isRevealOpen: any, onRevealOpenChange: any, revealAnswer: Function}) {
    const {t} = useTranslation();
    return (
        <Modal isOpen={isRevealOpen} onOpenChange={onRevealOpenChange} size="md">
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">{t("reveal_answ_modal_title")}</ModalHeader>
                <ModalBody>
                    <p>{t("reveal_answ_modal_desc")}</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="ghost" onPress={onClose}>
                        No
                    </Button>
                    <Button color="success" variant="ghost" onPress={() => {onClose(); revealAnswer();}}>
                        {t("yes")}
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    )
}