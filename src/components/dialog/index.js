import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectImage } from '../../actions/'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class DialogContainer extends Component {
  constructor( props ){
    super( props );
    this.state = {
      open : false
    }

    this.willOpen = false;
    this.photo = this.props.selectedImage;
    if( typeof this.photo === 'undefined' ) {
      this.photo = {
        title : '',
        farm : '',
        server : '',
        id : '',
        secret : ''
      }
    }
  }

  handleClose() {
    this.photo = {};
    this.props.selectImage( {} );
    this.setState({
      open: false
    })
  }

  componentWillUpdate( nextProps, nextState ) {
    this.photo = nextProps.flickr;
  }

  componentDidUpdate( prevProps, prevState ) {
    if( this.photo.title && !this.state.open && !prevState.open ){
      this.setState({
        open: true
      })
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose.bind(this)}
      />
    ];

    return(
      <Dialog
          title={this.photo.title}
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
        >
          <img className="large-img" src={"https://farm" + this.photo.farm + '.staticflickr.com/' + this.photo.server + '/' + this.photo.id + "_" + this.photo.secret + "_b.jpg"} alt={this.photo.title} />
        </Dialog>
    )
  }
}

export default connect(
  ( state ) => {
    return {
      flickr : state.reducers.selectedImage.selectedImage
    }
  },
  { selectImage }
)(DialogContainer);
