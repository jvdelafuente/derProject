import { IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';


export default function SearchBar() {
  return (
    <div className="searchbar-container">
      <input type="text" placeholder="Search..."/>
                    <IconButton>
                        <SearchIcon sx={{ color: 'white' }} />
                    </IconButton>

    </div>
  )
}
