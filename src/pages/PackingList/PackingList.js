import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  useTheme,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  IconButton,
  Modal,
} from "@mui/material";
import PackingItems from "../../components/PackingItems/PackingItems";
import { tokens } from "../../theme";
import axios from "axios";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AddPackingList from "../../components/AddPackingList/AddPackingList";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const PackingList = () => {
  const [items, setItems] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [editItemText, setEditItemText] = useState("");
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [addItem, setAddItem] = useState(false);
  const [selectedClimbingType, setSelectedClimbingType] = useState(
    "Indoor Sport Climbing"
  );
  const [indoorBouldering, setIndoorBouldering] = useState([]);
  const [outdoorBouldering, setOutdoorBouldering] = useState([]);
  const [indoorSportClimbing, setIndoorSportClimbing] = useState([]);
  const [indoorTopRope, setIndoorTopRope] = useState([]);
  const [outdoorSportClimbing, setOutdoorSportClimbing] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const typeData = [
    "Indoor Bouldering",
    "Outdoor Bouldering",
    "Indoor Sport Climbing",
    "Indoor Top Rope",
    "Outdoor Sport Climbing",
  ];

  useEffect(() => {
    axios.get(`${SERVER_URL}/packinglist`).then((res) => {
      const sortedItems = res.data.sort((a, b) => a.packing_id - b.packing_id);
      setItems(sortedItems);
      setIndoorBouldering(
        sortedItems.filter((item) => item.climbingtype_name === typeData[0])
      );
      setOutdoorBouldering(
        sortedItems.filter((item) => item.climbingtype_name === typeData[1])
      );
      setIndoorSportClimbing(
        sortedItems.filter((item) => item.climbingtype_name === typeData[2])
      );
      setIndoorTopRope(
        sortedItems.filter((item) => item.climbingtype_name === typeData[3])
      );
      setOutdoorSportClimbing(
        sortedItems.filter((item) => item.climbingtype_name === typeData[4])
      );
    });
  }, [editItemId, typeData]);

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
  const handleEditText = (value) => {
    setEditItemText(value);
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

  const handleItemClose = () => {
    setAddItem(false);
  };

  const handleAdd = () => {
    setAddItem(true);
  };

  return (
    <Box
      display="flex"
      sx={{
        flexDirection: "column",
        alignItems: "center",
        margin: 0,
        maxHeight: "80vh",
      }}
    >
      <Modal
        open={addItem}
        onClose={handleItemClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <AddPackingList typeData={typeData} />
        </>
      </Modal>
      <Box m="1.5rem 0">
        <Typography
          variant="h2"
          fontWeight="500"
          sx={{ color: colors.primary[100] }}
        >
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
          maxHeight: "100vh",
          overflow: "auto",
          bgcolor: `${colors.primary[400]}`,
        }}
      >
        <Box
          display="flex"
          width="100%"
          sx={{ justifyContent: "flex-end", alignContent: "center" }}
        >
          <FormControl
            sx={{
              mb: "1.5rem",
              display: "flex",
              justifyContent: "center",
              minWidth: "90%",
            }}
          >
            <InputLabel id="climbingtype">Type of Climbing</InputLabel>
            <Select
              label="climbingtype"
              name="climbingtype"
              value={selectedClimbingType}
              onChange={(event) => {
                setSelectedClimbingType(event.target.value);
              }}
            >
              {typeData.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton
            onClick={handleAdd}
            sx={{ width: "2.5rem", height: "2.5rem" }}
          >
            <AddCircleOutlineOutlinedIcon />
          </IconButton>
        </Box>

        {/* {selectedClimbingType === "" &&
          items.map((item) => (
            <PackingItems
              key={item.packing_id}
              id={item.packing_id}
              packing_item={item.packing_item}
              check={item.check}
              redColor={colors.redAccent[600]}
              colour={colors.primary[100]}
              editItemId={editItemId}
              editItemText={editItemText}
              onToggleCheck={handleToggleCheck}
              onEditItem={handleEditItem}
              onDeleteConfirmation={handleDeleteConfirmation}
              onSaveItem={handleSaveItem}
              handleEditText={handleEditText}
            />
          ))} */}
        {selectedClimbingType === typeData[0] &&
          indoorBouldering.map((item) => (
            <PackingItems
              key={item.packing_id}
              id={item.packing_id}
              packing_item={item.packing_item}
              check={item.check}
              redColor={colors.redAccent[600]}
              colour={colors.primary[100]}
              editItemId={editItemId}
              editItemText={editItemText}
              onToggleCheck={handleToggleCheck}
              onEditItem={handleEditItem}
              onDeleteConfirmation={handleDeleteConfirmation}
              onSaveItem={handleSaveItem}
              handleEditText={handleEditText}
            />
          ))}
        {selectedClimbingType === typeData[1] &&
          selectedClimbingType === "Outdoor Bouldering" &&
          outdoorBouldering.map((item) => (
            <PackingItems
              key={item.packing_id}
              id={item.packing_id}
              packing_item={item.packing_item}
              check={item.check}
              redColor={colors.redAccent[600]}
              colour={colors.primary[100]}
              editItemId={editItemId}
              editItemText={editItemText}
              onToggleCheck={handleToggleCheck}
              onEditItem={handleEditItem}
              onDeleteConfirmation={handleDeleteConfirmation}
              onSaveItem={handleSaveItem}
              handleEditText={handleEditText}
            />
          ))}
        {selectedClimbingType === typeData[2] &&
          indoorSportClimbing.map((item) => (
            <PackingItems
              key={item.packing_id}
              id={item.packing_id}
              packing_item={item.packing_item}
              check={item.check}
              redColor={colors.redAccent[600]}
              colour={colors.primary[100]}
              editItemId={editItemId}
              editItemText={editItemText}
              onToggleCheck={handleToggleCheck}
              onEditItem={handleEditItem}
              onDeleteConfirmation={handleDeleteConfirmation}
              onSaveItem={handleSaveItem}
              handleEditText={handleEditText}
            />
          ))}
        {selectedClimbingType === typeData[3] &&
          indoorTopRope.map((item) => (
            <PackingItems
              key={item.packing_id}
              id={item.packing_id}
              packing_item={item.packing_item}
              check={item.check}
              colour={colors.primary[100]}
              redColor={colors.redAccent[600]}
              editItemId={editItemId}
              editItemText={editItemText}
              onToggleCheck={handleToggleCheck}
              onEditItem={handleEditItem}
              onDeleteConfirmation={handleDeleteConfirmation}
              onSaveItem={handleSaveItem}
              handleEditText={handleEditText}
            />
          ))}
        {selectedClimbingType === typeData[4] &&
          outdoorSportClimbing.map((item) => (
            <PackingItems
              key={item.packing_id}
              id={item.packing_id}
              packing_item={item.packing_item}
              check={item.check}
              redColor={colors.redAccent[600]}
              colour={colors.primary[100]}
              editItemId={editItemId}
              editItemText={editItemText}
              onToggleCheck={handleToggleCheck}
              onEditItem={handleEditItem}
              onDeleteConfirmation={handleDeleteConfirmation}
              onSaveItem={handleSaveItem}
              handleEditText={handleEditText}
            />
          ))}
      </List>

      <Dialog open={deleteConfirmationOpen} onClose={handleDeleteCancel}>
        <DialogTitle style={{ color: colors.redAccent[400] }}>
          {" "}
          Delete Item
        </DialogTitle>
        <DialogContent>
          Are you sure you want to delete this item?
        </DialogContent>
        <DialogActions>
          <Button
            style={{ color: colors.primary[100] }}
            onClick={handleDeleteCancel}
          >
            Cancel
          </Button>
          <Button
            style={{ color: colors.redAccent[500] }}
            onClick={handleDeleteItem}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PackingList;
