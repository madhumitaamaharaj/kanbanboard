import { Paper } from '@mui/material';
import { styled } from '@mui/system';

export const StyledColumn = styled(Paper)(({ theme }) => ({
  backgroundColor: '#f2f2f2',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  marginRight: theme.spacing(2),
  margin: theme.spacing(5),
}));
