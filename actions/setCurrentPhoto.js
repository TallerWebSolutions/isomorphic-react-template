import { SET_CURRENT_PHOTO } from './';

export default function (context, payload, done) {
	context.dispatch(SET_CURRENT_PHOTO, payload.current_photo);
	done();
};