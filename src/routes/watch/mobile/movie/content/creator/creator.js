import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from './creator.css'

class Creator extends React.Component {
  render() {
    const { people } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.inner_box_header}>
          <span>{'Casts & Crews'}</span>
        </div>
        <div className={styles.people__wrapper}>
          <div className={styles.people__wrapper__scroller}>
            {people.map(person => {
              return (
                <div key={person.id} className={styles.person__wrapper}>
                  {person.attributes.imageUrl ? <img src={person.attributes.imageUrl} /> : <div className={styles.castImg_dummy} />}
                  <div>{person.attributes.name}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Creator)
