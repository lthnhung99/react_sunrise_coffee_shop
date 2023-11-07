import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import TableViewSharpIcon from '@mui/icons-material/TableViewSharp';

// assets
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import BlenderIcon from '@mui/icons-material/Blender';
import { useDispatch, useSelector } from 'react-redux';
import { getListOrderDetailByTableId } from '../../reducers/mainSlice';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({ handleLogout }) => {
  const theme = useTheme();
  const location = useLocation();
  const dispatch = useDispatch();
  const tableId = useSelector(state => state.main.filters.tableSelected)

  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    if (index === 1) {
      dispatch(getListOrderDetailByTableId(tableId));
    }
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>

      <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="View Profile" />
      </ListItemButton>

      {location.pathname === "/kitchen" ? (
        <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
          <ListItemIcon>
            <TableViewSharpIcon />
          </ListItemIcon>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <ListItemText primary="Thu ngân" />
          </Link>
        </ListItemButton>
      ) : (
        <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
          <ListItemIcon>
            <BlenderIcon />
          </ListItemIcon>
          <Link to={"/kitchen"} style={{ textDecoration: "none" }}>
            <ListItemText primary="Phòng bếp" />
          </Link>
        </ListItemButton>
      )}

      <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Đăng xuất" />
      </ListItemButton>
    </List>
  );
};

ProfileTab.propTypes = {
  handleLogout: PropTypes.func
};

export default ProfileTab;
