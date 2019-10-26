import React from 'react';
import {View} from 'react-native';
import color from '../lib/color';

export class LineItem extends React.PureComponent {
  render() {
    return <View style={{height: 0.3, backgroundColor: `${color.gray}`, marginLeft:10}}/>
  }
}

