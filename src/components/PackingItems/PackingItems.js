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
  colour,
  editItemId,
  editItemText,
  onToggleCheck,
  onEditItem,
  onDeleteConfirmation,
  onSaveItem,
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
          onChange={(e) => onEditItem(e.target.value)}
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
          onClick={() => onDeleteConfirmation(id)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default PackingItem;
