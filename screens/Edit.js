import React, {useEffect, useState} from 'react';

import {StyleSheet, ScrollView} from 'react-native';
import {
  Container,
  Heading,
  FormControl,
  Stack,
  Input,
  Center,
  Button,
} from 'native-base';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Edit = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [totalNoSeason, setTotalNoSeason] = useState('');
  const [id, setId] = useState(null);

  const update = async () => {
    try {
      if (!name || !totalNoSeason) {
        return Snackbar.show({
          text: 'Please Add Both Fields',
          backgroundColor: '#b0160b',
          textColor: '#FFF',
        });
      }
      const seasonToUpdate = {
        id,
        name,
        totalNoSeason,
        isWatched: false,
      };

      const storedValue = await AsyncStorage.getItem('@season_list');
      const list = await JSON.parse(storedValue);

      list.map(singleSeason => {
        if (singleSeason.id == id) {
          (singleSeason.name = name),
            (singleSeason.totalNoSeason = totalNoSeason);
        }
        return singleSeason;
      });
      await AsyncStorage.setItem('@season_list', JSON.stringify(list));
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const {item} = route.params;
    const {id, name, totalNoSeason} = item;
    setId(id);
    setName(name);
    setTotalNoSeason(totalNoSeason);
  }, []);

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} style={styles.container}>
      <Center>
        <Heading style={styles.heading}>Update the series</Heading>
      </Center>

      <FormControl>
        <Stack>
          <Center>
            <Input
              placeholder="Season name"
              style={styles.formItem}
              w={{
                base: '75%',
                md: '25%',
              }}
              value={name}
              onChangeText={text => setName(text)}
            />
            <Input
              placeholder="Total no of seasons"
              style={styles.formItem}
              w={{
                base: '75%',
                md: '25%',
              }}
              value={totalNoSeason}
              onChangeText={seasons => setTotalNoSeason(seasons)}
            />
            <Button
              variant="solid"
              style={{borderRadius: 15, backgroundColor: '#a31d14'}}
              w={{
                base: '90%',
                md: '25%',
              }}
              onPress={update}>
              update
            </Button>
          </Center>
        </Stack>
      </FormControl>
    </ScrollView>
  );
};
export default Edit;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0D0D0D',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    color: '#b0160b',
    marginHorizontal: 5,
    marginTop: 50,
    marginBottom: 20,
  },
  formItem: {
    marginBottom: 20,
    color: '#eee',
    borderRadius: 50,
  },
});
