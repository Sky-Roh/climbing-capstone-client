import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import "./Dashboard.scss"
import mountNemo from "../../assets/images/mount-nemo.jpg"

const Dashboard = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems="center">
            <Typography variant='h3' color={colors.grey[100]}>welcome</Typography>
        </Box>
    );
};

export default Dashboard;