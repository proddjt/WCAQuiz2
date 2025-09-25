import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@heroui/react";
import {Table, TableHeader, TableBody, TableColumn, TableRow, TableCell} from "@heroui/table";

export default function Modale({isOpen, onOpenChange} : {isOpen: any, onOpenChange: any}) {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" size="3xl">
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Reveal Quiz – Game Rules</ModalHeader>
                <ModalBody>
                    <h2 className="font-bold">Objective</h2>
                    <p>Guess the identity of a randomly selected person based on progressively revealed information. The person is chosen according to the parameters selected in the previous setup screen.</p>
                    <h2 className="font-bold">Scoring System</h2>
                    <p>You have 10 attempts to guess correctly. Each attempt reveals more information but awards fewer points:</p>
                    <Table aria-label="Example static collection table">
                        <TableHeader>
                            <TableColumn>Attempt</TableColumn>
                            <TableColumn>Points</TableColumn>
                            <TableColumn>Information Revealed</TableColumn>
                        </TableHeader>
                        <TableBody>
                            <TableRow key="1">
                                <TableCell>1st</TableCell>
                                <TableCell>10 pts</TableCell>
                                <TableCell>No info shown <i>(except nationality in Italian Only mode)</i></TableCell>
                            </TableRow>
                            <TableRow key="2">
                                <TableCell>2nd</TableCell>
                                <TableCell>9 pts</TableCell>
                                <TableCell>Gender revealed <i>(plus nationality if <strong>not</strong> in Italian Only mode)</i></TableCell>
                            </TableRow>
                            <TableRow key="3">
                                <TableCell>3rd</TableCell>
                                <TableCell>8 pts</TableCell>
                                <TableCell>Number of competitions and championships</TableCell>
                            </TableRow>
                            <TableRow key="4">
                                <TableCell>4th</TableCell>
                                <TableCell>7 pts</TableCell>
                                <TableCell>Number and types of medals won</TableCell>
                            </TableRow>
                            <TableRow key="5">
                                <TableCell>5th</TableCell>
                                <TableCell>6 pts</TableCell>
                                <TableCell>Number and types of records held</TableCell>
                            </TableRow>
                            <TableRow key="6">
                                <TableCell>6th</TableCell>
                                <TableCell>5 pts</TableCell>
                                <TableCell>Event names where the person has results</TableCell>
                            </TableRow>
                            <TableRow key="7">
                                <TableCell>7th</TableCell>
                                <TableCell>4 pts</TableCell>
                                <TableCell>Year portion of the WCA ID</TableCell>
                            </TableRow>
                            <TableRow key="8">
                                <TableCell>8th</TableCell>
                                <TableCell>3 pts</TableCell>
                                <TableCell>Full lists of competitions and championships</TableCell>
                            </TableRow>
                            <TableRow key="9">
                                <TableCell>9th</TableCell>
                                <TableCell>2 pts</TableCell>
                                <TableCell>Averages table</TableCell>
                            </TableRow>
                            <TableRow key="10">
                                <TableCell>10th</TableCell>
                                <TableCell>1 pt</TableCell>
                                <TableCell>Full results table including singles and averages</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <h2 className="font-bold">Time Limit</h2>
                    <p>Each attempt has a 90-second timer.</p>
                    <p>If time runs out, it counts as an incorrect guess and the next attempt begins automatically.</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                    Close
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    )
}