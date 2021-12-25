import React, {useState} from 'react';

import {Text, StyleSheet, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Container,
  Heading,
  FormControl,
  Stack,
  Input,
  Center,
  Button,
  View,
} from 'native-base';
import shortid from 'shortid';
import Snackbar from 'react-native-snackbar';

const Add = ({navigation}) => {
  const [name, setName] = useState('');
  const [totalNoSeason, setTotalNoSeason] = useState('');

  const addToList = async () => {
    try {
      if (!name || !totalNoSeason) {
        return Snackbar.show({
          text: 'Please Add Both Fields',
          backgroundColor: '#b0160b',
          textColor: '#FFF',
        });
      }

      const seasonsToAdd = {
        id: shortid.generate(),
        name,
        totalNoSeason,
        isWatched: false,
      };

      const storedValue = await AsyncStorage.getItem('@season_list');
      const prevlist = await JSON.parse(storedValue);
      if (!prevlist) {
        const newList = [seasonsToAdd];
        await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
      } else {
        prevlist.push(seasonsToAdd);
        await AsyncStorage.setItem('@season_list', JSON.stringify(prevlist));
      }

      navigation.navigate('Home');
      // setName('');
      // setTotalNoSeason('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Center>
          <Heading style={styles.heading}>Add to watch List</Heading>
        </Center>

        <FormControl>
          <Stack>
            <Center>
              <Input
                placeholder="Season name"
                style={styles.formItem}
                w={{
                  base: '80%',
                  md: '25%',
                }}
                value={name}
                onChangeText={text => setName(text)}
              />
              <Input
                placeholder="Total no of seasons"
                style={styles.formItem}
                w={{
                  base: '80%',
                  md: '25%',
                }}
                value={totalNoSeason}
                onChangeText={seasons => setTotalNoSeason(seasons)}
              />
              <Button
                variant="solid"
                style={{borderRadius: 15, backgroundColor: '#b0160b'}}
                w={{
                  base: '90%',
                  md: '25%',
                }}
                onPress={addToList}>
                Add
              </Button>
            </Center>
          </Stack>
        </FormControl>
      </ScrollView>
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0D0D0D',
    flex: 1,
  },
  heading: {
    color: '#b0160b',
    marginHorizontal: 30,
    marginTop: 50,
    marginBottom: 20,
  },
  formItem: {
    marginBottom: 20,
    borderRadius: 50,
    color: '#eee',
  },
});
