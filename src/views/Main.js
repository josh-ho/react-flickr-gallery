import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFlickrData } from '../actions/'

import Header from '../components/header/'
import Grid from '../components/grid/'
import DialogContainer from '../components/dialog/'
import ReactPaginate from 'react-paginate';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import APP from '../constants.js'

import './assets/scss/main.scss';

class Main extends Component {
  constructor( props ) {
    super( props );

    this.photos = [];
    this.totalPhotos = 0;

    //intiailize the flicker load
    this.props.getFlickrData();
  }

  componentWillUpdate( nextProps, nextState ){
    this.photos = nextProps.flickrImages.images.photo;
    this.totalPhotos = parseInt( nextProps.flickrImages.images.total, 10 ) / APP.flickrNumPicsPerPage;
  }

  pageChange( data ){
    let page = data.selected + 1;
    this.props.getFlickrData( page );
  }

  render() {
    return(
      <div className="main">
        <MuiThemeProvider>
          <div>
            <Header />
            <Grid photos={this.photos} />
            <div className="pagination">
              <ReactPaginate
                pageCount={this.totalPhotos}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                previousLabel={"previous"}
                nextLabel={"next"}
                initialPage={0}
                onPageChange={this.pageChange.bind(this)} />
            </div>
            <DialogContainer />
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default connect(
  ( state ) => {
    return {
      flickrImages : state.reducers.flickrImages
    }
  },
  { getFlickrData }
)(Main);
