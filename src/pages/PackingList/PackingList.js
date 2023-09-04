import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  IconButton,
  ListItemSecondaryAction,
  TextField,
  useTheme,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { tokens } from "../../theme";
import axios from "axios";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const PackingList = () => {
  const [items, setItems] = useState([]);
  const [checkItem, setCheckItem] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [editItemText, setEditItemText] = useState("");
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    axios.get(`${SERVER_URL}/packinglist`).then((res) => {
      const sortedItems = res.data.sort((a, b) => a.packing_id - b.packing_id);
      console.log("get", sortedItems);
      setCheckItem(sortedItems.map((item) => item.check));
      setItems(sortedItems);
    });
  }, [editItemId]);

  const handleEditItem = (itemId) => {
    setEditItemId(itemId);
    setEditItemText(
      items.find((item) => item.packing_id === itemId)?.packing_item || ""
    );
  };

  const handleDeleteConfirmation = (itemId) => {
    setDeleteConfirmationOpen(true);
    setDeleteItemId(itemId);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmationOpen(false);
    setDeleteItemId(null);
  };

  const handleDeleteItem = async () => {
    try {
      await axios.delete(`${SERVER_URL}/packinglist/${deleteItemId}`);

      const updatedItems = items.filter(
        (item) => item.packing_id !== deleteItemId
      );

      setItems(updatedItems);
      setDeleteConfirmationOpen(false);
      setDeleteItemId(null);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleToggleCheck = async (itemId) => {
    const toggledItem = items.find((item) => item.packing_id === itemId);
    if (!toggledItem) return;

    const newCheckState = !toggledItem.check;

    try {
      const response = await axios.patch(
        `${SERVER_URL}/packinglist/${itemId}`,
        { check: newCheckState }
      );

      const updatedItems = items.map((item) =>
        item.packing_id === itemId
          ? { ...item, check: response.data.check }
          : item
      );

      setItems(updatedItems);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleSaveItem = async (itemId) => {
    const updatedItem = {
      packing_item: editItemText,
    };

    try {
      const response = await axios.put(
        `${SERVER_URL}/packinglist/${itemId}`,
        updatedItem
      );

      const updatedItems = items.map((item) =>
        item.packing_id === itemId
          ? { ...item, packing_item: response.data.packing_item }
          : item
      );

      setItems(updatedItems);
    } catch (error) {
      console.error("Error updating item:", error);
    }

    setEditItemId(null);
  };

  return (
    <Box
      display="flex"
      sx={{ flexDirection: "column", alignItems: "center", margin: 0 }}
    >
      <Box m="1.5rem 0">
        <Typography variant="h2" sx={{ color: colors.primary[100] }}>
          Packing List For Climbing
        </Typography>
      </Box>

      <List
        display="flex"
        width="100%"
        sx={{
          flexDirection: "column",
          alignItems: "center",
          margin: "0 auto",
          borderRadius: "0.5rem",
          width: "100%",
          maxWidth: "50%",
          bgcolor: `${colors.primary[400]}`,
        }}
      >
        {items.map((item) => (
          <>
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
          </>
        ))}
      </List>

      <Dialog open={deleteConfirmationOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Item</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this item?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteItem} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PackingList;
