import * as React from 'react';
import SearchBar from "./SearchBar";
import StudentsList from "./StudentsGrid";
import { Container,Dialog, Typography,Paper } from '@mui/material';
import StudentProgress from './StudentProgress';
import { managementPageStyle,progressTabStyle} from './styles';

//should be removed

const testStudents = [
    { id: 1, firstName: 'გიორგი', lastName: 'აბაშიძე', personalId: '01020304050' },
    { id: 2, firstName: 'ალექსანდრე', lastName: 'კვარაცხელია', personalId: '06070809010' },
    { id: 3, firstName: 'ნინო', lastName: 'ჩიხვაძე', personalId: '11121314151' },
    { id: 4, firstName: 'თამაზ', lastName: 'სულხანიძე', personalId: '16171819202' },
    { id: 5, firstName: 'ლევან', lastName: 'გოგოლაშვილი', personalId: '21222324253' },
    { id: 6, firstName: 'ნინა', lastName: 'მახარაძე', personalId: '26272829303' },
    { id: 7, firstName: 'ლევანი', lastName: 'ლაღუნიძე', personalId: '31323334354' },
    { id: 8, firstName: 'ნათია', lastName: 'დავითაშვილი', personalId: '36373839404' },
    { id: 9, firstName: 'მარიამ', lastName: 'ლომსაძე', personalId: '41424344455' },
    { id: 10, firstName: 'ლალი', lastName: 'გიორგაძე', personalId: '45464748495' },
    { id: 11, firstName: 'მიხეილ', lastName: 'ბაბუხიძე', personalId: '50515253505' },
    { id: 12, firstName: 'სოფიო', lastName: 'ჯირაშვილი', personalId: '55565758505' },
    { id: 13, firstName: 'იასმინ', lastName: 'ლელაძე', personalId: '60616263656' },
    { id: 14, firstName: 'დავით', lastName: 'გულაშვილი', personalId: '65666768605' },
    { id: 15, firstName: 'ნიკოლოზ', lastName: 'გვარდაძე', personalId: '70717273705' },
    { id: 16, firstName: 'ნატალი', lastName: 'აბრამიშვილი', personalId: '75767778705' },
    { id: 17, firstName: 'თეა', lastName: 'არაბიძე', personalId: '80818283805' },
    { id: 18, firstName: 'გიორგი', lastName: 'მელიქიშვილი', personalId: '85868788805' },
    { id: 19, firstName: 'ანნა', lastName: 'მარღველაშვილი', personalId: '90919293905' },
    { id: 20, firstName: 'მარიამ', lastName: 'ჩირაქაძე', personalId: '95969798905' },
];

  
const testProgress = [
    { id: 1, name: "Step 1", isPassed: true },
    { id: 2, name: "Step 2", isPassed: false },
    { id: 3, name: "Step 3", isPassed: true },
    { id: 4, name: "Step 4", isPassed: false },
    { id: 5, name: "Step 5", isPassed: true }
];

  

export default function ManagementPage(){

    const [students, setStudents] = React.useState([...testStudents]);
    const [selectedStudent, setSelectedStudent] = React.useState(null);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    const handleSearchChange = (event) => {
        console.log(event.target.value);
        const query = event.target.value.trim();
        const filteredStudents = testStudents.filter(currStudent => 
            currStudent.personalId.includes(query));

        setStudents(query === '' ? testStudents : filteredStudents);
    }

    const handleRowClick = (student) => {
        setSelectedStudent(student);
        setIsDialogOpen(true);
      };
    

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <Container sx={managementPageStyle}>
            <SearchBar onSearchChange={handleSearchChange}/>
            <StudentsList students={students} onRowClick={handleRowClick}/>

            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        
            {selectedStudent && (
              <Paper elevation={3} sx={progressTabStyle} >
                <Typography >სახელი {selectedStudent.firstName}</Typography>
                <Typography >გვარი: {selectedStudent.lastName}</Typography>
                <Typography >პირადი ნომერი: {selectedStudent.personalId}</Typography>
                <StudentProgress stepsInfo={testProgress} />
              </Paper>
          )}
            </Dialog>
        </Container>
        
    );
}