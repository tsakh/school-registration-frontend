import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'firstName', headerName: 'სახელი', flex: 1 },
  { field: 'lastName', headerName: 'გვარი', flex: 1 },
  { field: 'personalId', headerName: 'პირადი ნომერი', flex: 1.5, sortable:false },
  { field: 'email', headerName: 'მეილი', flex: 1 },
  { field: 'phoneNumber', headerName: 'მშობლის ნომერი', flex: 1 }
  
];


export default function StudentsList({students, onRowClick}) {
    const rows = students.map((student, index) => ({
        id: index,
        firstName: student.firstName,
        lastName: student.lastName,
        personalId: student.personalId,
        email : student.email,
        phoneNumber: student.phoneNumber
      }));

      return (
      
          <DataGrid sx={{width:'90vw'}}
            pageSizeOptions={[5, 10, 25,100]}
            rows={rows}
            columns= {columns}
            height="50vh"
            onRowClick={(params) => onRowClick(params.row)}
          />
       
      );

}
