import { get } from 'axios';
import { HOME_PLAYLIST_ENDPOINT } from './endpoints';
import utils from './util';

const getHomePlaylist = payload => {
    return get(`${HOME_PLAYLIST_ENDPOINT}/mola-home`, { ...payload }).then(
        response => {
            const result = utils.normalizeHomePlaylist(response);
            return {
                meta: {
                    status: result[0].length > 0 ? "success" : "no_result"
                },
                data: [...result[0]] || []
                }
            }
    );
};

export default { getHomePlaylist };
