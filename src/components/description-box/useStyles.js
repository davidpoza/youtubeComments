import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    borderBottom: '1px solid #dcdcdc',
    paddingLeft: '65px',
    paddingBottom: '1em',
    fontSize: '0.9em',
  },
  dropDown: {
    height: '5em',
    overflow: 'hidden',
    '& a:link, & a:visited': {
      color: '#2e79da',
      textDecoration: 'none',
    },
  },
  paragraph: {
    margin: 0,
    padding: 0,
  },
  dropDownOpen: {
    height: 'auto',
  },
});
