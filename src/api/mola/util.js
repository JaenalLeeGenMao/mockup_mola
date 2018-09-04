const normalizeHomePlaylist = response => {
	const { data } = response.data;
	if (data && data.length > 0) {
		return data.map(({ attributes: { playlists } }) =>
			playlists.map(playlist => {
				const {
					id,
					type,
					attributes: {
						title,
						coverUrl,
						description,
						sortOrder,
						cover: {
							layer1 = layer1 || "",
							layer2 = layer2 || "",
							layer3 = layer3 || "",
							isDark = isDark || "",
						}
					},
				} = playlist;
				return {
					id,
					title,
					description,
					sortOrder,
					layer3: coverUrl || layer3,
					layer2: layer2 || "",
					layer1: layer1 || "",
					isDark: isDark || 1,
					type
				};
			}),
		);
	}

	return {
		meta: {
			status: 'no_result',
		},
		data: {},
	};
};

export default {
  normalizeHomePlaylist,
};
