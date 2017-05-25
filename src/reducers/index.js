import { combineReducers } from 'redux'
import { LOADED_DATA, UPDATED_DATA, SELECTED_IMAGE } from '../actions/'

function flickrImages( state = [], action ) {
  switch( action.type ) {
    case LOADED_DATA:
      return Object.assign( {}, {
        images : action.data,
        lastUpdated : action.lastUpdated
      });
    case UPDATED_DATA :
      return Object.assign( {}, {
        images : action.data,
        lastUpdated : action.lastUpdated
      });
    default :
      return state;
  }
}

function selectedImage( state = [], action ) {
  if( action.type === SELECTED_IMAGE ) {
    return Object.assign( {}, {
      selectedImage : action.image
    })
  } else {
    return state
  }
}

const flickrReducer = combineReducers({
  flickrImages,
  selectedImage
});

export default flickrReducer;
