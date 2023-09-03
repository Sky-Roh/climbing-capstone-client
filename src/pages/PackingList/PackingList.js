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
  Button,
  TextField,
  useTheme,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { tokens } from "../../theme";
import axios from "axios";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Checklist = () => {
  const [items, setItems] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [editItemText, setEditItemText] = useState("");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    axios.get(`${SERVER_URL}/packinglist`).then((res) => {
      const sortedItems = res.data.sort((a, b) => a.packing_id - b.packing_id);
      setItems(sortedItems);
    });
  }, []);



  const handleEditItem = (itemId) => {
    setEditItemId(itemId);
    setEditItemText(
      items.find((item) => item.packing_id === itemId)?.packing_item || ""
    );
  };

  const handleToggleCheck = (itemId) => {
    const toggledItem = items.find((item) => item.packing_id === itemId);
    if (!toggledItem) return;
  
    // Calculate the new check state
    const newCheckState = !toggledItem.check;
  
    // Make the PUT request to update the item's check property
    axios
      .put(`${SERVER_URL}/packinglist/${itemId}`, { check: newCheckState })
      .then((res) => {
        // Update the item's check state in the local state with the response data
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.packing_id === itemId
              ? { ...item, check: res.data.check }
              : item
          )
        );
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      });
  };
  

  const handleSaveItem = (itemId) => {
    const updatedItem = {
      packing_item: editItemText
    };

    axios
      .put(`${SERVER_URL}/packinglist/${itemId}`, updatedItem)
      .then((res) => {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.packing_id === itemId
              ? { ...item, packing_item: res.data.packing_item }
              : item
          )
        );
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      });

    setEditItemId(null);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" margin="0">
      <Box m="1.5rem 0">
        <Typography variant="h2" sx={{ color: colors.primary[100] }}>
          Packing List For Climbing
        </Typography>
      </Box>

      <List
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="0 auto"
        width="100%"
        sx={{
          borderRadius: "0.5rem",
          width: "100%",
          maxWidth: "50%",
          bgcolor: `${colors.primary[400]}`,
        }}
      >
        {items.map((item) => (
          <ListItem key={item.packing_id}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={item.check}
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
                onClick={() => handleEditItem(item.packing_id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Checklist;
