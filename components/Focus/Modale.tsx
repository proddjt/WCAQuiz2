import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@heroui/react";
import {Table, TableHeader, TableBody, TableColumn, TableRow, TableCell} from "@heroui/table";

export default function Modale({isOpen, onOpenChange} : {isOpen: any, onOpenChange: any}) {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" size="3xl">
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Focus Quiz – Game Rules</ModalHeader>
                <ModalBody>
                    <h2 className="font-bold">Objective</h2>
                    <p>Guess the identity of a randomly selected person based on his/her profile picture and some information. The person is chosen according to the parameter selected in the previous setup screen.</p>
                    <h2 className="font-bold">Scoring System</h2>
                    <p>You have 5 attempts to guess correctly. Each attempt reveals more information and gives less blur to the image, but awards fewer points:</p>
                    <Table aria-label="Example static collection table">
                        <TableHeader>
                            <TableColumn>Attempt</TableColumn>
                            <TableColumn>Points</TableColumn>
                            <TableColumn>Information Revealed</TableColumn>
                        </TableHeader>
                        <TableBody>
                            <TableRow key="1">
                                <TableCell>1st</TableCell>
                                <TableCell>5 pts</TableCell>
                                <TableCell>No info shown <i>(except nationality in Italian Only mode)</i>, image completely blurred and with b/w filter</TableCell>
                            </TableRow>
                            <TableRow key="2">
                                <TableCell>2nd</TableCell>
                                <TableCell>4 pts</TableCell>
                                <TableCell>Gender revealed <i>(plus nationality if <strong>not</strong> in Italian Only mode), image less blurred and colors are given to it</i></TableCell>
                            </TableRow>
                            <TableRow key="3">
                                <TableCell>3rd</TableCell>
                                <TableCell>3 pts</TableCell>
                                <TableCell>Number of competitions and image less blurred</TableCell>
                            </TableRow>
                            <TableRow key="4">
                                <TableCell>4th</TableCell>
                                <TableCell>2 pts</TableCell>
                                <TableCell>His/her best result(s) and image less blurred</TableCell>
                            </TableRow>
                            <TableRow key="5">
                                <TableCell>5th</TableCell>
                                <TableCell>1 pts</TableCell>
                                <TableCell>WCA ID year and image less blurred (almost clear)</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <h2 className="font-bold">Time Limit</h2>
                    <p>Each attempt has a 60-second timer.</p>
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