import { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  useTheme,
  Box,
  Typography,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import EditIcon from "@mui/icons-material/Edit";
import { tokens } from "../../theme";

//text colors.grey[100]   
//backgroud colors.primary[400]

const PackingList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [checked, setChecked] = useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box>
        <Typography mb="1.5rem" variant="h4" color={colors.grey[100]}>
          Packing List
        </Typography>
      </Box>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: `${colors.primary[400]}` }}
      >
        {[0, 1, 2, 3].map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem key={value} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(value)}
                dense
              >
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                  color="secondary"
                />
              </ListItemButton>

              <ListItemText
                primaryTypographyProps={{
                  style: { color: colors.primary[100] },
                }}
                id={labelId}
                primary={`Line item ${value + 1}`}
              />
              <IconButton edge="end" aria-label="comments">
                <EditIcon />
              </IconButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default PackingList;
