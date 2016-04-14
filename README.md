#FireAct
A Firebase JSX Component

##Install
```npm i --save fireact```
Note: It is not published yet to the NPM registry

###Usage
 DO NOT USE :) This is a Proof of Concept and I'm still experimenting on the API itself. Expect some breaking changes.
 Any suggestions are welcome, ping me [@ the Firebase Slack](https://firebase-community.slack.com) (reactjs channel). My handle there is ```florian```.
####Props
```javascript
const eventTypes = [ 'value', 'child_added', 'child_changed', 'child_removed', 'child_moved'];

FireAct.defaultProps = {
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
  once: PropTypes.bool,
  onDataChange: PropTypes.func,
  orderByChild: PropTypes.string,
  orderByKey: PropTypes.bool,
  orderByValue: PropTypes.bool,
  orderByPriority: PropTypes.bool,
  push: PropTypes.bool,
  startAt: PropTypes.any,
  url: PropTypes.string.isRequired
}

```

#### On [[➤]](https://www.firebase.com/docs/web/api/query/on.html)

Listen for data changes at a particular location.

```javascript
import React from 'react';
import FireAct from 'fireact';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }

  dataChangeHandler(data) {
    //Code to handle data change (update the state for example).
  }

  render() {
    return (
      <FireAct
        onDataChange={this.dataChangeHandler.bind(this)}
        url="https://dinosaur-facts.firebaseio.com/dinosaurs"
      />
    );
  }
}
```
By default, FireAct listens to ```value``` events. You can use the evenType Prop to listens to other events (```[ 'value', 'child_added', 'child_changed', 'child_removed', 'child_moved']```)


#### Once [[➤]](https://www.firebase.com/docs/web/api/query/once.html)
Listens for exactly one event of the specified event type, and then stops listening

```javascript
<FireAct
    once
    onDataChange={this.dataChangeHandler.bind(this)}
    url="https://dinosaur-facts.firebaseio.com/dinosaurs"
  />
```

#### OrderByChild [[➤]](https://www.firebase.com/docs/web/api/query/orderbychild.html)
Generates a new Query object ordered by the specified child key.

```javascript
<FireAct
    onDataChange={this.dataChangeHandler.bind(this)}
    orderByChild="height"
    url="https://dinosaur-facts.firebaseio.com/dinosaurs"
  />
```

#### OrderByKey [[➤]](https://www.firebase.com/docs/web/api/query/orderbykey.html)
Generates a new Query object ordered by key.

```javascript
<FireAct
    onDataChange={this.dataChangeHandler.bind(this)}
    orderByKey
    url="https://dinosaur-facts.firebaseio.com/dinosaurs"
  />
```

#### orderByValue [[➤]](https://www.firebase.com/docs/web/api/query/orderbyvalue.html)
Generates a new Query object ordered by key.

```javascript
<FireAct
    onDataChange={this.dataChangeHandler.bind(this)}
    orderByValue
    url="https://dinosaur-facts.firebaseio.com/dinosaurs"
  />
```

#### orderByPriority [[➤]](https://www.firebase.com/docs/web/api/query/orderbypriority.html)
Generates a new Query object ordered by key.

```javascript
<FireAct
    onDataChange={this.dataChangeHandler.bind(this)}
    orderByPriority
    url="https://dinosaur-facts.firebaseio.com/dinosaurs"
  />
```

#### startAt [[➤]](https://www.firebase.com/docs/web/api/query/startat.html)
Creates a Query with the specified starting point. The generated Query includes children which match the specified starting point.

```javascript
<FireAct
    onDataChange={this.dataChangeHandler.bind(this)}
    orderByChild="height"
    startAt={3}
    url="https://dinosaur-facts.firebaseio.com/dinosaurs"
  />
```

#### endAt [[➤]](https://www.firebase.com/docs/web/api/query/endat.html)
Creates a Query with the specified ending point. The generated Query includes children which match the specified ending point.

```javascript
<FireAct
    endat="pterodactyl"
    onDataChange={this.dataChangeHandler.bind(this)}
    orderByKey
    url="https://dinosaur-facts.firebaseio.com/dinosaurs"
  />
```

#### equalTo [[➤]](https://www.firebase.com/docs/web/api/query/equalto.html)
Creates a Query which includes children which match the specified value.

```javascript
<FireAct
    equalTo={25}
    onDataChange={this.dataChangeHandler.bind(this)}
    orderByChild="height"
    url="https://dinosaur-facts.firebaseio.com/dinosaurs"
  />
```

#### limitToFirst [[➤]](https://www.firebase.com/docs/web/api/query/limittofirst.html)
Generates a new Query object limited to the first certain number of children.

```javascript
<FireAct
    limitToFirst={2}
    onDataChange={this.dataChangeHandler.bind(this)}
    orderByChild="height"
    url="https://dinosaur-facts.firebaseio.com/dinosaurs"
  />
```

#### limitToLast [[➤]](https://www.firebase.com/docs/web/api/query/limittolast.html)
Generates a new Query object limited to the last certain number of children.

```javascript
<FireAct
    limitToLast={2}
    onDataChange={this.dataChangeHandler.bind(this)}
    orderByChild="weight"
    url="https://dinosaur-facts.firebaseio.com/dinosaurs"
  />
```

#### Writing Data
In order to write data use the ```bindTo``` prop :

```javascript

render(){
  let data = {
    user: 'Homer',
    message: 'I love Pork Chops'
  }
  return (
    <FireAct
        bindTo={data}
        url="https://dinosaur-facts.firebaseio.com/dinosaurs"
      />
  );
}
```

If you want to push the data in a new child location with a unique key, add the push prop [[➤]](https://www.firebase.com/docs/web/api/firebase/push.html)

```javascript
render(){
  let data = {
    user: 'Homer',
    message: 'I love Pork Chops'
  }
  return (
    <FireAct
        bindTo={data}
        push
        url="https://dinosaur-facts.firebaseio.com/dinosaurs"
      />
  );
}
```

#### '2 Way binding'

You can achieve two way binding by using both the bindTo and the onChangeData props :

```javascript
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        user: 'Homer',
        message: 'I love Pork Chops'
      }
    }
  }

  dataChangeHandler(data) {
    this.setState({
      data: data
    });
  }

  render() {
    return (
      <FireAct
        bindTo={this.state.data}
        onDataChange={this.dataChangeHandler.bind(this)}
        url="https://dinosaur-facts.firebaseio.com/dinosaurs"
      />
    );
  }
}
```

That's all for now !
