// PackingItem.js
import React, { useState } from "react";
import {
  ListItem,
  ListItemIcon,
  Checkbox,
  IconButton,
  ListItemSecondaryAction,
  TextField,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const PackingItem = ({
  id,
  packing_item,
  check,
  redColor,
  colour,
  editItemId,
  editItemText,
  onToggleCheck,
  onEditItem,
  onDeleteConfirmation,
  onSaveItem,
  handleEditText,
}) => {
  const isEditing = editItemId === id;

  return (
    <ListItem key={id} sx={{ color: colour }}>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={check}
          tabIndex={-1}
          disableRipple
          onClick={() => onToggleCheck(id)}
          color="secondary"
        />
      </ListItemIcon>
      {isEditing ? (
        <TextField
          fullWidth
          value={editItemText}
          onChange={(e) => handleEditText(e.target.value)}
          onBlur={() => onSaveItem(id)}
          autoFocus
        />
      ) : (
        <ListItemText
          primary={packing_item}
          primaryTypographyProps={{
            style: { cursor: "pointer" },
            onClick: () => onEditItem(id),
          }}
        />
      )}
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          style={{ color: redColor }}
          onClick={() => onDeleteConfirmation(id)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default PackingItem;
