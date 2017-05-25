import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectImage } from '../../actions/'

import {GridList, GridTile} from 'material-ui/GridList';

class Grid extends Component {
  constructor( props ){
    super( props );
    this.photos = this.props.photos;
    this.state = {
      columns : 5
    }
  }

  componentDidMount() {
    window.addEventListener( 'resize', this.resizeHandler.bind(this) )
    this.resizeHandler();
  }

  componentWillUpdate( nextProps, nextState ) {
    this.photos = nextProps.photos;
  }

  resizeHandler() {
    let col = this.state.columns;
    if( window.innerWidth < 1100 && window.innerWidth >= 900 ) {
      col = 4
    } else if( window.innerWidth < 900 && window.innerWidth >= 768 ) {
      col = 3
    } else if( window.innerWidth < 768 ) {
      col = 1
    } else {
      col = 5;
    }

    if( col !== this.state.columns ) {
      this.setState({
        columns: col
      })
    }
  }

  buttonClickHandler( photoObj ) {
    this.props.selectImage( photoObj );
  }

  render() {
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: '100%',
        height: '90%',
        overflowY: 'auto',
      },
    };

    return(
      <div className="grid-container">
        <GridList cellHeight={200} style={styles.gridList} cols={this.state.columns} padding={10}>
          {
            this.photos.map(
              ( photo ) => {
                let background = "https://farm" + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + "_" + photo.secret + "_b.jpg";
                let gridStyle = {
                  backgroundImage: `url(${background})`
                }
                return(
                  <GridTile key={photo.id} title={photo.title} subtitle={photo.description._content} titlePosition="top" titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
                    <button onClick={ () => { this.buttonClickHandler(photo) }}>
                      <div className="grid-img" style={gridStyle}>
                        <img className="acc-grid-img" src={background} alt={photo.title} />
                      </div>
                    </button>
                  </GridTile>
                )
              }
            )
          }
        </GridList>
      </div>
    )
  }
}

export default connect(
  ( state ) => {
    return { state }
  },
  { selectImage }
)(Grid);
