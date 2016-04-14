import React, {Component, Children, PropTypes} from 'react';
import Firebase from 'firebase';

const eventTypes = [ 'value', 'child_added', 'child_changed', 'child_removed', 'child_moved'];

export default class FireAct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
    this._setRef();
    this._setListener();
  }

  _destroyListener() {
    this.ref.off(this.props.eventType, this._updateData);
  }

  _setListener() {
    this.ref.on(this.props.eventType, this._updateData.bind(this));
  }

  _setRef() {
    this.ref = new Firebase(this.props.url);

    if(this.props.push) {
      this.ref = this.ref.push();
    }

    if(this.props.limitToFirst) {
      console.log(this.props.limitToFirst);
      this.ref = this.ref.limitToFirst(this.props.limitToFirst);
    }

    if(this.props.limitToLast) {
      this.ref = this.ref.limitToLast(this.props.limitToLast);
    }

    if(this.props.orderByChild) {
      this.ref = this.ref.orderByChild(this.props.orderByChild);
    }

    if(this.props.orderByKey) {
      this.ref = this.ref.orderByKey();
    }

    if(this.props.orderByValue) {
      this.ref = this.ref.orderByValue();
    }

    if(this.props.orderByPriority) {
      this.ref = this.ref.orderByPriority();
    }

    if(this.props.startAt) {
      this.ref = this.ref.startAt(this.props.startAt);
    }

    if(this.props.endAt) {
      this.ref = this.ref.endAt(this.props.endAt);
    }

    if(this.props.equalTo) {
      this.ref = this.ref.equalTo(this.props.equalTo);
    }
  }

  _updateData(snap) {
    let snapVal = snap.val();
    (this.props.onDataChange) ? this.props.onDataChange(snapVal) : null;
  }

  _updateRef(data) {
    this.ref.update(data);
  }

  componentDidUpdate() {
    (this.props.bindTo) ? this._updateRef(this.props.bindTo) : null;
  }

  componentWillUnmount() {
    this._destroyListener();
  }

  render() {
    if(this.props.children) {
      let prop = {};
      prop[this.props.dataProp] = this.state.data;
      const child = React.cloneElement(this.props.children, prop);
      return Children.only(child);
    }
    else {
      return null;
    }
  }
}

FireAct.defaultProps = {
  dataProp: 'data',
  eventType: 'value'
}

FireAct.propTypes = {
  bindTo: PropTypes.any,
  children: PropTypes.element,
  endAt: PropTypes.any,
  equalTo: PropTypes.any,
  eventType: PropTypes.oneOf(eventTypes).isRequired,
  limitToFirst: PropTypes.number,
  limitToLast: PropTypes.number,
  dataProp: PropTypes.string.isRequired,
  onDataChange: PropTypes.func,
  orderByChild: PropTypes.string,
  orderByKey: PropTypes.bool,
  orderByValue: PropTypes.bool,
  orderByPriority: PropTypes.bool,
  push: PropTypes.bool,
  startAt: PropTypes.any,
  url: PropTypes.string.isRequired
}