import {IEnrollment} from "../../@types/models/Enrollment";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {Link} from "react-router-dom";
import {ICourse, IMember} from "../../@types";

export interface EnrollmentsTableProps {
    enrollments: IEnrollment[];
    members: IMember[];
    courses: ICourse[];
    onEnrollmentCreate: () => void;
    onEnrollmentEdit: (enrollment: IEnrollment) => void;
    onEnrollmentDelete: (enrollment: IEnrollment) => void;
}

export default function EnrollmentsTable(props : EnrollmentsTableProps) {
    const {
        enrollments,
        members,
        courses,
        onEnrollmentCreate,
        onEnrollmentEdit,
        onEnrollmentDelete,
    } = props;

    const getMemberById = (id: number) => members.find((member) => member.id === id);
    const getCourseById = (id: number) => courses.find((course) => course.id === id);

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
                        onClick={() => onEnrollmentCreate()}
                    >
                        New Enrollment
                    </Button>
                </Toolbar>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="enrollments table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Member</TableCell>
                                <TableCell>Course</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {enrollments.map((enrollment) => (
                                <TableRow key={enrollment.id}>
                                    <TableCell component="th" scope="row">
                                        {enrollment.id}
                                    </TableCell>
                                    <TableCell>
                                        {enrollment.status}
                                    </TableCell>
                                    <TableCell>
                                        {getMemberById(enrollment.member_id)?.name}
                                    </TableCell>
                                    <TableCell>
                                        {getCourseById(enrollment.course_id)?.name}
                                    </TableCell>
                                    <TableCell>
                                        <Button component={Link} to={`/enrollments/${enrollment.id}`}>
                                            View
                                        </Button>
                                        <Button
                                            color="primary"
                                            onClick={() => onEnrollmentEdit(enrollment)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            color="warning"
                                            onClick={() => onEnrollmentDelete(enrollment)}
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