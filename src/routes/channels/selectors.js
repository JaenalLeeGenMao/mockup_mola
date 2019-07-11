import _sortBy from 'lodash/sortBy'

export const getChannelProgrammeGuides = state => {
  const { programmeGuides } = state

  if (!programmeGuides.loading && programmeGuides.data) {
    let mergedSchedules = []

    Object.keys(programmeGuides.data).map(playlistId => {
      let currentSchedule = { start: new Date('1970-01-01') }

      programmeGuides.data[playlistId].data.map(schedule => {
        if (new Date(schedule.start).getTime() <= new Date().getTime() && new Date(schedule.start).getTime() >= new Date(currentSchedule.start).getTime()) {
          currentSchedule = schedule
        }
      })

      let nowPlaying = []
      if (currentSchedule.title) {
        nowPlaying.push(currentSchedule)
      }

      const filteredSchedule = nowPlaying.concat(
        programmeGuides.data[playlistId].data
          .map(schedule => {
            return schedule
          })
          .filter(schedule => new Date(schedule.start).getTime() > new Date().getTime())
      )

      const sortSchedule = filteredSchedule.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())

      // const todaySchedule = sortSchedule.filter(schedule => new Date(schedule.start).getDate() === today)
      const playlist = {
        id: playlistId,
        title: programmeGuides.data[playlistId].playlistTitle,
        videos: sortSchedule,
      }
      mergedSchedules.push(playlist)
    })

    const schedule = _sortBy(mergedSchedules, schedule => schedule.id)
    return schedule
  }
  return []
}
