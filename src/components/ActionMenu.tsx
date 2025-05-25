"use client";

import { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type Props = {
    icon: React.ReactNode;
    onRename: () => void;
    onDelete: () => void;
    onComplete?: () => void;
};

const ActionMenu = ({ onRename, onDelete, onComplete, icon }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick} size="small" className="cursor-pointer">
        {icon}
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleClose();
            onRename();
          }}
          className="hover:bg-hover-gray"
        >
            <div className="flex items-center gap-2">
                <EditIcon fontSize="small" className="text-gray-500" />
                <p className="text-gray-500 mb-0">Edit</p>
            </div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            onDelete();
          }}
          className="hover:bg-hover-gray"
        >
             <div className="flex items-center gap-2">
                <DeleteForeverIcon fontSize="small" className="text-gray-500" />
                <p className="text-gray-500 mb-0">Remove</p>
            </div>
        </MenuItem>
        {onComplete && (
          <MenuItem
            onClick={() => {
              handleClose();
              onComplete();
            }}
            className="hover:bg-hover-gray"
          >
            <div className="flex items-center gap-2">
              <CheckCircleIcon fontSize="small" className="text-gray-500" />
              <p className="text-gray-500 mb-0">Complete</p>
            </div>  
          </MenuItem>
        )}

      </Menu>
    </>
  );
};

export default ActionMenu;