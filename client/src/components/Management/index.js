import React, { Fragment } from "react";
import DeleteUserModal from "./DeleteUserModal";
import { useQuery } from "@apollo/client";
import { QUERY_EMPLOYEES } from "../../utils/queries";
import { useStoreContext } from "../../utils/GlobalState";
import { MODAL_PROPS, SIGNUP_MODAL } from "../../utils/actions";
import SignUpModal from "./SignUpModal";

import Fab from "@mui/material/Fab";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const Management = () => {
    const [state, dispatch] = useStoreContext();
    const { modalOpen, signupModal } = state;

    const { loading, data, refetch } = useQuery(QUERY_EMPLOYEES);

    if (loading) return <div>Loading...</div>;

    let employeeData = data.employees;

    const handleClickOpen = (employee) => {
        dispatch({
            type: MODAL_PROPS,
            modalOpen: true,
            modalProps: {
                name: employee.username,
                email: employee.email,
            },
        });
    };

    const handleClickSignUp = (employee) => {
        dispatch({
            type: SIGNUP_MODAL,
            signupModal: true,
            signupProps: {
                name: employee.username,
                email: employee.email,
                password: employee.password,
            },
        });
    };

    return (
        <Fragment>
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
            >
                {/* <Link href='signup'> */}
                <Fab size='small' color="primary" aria-label="add" sx={{m:3 }} onClick={handleClickSignUp}>
                    <AddIcon />
                </Fab>
                {/* </Link> */}
             
                
                <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                >
                    Your Current Employees
                </Typography>
                
            </Stack>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Employee Username</TableCell>
                        <TableCell>Employee email</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employeeData.map((employee, i) => (
                        <TableRow key={i}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{employee.username}</TableCell>
                            <TableCell>{employee.email}</TableCell>

                            <TableCell>
                                <Button
                                    id={employee.room_id}
                                    variant="contained"
                                    size="small"
                                    style={{ marginLeft: 16 }}
                                    onClick={(event) =>
                                        handleClickOpen(employee)
                                    }
                                >
                                    Remove Employee
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {modalOpen && <DeleteUserModal refetch={refetch} />}
            {signupModal && <SignUpModal refetch={refetch} />}
        </Fragment>
    );
};

export default Management;
