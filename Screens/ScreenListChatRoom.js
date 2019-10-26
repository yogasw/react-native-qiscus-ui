import React from 'react';
import {View, FlatList, Text} from 'react-native';
import RoomListItem from '../component/RoomListItem';
import * as Qiscus from './../service/qiscus';
import xs from 'xstream';
import color from './../lib/color'
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

    componentWillMount() {
        this.subscription && this.subscription.unsubscribe()
    }

    ListRoomItem = item => {
        return item.map((item, key) => {
            return (
              <RoomListItem item={item} key={key}/>
            )
        })
    }

    render() {
        let data = Object.values(this.state.rooms)
        let _data = data.length > 0 ? data : []
        return (
            <View style={style.root}>
                {this.ListRoomItem(_data)}
            </View>
        );
    }
}

export default ScreenListChatRoom;
const style = {
    root: {
        flex: 1,
        backgroundColor:color.white
    },
};
