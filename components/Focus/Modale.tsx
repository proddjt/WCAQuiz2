import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@heroui/react";
import {Table, TableHeader, TableBody, TableColumn, TableRow, TableCell} from "@heroui/table";
import { useTranslation } from "react-i18next";

export default function Modale({isOpen, onOpenChange} : {isOpen: any, onOpenChange: any}) {
    const {t} = useTranslation();
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" size="3xl">
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">{t("focus_modal_title")}</ModalHeader>
                <ModalBody>
                    <h2 className="font-bold">{t("focus_modal_heading_1")}</h2>
                    <p>{t("focus_modal_desc_1")}</p>
                    <h2 className="font-bold">{t("focus_modal_heading_2")}</h2>
                    <p>{t("focus_modal_desc_2")}</p>
                    <Table aria-label="Example static collection table">
                        <TableHeader>
                            <TableColumn>{t("attempt")}</TableColumn>
                            <TableColumn>{t("points")}</TableColumn>
                            <TableColumn>{t("info_revealed")}</TableColumn>
                        </TableHeader>
                        <TableBody>
                            <TableRow key="1">
                                <TableCell>{t("1")}</TableCell>
                                <TableCell>{t("5_pts")}</TableCell>
                                <TableCell>{t("focus_modal_table_1_desc_1")} <i>{t("focus_modal_table_1_desc_2")}</i>{t("focus_modal_table_1_desc_3")}</TableCell>
                            </TableRow>
                            <TableRow key="2">
                                <TableCell>{t("2")}</TableCell>
                                <TableCell>{t("4_pts")}</TableCell>
                                <TableCell>{t("focus_modal_table_2_desc_1")} <i>{t("focus_modal_table_2_desc_2")} <strong>{t("focus_modal_table_2_desc_3")}</strong> {t("focus_modal_table_2_desc_4")}</i>{t("focus_modal_table_2_desc_5")}</TableCell>
                            </TableRow>
                            <TableRow key="3">
                                <TableCell>{t("3")}</TableCell>
                                <TableCell>{t("3_pts")}</TableCell>
                                <TableCell>{t("focus_modal_table_3_desc_1")}</TableCell>
                            </TableRow>
                            <TableRow key="4">
                                <TableCell>{t("4")}</TableCell>
                                <TableCell>{t("2_pts")}</TableCell>
                                <TableCell>{t("focus_modal_table_4_desc_1")}</TableCell>
                            </TableRow>
                            <TableRow key="5">
                                <TableCell>{t("5")}</TableCell>
                                <TableCell>{t("1_pt1")}</TableCell>
                                <TableCell>{t("focus_modal_table_5_desc_1")}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <h2 className="font-bold">{t("focus_modal_heading_3")}</h2>
                    <p>{t("focus_modal_desc_3_1")}</p>
                    <p>{t("focus_modal_desc_3_2")}</p>
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