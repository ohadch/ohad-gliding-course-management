import {IMember} from "../../../@types";
import {Button, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Link} from "react-router-dom";
import {getDisplayNameByMemberStatus} from "../../../utils/members.ts";


export interface MembersTableProps {
    members: IMember[];
    onDeleteMember: (member: IMember) => void;
}

export default function MembersTable({members, onDeleteMember}: MembersTableProps) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="members table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {members.map((member) => (
                        <TableRow key={member.id}>
                            <TableCell component="th" scope="row">
                                {member.id}
                            </TableCell>
                            <TableCell>{member.name}</TableCell>
                            <TableCell>
                                <Chip
                                    label={
                                        getDisplayNameByMemberStatus(member.status)
                                    }
                                />
                            </TableCell>
                            <TableCell>
                                <Button component={Link} to={`/members/${member.id}`}>
                                    View
                                </Button>
                                <Button color={"warning"} onClick={() => onDeleteMember(member)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}