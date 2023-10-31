// material-ui
import { Box, FormControl, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// assets
import { SearchOutlined } from '@ant-design/icons';
import { purple } from '@mui/material/colors';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //



const Search = (prop) => {
    const { handleSearch, handleInput, removeInput, search } = prop;


    return (
        <Box sx={{ marginRight: "10px", ml: { xs: 0, md: 1 } }} component="form" onSubmit={handleSearch}>
            <FormControl sx={{ width: { xs: '100%', md: 224 } }}>
                <OutlinedInput
                    size="small"
                    id="header-search"
                    startAdornment={
                        <InputAdornment position="start" sx={{ mr: -0.5, color: purple[400] }}>
                            <SearchOutlined />
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="start" sx={{ mr: -0.5 }}>
                            <IconButton disableRipple disabled={!search} onClick={removeInput} sx={{ color: purple[400] }}>
                                {search && <CloseIcon fontSize={"medium"} />}
                            </IconButton>
                        </InputAdornment>
                    }
                    aria-describedby="header-search-text"
                    inputProps={{
                        'aria-label': 'weight'
                    }}
                    placeholder="Search..."
                    value={search}
                    onChange={e => handleInput(e)}
                    sx={{
                        color: purple[400],
                        "&::placeholder": {
                            color: purple[400]
                        }
                    }}
                />
            </FormControl>
        </Box>
    )
};

export default Search;
