import DeleteIcon from "@mui/icons-material/Delete";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  IconButton,
  ListItemSecondaryAction,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../../theme";



const PackingItems = ({
  item
}) => {
    const [editItemText, setEditItemText] = useState("");


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <ListItem key={item.packing_id}>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={item.check == true}
          tabIndex={-1}
          disableRipple
          onClick={() => handleToggleCheck(item.packing_id)}
        />
      </ListItemIcon>
      {editItemId === item.packing_id ? (
        <TextField
          fullWidth
          value={editItemText}
          onChange={(e) => setEditItemText(e.target.value)}
          onBlur={() => handleSaveItem(item.packing_id)}
          autoFocus
        />
      ) : (
        <ListItemText
          primary={item.packing_item}
          primaryTypographyProps={{
            style: { color: colors.primary[100], cursor: "pointer" },
            onClick: () => handleEditItem(item.packing_id), // Clicking on text starts editing
          }}
        />
      )}
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => handleDeleteConfirmation(item.packing_id)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default PackingItems;
