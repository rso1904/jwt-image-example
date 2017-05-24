import {
    IMAGE_UPLOAD,
    IMAGE_UPLOAD_SUCCESS,
    IMAGE_UPLOAD_FAILURE,
    IMAGE_LIST,
    IMAGE_LIST_SUCCESS,
    IMAGE_LIST_FAILURE,
    IMAGE_DELETE,
    IMAGE_DELETE_SUCCESS,
    IMAGE_DELETE_FAILURE
} from './ActionTypes';
import axios from 'axios';

export function imageListRequest(writer, hashtags) {
    return (dispatch) => {
        dispatch(imageList());
        
        let url = '/api/upload';
        
        if(typeof writer !== "undefined") {
            url = `${url}/${writer}`;
        } else if(typeof hashtags !== "undefined") {
            url = `${url}/hashtags/${hashtags}`;
        }
        
         return axios.get(url)
                     .then((response) => {
                         dispatch(imageListSuccess(response.data));
                     }).catch((error) => {
                         dispatch(imageListFailure());
                     });
    };
}

export function imageList() {
    return {
        type: IMAGE_LIST
    };
}

export function imageListSuccess(images) {
    return {
        type: IMAGE_LIST_SUCCESS,
        images
    };
}

export function imageListFailure() {
    return {
        type: IMAGE_LIST_FAILURE
    };
}


export function imageUploadRequest(imageFile) {
    return (dispatch) => {
        dispatch(imageUpload())
        
        let imageUrl = imageFile;

        return axios.post('/api/upload', { imageUrl })
            .then((response) => {
                dispatch(imageUploadSuccess());
            }).catch((error) => {
                dispatch(imageUploadFailure());
            });

    };
}

export function imageUpload() {
    return {
        type: IMAGE_UPLOAD
    };
}

export function imageUploadSuccess() {
    return {
        type: IMAGE_UPLOAD_SUCCESS
    };
}

export function imageUploadFailure() {
    return {
        type: IMAGE_UPLOAD_FAILURE
    };
}

export function imageDeleteRequest(id, index) {
    return (dispatch) => {
        dispatch(imageDelete());

        return axios.delete('/api/upload/delete/' + id)
            .then((response) => {
                dispatch(imageDeleteSuccess());
            }).catch((error) => {
                dispatch(imageDeleteFailure());
            });
    };
}

export function imageDelete() {
    return {
        type: IMAGE_DELETE
    };
}

export function imageDeleteSuccess() {
    return {
        type: IMAGE_DELETE_SUCCESS
    };
}

export function imageDeleteFailure() {
    return {
        type: IMAGE_DELETE_FAILURE
    };
}