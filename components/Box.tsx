import {Pressable, View, StyleSheet} from 'react-native';

import Text from './Text';
import tw from '../lib/tailwind';

import {formatNumber} from '../utils';

type Props = {
  label: string;
  value: string;
  small?: true;
  onPress?: void;
};

const Box = ({label, value, small, onPress}: Props) => {
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={[
          styles.container,
          small ? styles.small : null,
        ]}>
        <Text weight='bold'>{label}</Text>
        <Text size='xs'>{formatNumber(value)}</Text>
      </Pressable >
    );
  } else {
    return (
      <View
        style={[
          styles.container,
          small ? styles.small : null,
        ]}>
        <Text weight='bold'>{label}</Text>
        <Text size='xs'>{formatNumber(value)}</Text>
      </View>
    )
  }


};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    ...tw`border-2 border-black rounded-lg`,
  },
  small: {
    width: 50,
    height: 50,
  }
});

export default Box;
