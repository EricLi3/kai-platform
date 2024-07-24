import { useEffect } from 'react';

import { Grid, Typography } from '@mui/material';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ToolsListingContainer from '@/components/ToolsListingContainer';

// import { AUTH_CONTENT } from '@/constants/auth';
// import ALERT_COLORS from '@/constants/notification';

import styles from './styles';

// import { AuthContext } from '@/providers/GlobalProvider';

const HomePage = (props) => {
  const { data, loading } = props;

  const { data: userData } = useSelector((state) => state.user);
  const router = useRouter();
  const userName = userData?.fullName;

  useEffect(() => {
    if (router.query.is_login === 'true') {
      toast.success(
        <>
          <div>Log In Successful!</div>
          <div>👋 Welcome Back! {userName || 'Anonymous'}</div>
        </>,
        {
          position: 'top-right',
          autoClose: 3000,
        }
      );
      router.replace('/');
    }

    if (router.query.is_signup === 'true') {
      toast.success(
        <>
          <div>Sign Up Successful!</div>
          <div>👋 Welcome to KAI! {userName || 'Anonymous'}</div>
        </>,
        {
          position: 'top-right',
          autoClose: 3000,
        }
      );
      router.replace('/');
    }
  }, [router.query, userName]);

  const renderTitle = () => {
    return (
      <Grid {...styles.titleGridProps}>
        <Typography {...styles.titleProps}>
          Welcome to{' '}
          <Typography {...styles.highlightTextProps}>Kai Tools</Typography> 👋
        </Typography>
        <Typography {...styles.subtitleProps}>
          Made for{' '}
          <Typography {...styles.highlightTextProps}>educators</Typography>
        </Typography>
      </Grid>
    );
  };

  return (
    <>
      <ToastContainer />
      <Grid {...styles.mainGridProps}>
        {renderTitle()}
        <ToolsListingContainer
          data={data}
          loading={loading}
          category="All Tools"
        />
      </Grid>
    </>
  );
};
export default HomePage;
