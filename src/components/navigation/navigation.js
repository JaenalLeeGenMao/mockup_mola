import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './navigation.css';

class Navigation extends Component {
    render() {
        const {
            isActive = false,
            color = "black",
            dataSet = {
                "data": [
                  {
                    "id": "mola-home",
                    "type": "playlists",
                    "attributes": {
                      "title": "Mola Home",
                      "description": null,
                      "visibility": 0,
                      "contentType": 1,
                      "countryCode": null,
                      "coverUrl": null,
                      "iconUrl": null,
                      "sortOrder": 0,
                      "parentId": null,
                      "status": 1,
                      "createdAt": "2017-10-17T00:39:51.000Z",
                      "videos": [],
                      "playlists": [
                        {
                          "id": "christmas",
                          "type": "playlists",
                          "attributes": {
                            "title": "Special for Christmas",
                            "description": null,
                            "visibility": 0,
                            "contentType": 1,
                            "countryCode": null,
                            "coverUrl": null,
                            "iconUrl": null,
                            "sortOrder": 0,
                            "parentId": "mola-home",
                            "status": 1,
                            "createdAt": "2017-10-17T00:39:51.000Z"
                          }
                        },
                        {
                          "id": "f-horror",
                          "type": "playlists",
                          "attributes": {
                            "title": "Horror",
                            "description": null,
                            "visibility": 0,
                            "contentType": 1,
                            "countryCode": null,
                            "coverUrl": null,
                            "iconUrl": null,
                            "sortOrder": 100,
                            "parentId": "mola-home",
                            "status": 1,
                            "createdAt": "2017-10-17T00:39:51.000Z"
                          }
                        },
                        {
                          "id": "f-action",
                          "type": "playlists",
                          "attributes": {
                            "title": "Action",
                            "description": null,
                            "visibility": 0,
                            "contentType": 1,
                            "countryCode": null,
                            "coverUrl": null,
                            "iconUrl": null,
                            "sortOrder": 120,
                            "parentId": "mola-home",
                            "status": 1,
                            "createdAt": "2017-10-17T00:39:51.000Z"
                          }
                        }
                      ]
                    }
                  }
                ]
              }
        } = this.props;
        return (
            <div className={styles.navigation__wrapper}>
                <Link className={[styles.navigation__links, isActive ? styles.isActive : ""].join(" ")} to="/" style={{ color }}>
                    {isActive && <hr style={{ "border-bottom": `1px solid ${color}` }} />}
                    ACTION
                </Link>
                <Link className={[styles.navigation__links, isActive ? styles.isActive : ""].join(" ")} to="/" style={{ color }}>
                    {isActive && <hr style={{ "border-bottom": `1px solid ${color}` }} />}
                    ADVENTURE
                </Link>
                <Link className={[styles.navigation__links, isActive ? styles.isActive : ""].join(" ")} to="/" style={{ color }}>
                    {isActive && <hr style={{ "border-bottom": `1px solid ${color}` }} />}
                    COMEDY
                </Link>
                <Link className={[styles.navigation__links, isActive ? styles.isActive : ""].join(" ")} to="/" style={{ color }}>
                    {isActive && <hr style={{ "border-bottom": `1px solid ${color}` }} />}
                    DOCUMENTARY
                </Link>
                <Link className={[styles.navigation__links, isActive ? styles.isActive : ""].join(" ")} to="/" style={{ color }}>
                    {isActive && <hr style={{ "border-bottom": `1px solid ${color}` }} />}
                    DRAMA
                </Link>
                <Link className={[styles.navigation__links, isActive ? styles.isActive : ""].join(" ")} to="/" style={{ color }}>
                    {isActive && <hr style={{ "border-bottom": `1px solid ${color}` }} />}
                    FAMILY
                </Link>
                <Link className={[styles.navigation__links, isActive ? styles.isActive : ""].join(" ")} to="/" style={{ color }}>
                    {isActive && <hr style={{ "border-bottom": `1px solid ${color}` }} />}
                    HORROR
                </Link>
                <Link className={[styles.navigation__links, isActive ? styles.isActive : ""].join(" ")} to="/" style={{ color }}>
                    {isActive && <hr style={{ "border-bottom": `1px solid ${color}` }} />}
                    ROMANCE
                </Link>
                <Link className={[styles.navigation__links, isActive ? styles.isActive : ""].join(" ")} to="/" style={{ color }}>
                    {isActive && <hr style={{ "border-bottom": `1px solid ${color}` }} />}
                    SCI-FI
                </Link>
                <Link className={[styles.navigation__links, isActive ? styles.isActive : ""].join(" ")} to="/" style={{ color }}>
                    {isActive && <hr style={{ "border-bottom": `1px solid ${color}` }} />}
                    THRILLER
                </Link>
            </div>
        );
    }
}

export default Navigation;