import * as React from 'react';
import { useState } from 'react';
import SearchBar from "./SearchBar";
import StudentsList from "./StudentsGrid";
import { Container, Dialog, Typography, Paper, Box } from '@mui/material';
import StudentProgress from './StudentProgress';
import { managementPageStyle, progressTabStyle } from '../styles';
import AdminSideMenu from './AdminSideMenu';
import {getStudentsList} from '../services/api';
import {getStudentSteps} from '../services/api.js'



export default function ManagementPage() {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [menuHover, setMenuHover] = useState(false);
    const [studentProgress, setStudentProgress] = useState([]);
    React.useEffect(() => {
        const fetchSteps = async () => {
            try {
                const response = await getStudentsList();
                setStudents(response.data);
                setFilteredStudents(response.data); //filling both arrays
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchSteps();
    }, []);


    const handleSearchChange = (event) => {
        const query = event.target.value.trim();
        const filteredStudents = students.filter(currStudent => currStudent.personalId.includes(query));
        setFilteredStudents(query === '' ? students : filteredStudents);
    };

    const handleRowClick = async (student) => {
        setSelectedStudent(student);
        try {
            const response = await getStudentSteps(student.personalId);
            setStudentProgress(response.data); 
            console.log(response.data);
            setIsDialogOpen(true);
        } catch (error) {
            console.error('Error fetching steps data:', error);
        }
       
       
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AdminSideMenu onHover={setMenuHover} />
            <Container sx={{ ...managementPageStyle, ml: menuHover ? '20vw' : '5vw', transition: 'margin-left 0.3s' }}>
                <SearchBar onSearchChange={handleSearchChange} />
                <StudentsList students={filteredStudents} onRowClick={handleRowClick} />

                <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                    {selectedStudent && (
                        <Paper elevation={3} sx={progressTabStyle}>
                            <Typography>სახელი: {selectedStudent.firstName}</Typography>
                            <Typography>გვარი: {selectedStudent.lastName}</Typography>
                            <Typography>პირადი ნომერი: {selectedStudent.personalId}</Typography>
                            <StudentProgress stepsInfo={studentProgress} personalId = {selectedStudent.personalId} />
                        </Paper>
                    )}
                </Dialog>
            </Container>
        </Box>
    );
}
