import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@heroui/react";
import {Table, TableHeader, TableBody, TableColumn, TableRow, TableCell} from "@heroui/table";
import { useTranslation } from "react-i18next";

export default function Modale({isOpen, onOpenChange} : {isOpen: any, onOpenChange: any}) {
    const { t } = useTranslation();
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" size="3xl">
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">{t("goldrush_modal_title")}</ModalHeader>
                <ModalBody>
                    <h2 className="font-bold">{t("goldrush_modal_heading_1")}</h2>
                    <p>{t("goldrush_modal_desc_1")}</p>
                    <h2 className="font-bold">{t("goldrush_modal_heading_2")}</h2>
                    <p>{t("goldrush_modal_desc_2")}</p>
                    <Table aria-label="Example static collection table">
                        <TableHeader>
                            <TableColumn>{t("difficulty")}</TableColumn>
                            <TableColumn>{t("calculation")}</TableColumn>
                        </TableHeader>
                        <TableBody>
                            <TableRow key="1">
                                <TableCell>{t("goldrush_modal_table_1_head")}</TableCell>
                                <TableCell>{t("goldrush_modal_table_1_desc_1")}</TableCell>
                            </TableRow>
                            <TableRow key="2">
                                <TableCell>{t("goldrush_modal_table_2_head")}</TableCell>
                                <TableCell>{t("goldrush_modal_table_2_desc_1")}</TableCell>
                            </TableRow>
                            <TableRow key="3">
                                <TableCell>{t("goldrush_modal_table_3_head")}</TableCell>
                                <TableCell>{t("goldrush_modal_table_3_desc_1")}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <h2 className="font-bold">{t("goldrush_modal_heading_3")}</h2>
                    <p>{t("goldrush_modal_desc_3")}</p>
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