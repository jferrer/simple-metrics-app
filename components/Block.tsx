import * as React from 'react';
import {StyleSheet, View} from 'react-native';

import tw from '../lib/tailwind';

type Props = {
  row?: true;
  justify?: true;
  children: React.ReactNode;
};

const Block = ({
  row,
  justify,
  children,
}: Props) => {

  return (
    <View
      style={[
        styles.container,
        row ? styles.row : null,
        justify ? styles.justify : null,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...tw`p-4`,
  },
  row: {
    ...tw`flex-row`,
  },
  justify: {
    ...tw`justify-between items-center`,
  },
});

export default Block;
