import React from 'react';
import {View, FlatList, Text} from 'react-native';
import RoomListItem from 'react-native-qiscus-ui/component/RoomListItem';
import * as Qiscus from './../service/qiscus';
import {isLogin$} from './../service/qiscus';
import xs from 'xstream';

class ScreenListChatRoom extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      rooms: {},
    };
  }

  componentDidMount() {
    this.fetchRoom();
  }

  fetchRoom = () => {
    this.subscription = Qiscus.isLogin$()
      .filter(isLogin => isLogin == true)
      .take(1)
      .map(() => xs.from(Qiscus.qiscus.loadRoomList()))
      .flatten()
      .subscribe({
        next: rooms => {
          this.setState({rooms});
        },
      });
  };


  render() {
    let data = Object.values(this.state.rooms)
    let _data = data.length > 0 ? data : []
    return (
      <View style={style.root}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={_data}
          renderItem={({item, index}) => {
            return (<RoomListItem/>)}
          }/>
      </View>
    );
  }
}

export default ScreenListChatRoom;
const style = {
  root: {
    flex: 1,
    padding: 10,
  },
};
