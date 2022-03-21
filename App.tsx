import {useEffect, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

import {Block, Box, Container, Text} from './components';

import {
  delay,
  detailInitialState,
  formatNumber,
  parseDate,
  today,
  weekInitialState,
} from './utils';

import tw from './lib/tailwind';

export default function App() {
  const [week, setWeek] = useState(weekInitialState);
  const [detail, setDetail] = useState(detailInitialState);

  const [loadingWeek, setLoadingWeek] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    (async () => {
      setLoadingWeek(true);

      await delay(1000);

      const response = await fetch(`api/metrics?week=${today}`);
      const json = await response.json();

      setWeek(json);
      setLoadingWeek(false);
    })();
  }, []);

  const getDetail = async (date: string) => {
    setLoadingDetail(true);
    setDetail(detailInitialState);

    await delay(1000);

    const [dayResponse, hourResponse] = await Promise.all([
      fetch(`api/metrics?day=${date}`),
      fetch(`api/metrics?hour=${date}`)
    ])

    const dayJson = await dayResponse.json();
    const hourJson = await hourResponse.json();

    setDetail({
      day: dayJson.data,
      dayAvg: dayJson.avg,
      hour: hourJson.data,
      hourAvg: hourJson.avg,
    })

    setLoadingDetail(false);
  }

  const renderRow = (toRender) => {
    const elementsInRow = 12;

    const chunk = (arr: [], size: number) =>
      Array.from({length: Math.ceil(arr.length / size)}, (v, i) =>
        arr.slice(i * size, i * size + size)
      );

    const rows = chunk(toRender, elementsInRow)

    return rows.map((row, index) => {
      return <View style={styles.row} key={`row-${index}`}>
        {
          row.map((item, index) => (
            <Box
              key={index}
              label={Number.parseInt(item[0])}
              value={item[1]}
              small
            />
          ))
        }
      </View>
    })
  }

  return (
    <Container>
      <Block justify>
        <Text size='3xl' weight='bold' uppercase>Week Metrics</Text>
      </Block>

      {loadingWeek && (
        <Block>
          <ActivityIndicator size='large' color='#000000' />
        </Block>
      )}

      {(week.data.length > 0) && (
        <>
          <Block justify>
            <Text size='xs' uppercase>Day Average</Text>
            <Text size='3xl' weight='bold'>{formatNumber(week.avg)}</Text>
          </Block>

          <Block justify>
            <Block row>
              {week.data.map((day, index) => {
                return (
                  <Box
                    key={index}
                    label={parseDate(day[0])}
                    value={String(day[1])}
                    onPress={() => getDetail(day[0])}
                  />
                )
              })}
            </Block>
          </Block>
        </>
      )}

      {loadingDetail && (
        <Block>
          <ActivityIndicator size='large' color='#000000' />
        </Block>
      )}

      {(detail.day.length > 0) && (
        <>
          <Block justify>
            <Text size='xl' weight='bold' uppercase>Day</Text>

            <Block justify>
              <Text size='xs' uppercase>Hour Average</Text>
              <Text size='3xl' weight='bold'>{formatNumber(detail.dayAvg)}</Text>
            </Block>

            <Block>
              {renderRow(detail.day, 12)}
            </Block>
          </Block>
        </>
      )}

      {(detail.hour.length > 0) && (
        <>
          <Block justify>
            <Text size='xl' weight='bold' uppercase>Hours</Text>

            <Block justify>
              <Text size='xs' uppercase>Minute Average</Text>
              <Text size='3xl' weight='bold'>{formatNumber(detail.hourAvg)}</Text>
            </Block>

            <Block>
              {renderRow(detail.hour, 20)}
            </Block>
          </Block>
        </>
      )}

      <StatusBar style="auto" />
    </Container>
  );
}

const styles = StyleSheet.create({
  row: {
    width: "100%",
    ...tw`flex-row`,
    marginBottom: 10,
  },
});
