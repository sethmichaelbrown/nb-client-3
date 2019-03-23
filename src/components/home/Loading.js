
import React from 'react';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    return (
      <div className='sweet-loading'>
        <ClipLoader
          css={override}
          sizeUnit={"px"}
          size={150}
          color={'#123abc'}
          loading={this.state.loading}
        />
      </div>
    )
  }
}

export default Loading
// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import CircularProgress from '@material-ui/core/CircularProgress';


// const styles = theme => ({
//   progress: {
//     margin: theme.spacing.unit * 2,
//   },
// });

// function CircularIndeterminate(props) {
//   const { classes } = props;
//   return (
//     <div>
//       <CircularProgress className={classes.progress} color='primary' />
//     </div>
//   );
// }

// CircularIndeterminate.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(CircularIndeterminate);