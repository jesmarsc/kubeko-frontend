import React, { Component } from 'react';
import ClusterCard from './Card/ClusterCard';

import styles from './Content.module.css';

export default class Content extends Component {
  render() {
    let clusters = null;
    if (this.props.clusters) {
      clusters = this.props.clusters.map(cluster => (
        <ClusterCard ip={cluster} key={cluster} />
      ));
    }
    return <div className={styles.container}>{clusters}</div>;
  }
}
