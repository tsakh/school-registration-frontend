import { AppBar, Toolbar, Typography, Button } from "@mui/material"


export default function PageHeader({ onLogout }) {

  return (

    <Toolbar>
      <Button variant="contained" onClick={onLogout}>
        Logout
      </Button>
    </Toolbar>
  )
}