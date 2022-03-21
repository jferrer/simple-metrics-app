import {StyleSheet, View} from 'react-native';

type Props = {
  children: React.ReactNode;
};

const Container = ({children}: Props) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 100,
  },
});

export default Container;
