import React from 'react';
import styled from 'styled-components';
import { media } from '../tools/server';
import config from '../config';

const LeftBarContainer = styled.section`
  flex: 0 1 auto;
  background-color: #fff;
  color: #fff;
  width: 260px;
  height: 100vh;
  font-size: 16px;
  color: #000;
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  .content-section {
    flex: 0 1 auto;
    display: flex;
    flex-direction: column;
    .profpic {
      flex: 0 1 auto;
      width: 100%;
      heigh: auto;
    }
    .introduction {
      flex: 0 1 auto;
      .name-brand {
        font-size: 1.5rem;
        text-align: center;
        margin: 16px;
        display: block;
      }
      .desc {
        font-size: 0.8rem;
        text-align: center;
        letter-spacing: 2px;
        color: #cfd8dc;
        display: block;
      }
    }
  }
  .social-section {
    display: flex;
    flex: 0 1 auto;
    flex-wrap: wrap;
    align-items: space-around;
    justify-content: center;
    margin: 1rem 0;
    .social-icon {
      text-decoration: none;
      font-size: 3rem;
      text-align: center;
      flex: 1 1 auto;
      i {
        line-height: 3rem;
      }
    }
  }
  ${media.tablet`
    height: auto;
    width: 100vw;
    .content-section {
      align-items: center;
      flex: 1 1 auto;
      .profpic {
        padding: 1rem;
        width: 5rem;
        height: auto;
        border-radius: 50%;
      }
      .introduction {
        display: flex;
        margin: 0.25rem;
        flex-direction: column;
        justify-content: space-around;
        .name-brand {
          flex: 0 1 auto;
          margin: 0;
          text-transform: uppercase;
        }
        .desc {
          display: none;
        }
      }
    }
    .social-section {
      margin: 0;
      .social-icon {
        min-width: 0.5rem;
        font-size: 2rem;
        i {
          line-height: 2rem;
        }
        span {
          display: none;
        }
      }
    }
  `};
`;

export default class AppLeftSide extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <LeftBarContainer>
        <div className="content-section">
          <img
            className="profpic"
            src="/static/img/profile.jpg"
            alt={config.blog.name}
          />
          <div className="introduction">
            <span className="name-brand">{config.blog.name}</span>
            <span className="desc">{config.blog.desc}</span>
          </div>
        </div>
        <div className="social-section">
          {config.socialMedia.map(s => {
            return (
              <a
                className="social-icon"
                href={s.href}
                target="_blank"
                rel="noopener"
                key={Math.random()}
                aria-label={s.name}
                aria-hidden
              >
                <i
                  className={`fa fa-${s.icon}`}
                  color={s.color}
                  size={s.size}
                />
              </a>
            );
          })}
        </div>
      </LeftBarContainer>
    );
  }
}
