import {IMemberDocument} from "../../@types/models/MemberDocument";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

export interface MemberDocumentsTableProps {
    documents: IMemberDocument[];
    onMemberDocumentCreate: () => void;
    onMemberDocumentDelete: (document: IMemberDocument) => void;
}

export default function MemberDocumentsTable({
                                                 documents,
                                                 onMemberDocumentCreate,
                                                 onMemberDocumentDelete,
                                             }: MemberDocumentsTableProps) {
    return (
        <Box>
            <Paper
                sx={{
                    width: '100%',
                    mb: 2,
                }}
            >
                <Toolbar>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onMemberDocumentCreate()}
                    >
                        Add Document
                    </Button>
                </Toolbar>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="members table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Expiration</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {documents.map((document) => (
                                <TableRow key={document.id}>
                                    <TableCell component="th" scope="row">
                                        {document.id}
                                    </TableCell>
                                    <TableCell>{document.type}</TableCell>
                                    <TableCell>{document.expiration_at}</TableCell>
                                    <TableCell>
                                        <Button
                                            color={"warning"}
                                            onClick={() => onMemberDocumentDelete(document)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}