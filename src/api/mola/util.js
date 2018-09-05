const normalizeHomePlaylist = (response) => {
    const {data} = response.data
    if (data && data.length > 0) {
        return data.map(({attributes: {playlists}}) =>
            playlists.map((playlist) => {
                const {
                    id,
                    type,
                    attributes: {
                        title,
                        description,
                        shortDescription,
                        sortOrder,
                        cover: {
                            layer1,
                            layer2,
                            layer3,
                            isDark,
                        },
                    },
                } = playlist
                return {
                    id,
                    title,
                    sortOrder,
                    description,
                    shortDescription: shortDescription || '',
                    layer3: layer3 || '',
                    layer2: layer2 || '',
                    layer1: layer1 || '',
                    isDark: isDark || 1,
                    isActive: false,
                    type,
                }
            }).sort((a, b) => a.sortOrder - b.sortOrder)
        )
    }
    return []
}

const normalizeHomeVideo = (response) => {
    const {data} = response.data
    if (data && data.length > 0) {
        return data.map(({attributes: {videos}}) =>
            videos.map((video) => {
                const {
                    id,
                    type,
                    attributes: {
                        title,
                        description,
                        shortDescription,
                        displayOrder,
                        layer3,
                        layer2,
                        layer1,
                        isDark,
                    },
                } = video
                return {
                    id,
                    title,
                    displayOrder,
                    description,
                    shortDescription,
                    layer3: layer3 || '',
                    layer2: layer2 || '',
                    layer1: layer1 || '',
                    isDark: isDark || 1,
                    type,
                }
            }).sort((a, b) => a.displayOrder - b.displayOrder)
        )
    }
    return []
}

export default {
    normalizeHomePlaylist,
    normalizeHomeVideo,
}
