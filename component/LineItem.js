import React from 'react';
import {View} from 'react-native';
import color from '../lib/color';

class LineItem extends React.PureComponent {
  render() {
    return <View style={{width: '100%', height: 0.1, backgroundColor: `${color.gray}`}}/>;
  }
}
export default LineItem
