import { Paper } from '@mui/material';
import { styled } from '@mui/system';

export const StyledColumn = styled(Paper)(({ theme }) => ({
  backgroundColor: '#f2f2f2',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  marginRight: theme.spacing(2),
  margin: theme.spacing(5),
}));
export const StyledBoard = styled('div')({
  display: 'flex',
  overflowX: 'auto',
  padding: '8px',
});

export const StyledContainer = styled('div')({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '16px',
});