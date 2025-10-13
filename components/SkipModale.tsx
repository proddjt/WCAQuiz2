import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@heroui/react";
import { useTranslation } from "react-i18next";

export default function SkipModale({isSkipOpen, onSkipOpenChange, skipAnswer} : {isSkipOpen: any, onSkipOpenChange: any, skipAnswer: Function}) {
    const {t} = useTranslation();
    return (
        <Modal isOpen={isSkipOpen} onOpenChange={onSkipOpenChange} size="md">
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">{t("skip_answ_modal_title")}</ModalHeader>
                <ModalBody>
                    <p>{t("skip_answ_modal_desc")}</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="ghost" onPress={onClose}>
                        No
                    </Button>
                    <Button color="success" variant="ghost" onPress={() => {onClose(); skipAnswer();}}>
                        {t("yes")}
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    )
}