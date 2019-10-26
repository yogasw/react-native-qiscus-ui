import * as Qiscus from 'react-native-qiscus-ui/service/qiscus';
import ScreenListChatRoom from './Screens/ScreenListChatRoom'

export const QiscusInit = Qiscus.init;
export const QiscusLoginRegister = (userId, userKey, username = userId, avatarURL = '') => {
    Qiscus.qiscus.setUser(userId, userKey)
};
export const ListChatRoom = ScreenListChatRoom
