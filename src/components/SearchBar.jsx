import { TextField, InputAdornment } from "@mui/material"
import { searchBarStyle } from "../styles"
import { AccountCircle } from "@mui/icons-material"
export default function SearchBar({ onSearchChange }) {

  return (
      <TextField
        label="მოსწავლის ძებნა პირადი ნომრით"
        variant="standard"
        onChange={onSearchChange}
        sx = {searchBarStyle}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
   
  )
}