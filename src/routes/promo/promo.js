import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Header from '@components/Header'
import styles from './promo.css'

class Promo extends Component {
  state = {}

  handleClick = () => {
    event.preventDefault()
    window.location.href = '/promo/bca?utm_source=molatv&utm_medium=web-promo'
  }

  render() {
    const { isMobile } = this.props

    return (
      <>
        <Header isMobile title="Promo" />
        {/* mobile view */}

        {isMobile && (
          <>
            <div className={styles.header} />
            <div className={styles.card__container}>
              <div className={styles.card__item} onClick={() => this.handleClick()}>
                <img
                  className={styles.card__img}
                  src="https://res-mola01.koicdn.com/image/bee0657a-b792-4e02-b609-db50a6b6e9f7/image.jpeg"
                  alt="promo-img"
                />
                <div className={styles.card__text__container}>
                  <div className={styles.card__title}>Promo BCA Bebas Streaming seluruh Pertandingan Liga Inggris</div>
                  <div className={styles.card__expiry}>
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA6CAYAAADoUOpSAAAAAXNSR0IArs4c6QAAA01JREFUaAXtW8FOFEEQrer1YOKFP1DuHtZEPanB23qCP1D8Ad2bkAyu7i4c4Qv0F7jpTQI3NJGEeF/+ABI10WW6fO06nZ3pGZgdJgZ6uhOYrk51Tb2q7umqmlmmf60/3HhNpJeIuJ2M+XIVohGR7OjxuNvr9Y4NLjb/+sPhVx8BG2zTTUSOdUvd6a2sjBRA95oA2hiAmedasbw3fYW/RdNpTGNaMFi5P1zHFmhY0/zYeLyRLQBvmtuDx4PHG2KBsNQb4mgLM3jcmqIhneDxhjjawrxme+nOCTKXg/TQ+RQTPxCS1hTnHvp6ii7dRaHgLnS4kUwQoS/M9COhy1xZ5BZy0Zt5vC5wkaP4dNxOKhV5k4rGkOl9h8JW2Xj8uwM5P4v4zxpHneAQhrxtebR6trb26pulS3beDobbyMOd1NvZ40K8VQV0ST3+OxuL2sq7qQOchWde4nmCL/uYA/yyK1yXfgF4XZa8KnKCx6+Kp+rS06mysrS6IrrSk11Yf8CZeT1RTp9KRyn1K6FnuQrH75jVfDJHYl5GADNK6LJXyGhD1maKH1VWJ4CB8pvE1SrOCDhS8rlFH+uSRQovAtLiU/cqIqQgcAx7vMhivo47Sx2B/QEW+nElwEwPMc8mKViZu1S01s67AdM9sNi4H7L2IWvmuJ9J5oSpnb2dA1yEu1G0spNlLEObJAV8VlkkO08ukqRAlk1SRKvnVZKUfn9jAc+ZT1n9wx7PWsR3Onjcdw9n8QWPZy3iO50Tq1Nt5ziJ7OKji0rFRhxBOMfZHo04w/fhjArnOLnneH6sbj73qharZ1cJpDxCYlFLg6z7VWShhoj7u3jCHq/FLVdIiBOyohxbWz4uMXVYccV8XCMf53lrS83LWLUjS5fs5ObjmOsAN0WIC8Tq8bQ+IuO9KKr8QiHz1oQ/R9HsLxQQq+MZOa3VpB/2uGsTv0eCx/32r4sueNy1id8jrsdbMuc35Ak6F7jIglfACxzpAid+MRisP/UB/JvBYFH05BcJWTzcHwxHRd+JZJl9oWPF8woJ24EvgErhwDc+f3+Mg1/lvMSEk1KTfGBSbPCSMuhJ8xKqJUc+4DoDAz5hk+VodXXb8KTyFvPWQVjazJ4daVrtZDPOP3kwBQLxmdz1AAAAAElFTkSuQmCC"
                      alt="calendar-logo"
                      className={styles.calendar__logo}
                    />
                    <span className={styles.expiry__date}>1 Jan 2020 - 28 Feb 2020</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {/* end mobile */}
        {!isMobile && (
          <>
            <div className={styles.header__desktop} />
            <img
              className={styles.banner__image}
              src="https://res-mola01.koicdn.com/image/ed37a5a0-e131-4a81-b767-79bb90eb10fb/image.png"
              alt="banner-promo"
            />
            <div className={styles.promo__text__container}>
              <div className={styles.promo__text}>Semua promo yang sedang berjalan</div>
            </div>
            <div className={styles.card__desktop__container}>
              <div className={styles.card__desktop__item} onClick={() => this.handleClick()}>
                <img
                  className={styles.card__desktop__img}
                  src="https://res-mola01.koicdn.com/image/bee0657a-b792-4e02-b609-db50a6b6e9f7/image.jpeg"
                  alt="promo-img"
                />
                <div className={styles.card__desktop__text__container}>
                  <div className={styles.card__desktop__title}>
                    Promo BCA Bebas Streaming seluruh Pertandingan Liga Inggris
                  </div>
                  <div className={styles.card__desktop__expiry}>
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA6CAYAAADoUOpSAAAAAXNSR0IArs4c6QAAA01JREFUaAXtW8FOFEEQrer1YOKFP1DuHtZEPanB23qCP1D8Ad2bkAyu7i4c4Qv0F7jpTQI3NJGEeF/+ABI10WW6fO06nZ3pGZgdJgZ6uhOYrk51Tb2q7umqmlmmf60/3HhNpJeIuJ2M+XIVohGR7OjxuNvr9Y4NLjb/+sPhVx8BG2zTTUSOdUvd6a2sjBRA95oA2hiAmedasbw3fYW/RdNpTGNaMFi5P1zHFmhY0/zYeLyRLQBvmtuDx4PHG2KBsNQb4mgLM3jcmqIhneDxhjjawrxme+nOCTKXg/TQ+RQTPxCS1hTnHvp6ii7dRaHgLnS4kUwQoS/M9COhy1xZ5BZy0Zt5vC5wkaP4dNxOKhV5k4rGkOl9h8JW2Xj8uwM5P4v4zxpHneAQhrxtebR6trb26pulS3beDobbyMOd1NvZ40K8VQV0ST3+OxuL2sq7qQOchWde4nmCL/uYA/yyK1yXfgF4XZa8KnKCx6+Kp+rS06mysrS6IrrSk11Yf8CZeT1RTp9KRyn1K6FnuQrH75jVfDJHYl5GADNK6LJXyGhD1maKH1VWJ4CB8pvE1SrOCDhS8rlFH+uSRQovAtLiU/cqIqQgcAx7vMhivo47Sx2B/QEW+nElwEwPMc8mKViZu1S01s67AdM9sNi4H7L2IWvmuJ9J5oSpnb2dA1yEu1G0spNlLEObJAV8VlkkO08ukqRAlk1SRKvnVZKUfn9jAc+ZT1n9wx7PWsR3Onjcdw9n8QWPZy3iO50Tq1Nt5ziJ7OKji0rFRhxBOMfZHo04w/fhjArnOLnneH6sbj73qharZ1cJpDxCYlFLg6z7VWShhoj7u3jCHq/FLVdIiBOyohxbWz4uMXVYccV8XCMf53lrS83LWLUjS5fs5ObjmOsAN0WIC8Tq8bQ+IuO9KKr8QiHz1oQ/R9HsLxQQq+MZOa3VpB/2uGsTv0eCx/32r4sueNy1id8jrsdbMuc35Ak6F7jIglfACxzpAid+MRisP/UB/JvBYFH05BcJWTzcHwxHRd+JZJl9oWPF8woJ24EvgErhwDc+f3+Mg1/lvMSEk1KTfGBSbPCSMuhJ8xKqJUc+4DoDAz5hk+VodXXb8KTyFvPWQVjazJ4daVrtZDPOP3kwBQLxmdz1AAAAAElFTkSuQmCC"
                      alt="calendar-logo"
                      className={styles.calendar__desktop__logo}
                    />
                    <span className={styles.expiry__desktop__date}>1 Jan 2020 - 28 Feb 2020</span>
                    <span className={styles.view__detail}>
                      LIHAT DETAIL
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAKKADAAQAAAABAAAAKAAAAABZLkSWAAABZ0lEQVRYCe3YTU7DMBAF4DelYs0e8XMEuAHcgBvQPWLRE1BuUBWxh5NwBbhBhITEsltQgvGAVOQWQp8zY4QUrxJnnPlkRxrHQN/6GfjbGRA2/e5VmCBg77XB5fNYKnY8G08BFRcHXHwkCZjXGzh+OpN7NikTP2CCI+5kES/YGja4274OB4s+hwsK+BYwTQwFkNQSKy4u800cdJpAHZebBpZGZgFLIrOBpZCdgCWQnYHeSBOgJ9IM6IU0BXogzYHWSBdgG/KlwSGzC6JqsSZetz2eyygAt0l8rN2bQ0ySvl9u3IAteauWZyuP3IDfbiqAh0G9tCNaIaUdLt/gTzipcVSNZZ4S2u/MgZY4pZsCrXGmQA+cGdALZwL0xHUGeuM6AUvgsoGlcFnAkjgFUqUu4vToI/0njuUrp0Jo8nUaBYy4r6OPz7e74jQFBVw6+nDHKZAudTuzMBLBvu5K2MKvCfvWz8B/m4F3Q43bn44bHEAAAAAASUVORK5CYII="
                        alt="calendar-logo"
                        className={styles.calendar__desktop__logo}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  }
}

export default compose(withStyles(styles), connect(mapStateToProps, null))(Promo)
