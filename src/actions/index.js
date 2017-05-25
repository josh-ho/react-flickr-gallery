import APP from '../constants.js';

export const FETCHING_DATA = 'FETCHING_DATA';
export const LOADED_DATA = 'LOADED_DATA';
export const UPDATED_DATA = 'UPDATED_DATA';
export const SELECTED_IMAGE = 'SELECTED_IMAGE';

export function loadingFlickrData(){
  return {
    type: FETCHING_DATA,
    lastUpdated: Date.now()
  }
}

export function loadedFlickrImages( data ) {
  return {
    type: LOADED_DATA,
    data,
    lastUpdated: Date.now()
  }
}

export function updatedFlickrImages( data ){
  return {
    type: UPDATED_DATA,
    data,
    lastUpdated: Date.now()
  }
}

export function getFlickrData( page = 1 ) {
  return function( dispatch ) {
      dispatch( loadingFlickrData() );
      return fetch( "https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=" + APP.apiKey + "&user_id=" + APP.flickerUserID + "&extras=title,tags,description,owner_name,icon_server,date_taken,views&page=" + page + "&format=json&nojsoncallback=1", {
        method: 'GET',
        mode: 'cors'
      } ).then( ( response ) => {
        if( response.ok ) {
          return response.json();
        }
      }).then( ( data ) => {
        if( page === 1 ) {
          dispatch( loadedFlickrImages( data.photos ) )
        } else {
          dispatch( updatedFlickrImages( data.photos ) )
        }

        return {
          images: data.photos
        }

      }).catch( ( err ) => {
      	// Error :(
        console.log( "ERROR", err );
      });
  }
}

export function selectImage( image ) {
  return {
    type: SELECTED_IMAGE,
    image,
    lastUpdated: Date.now()
  }
}
