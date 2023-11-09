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
import ViewProfile from './ViewProfile';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({ handleLogout }) => {
  const theme = useTheme();
  const location = useLocation();
  const dispatch = useDispatch();
  const tableId = useSelector(state => state.main.filters.tableSelected);
  const [open, setOpen] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState('');
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    if (index === 1) {
      tableId && dispatch(getListOrderDetailByTableId(tableId));
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>

      <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
        <ListItemIcon>
          <UserOutlined />
          <ViewProfile open={open} closeModal={handleClose} />
        </ListItemIcon>
        <ListItemText primary="Xem thông tin" onClick={handleOpen} />
      </ListItemButton>

      {location.pathname === "/kitchen" ? (
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
            <ListItemIcon>
              <TableViewSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Thu ngân" className='blackColor' />
          </ListItemButton>
        </Link>
      ) : (
        <Link to={"/kitchen"} style={{ textDecoration: "none" }}>
          <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
            <ListItemIcon>
              <BlenderIcon />
            </ListItemIcon>
            <ListItemText primary="Phòng bếp" className='blackColor' />
          </ListItemButton>
        </Link>
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
