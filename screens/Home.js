import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView} from 'react-native';

import {
  Text,
  Button,
  FlatList,
  HStack,
  VStack,
  Spacer,
  Checkbox,
  Heading,
  Fab,
  Box,
  View,
  Spinner,
  Image,
} from 'native-base';
import Brand from '../Assets/netflix.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

const Home = ({navigation, route}) => {
  const [listOfSeasons, setListOfSeasons] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const getList = async () => {
    setLoading(true);

    const storedValue = await AsyncStorage.getItem('@season_list');
    console.log(storedValue);
    if (storedValue === null) {
      setLoading(false);
      setListOfSeasons([]);
    } else {
      const list = JSON.parse(storedValue);
      setListOfSeasons(list);
      setLoading(false);
    }
  };

  const deleteSeasons = async id => {
    try {
      const newList = await listOfSeasons.filter(list => list.id !== id);
      await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
      setListOfSeasons(newList);
    } catch (error) {
      console.log(error);
    }
  };
  const markComplete = async id => {
    try {
      const newArr = listOfSeasons.map(list => {
        if (list.id === id) {
          list.isWatched = !list.isWatched;
        }
        return list;
      });

      await AsyncStorage.setItem('@season_list', JSON.stringify(newArr));
      setListOfSeasons(newList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getList();
  }, [isFocused]);

  if (loading) {
    return (
      <View
        flex={1}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0D0D0D',
        }}>
        <Spinner color="#a31d14" size={45} />
      </View>
    );
  }
  const FabBtn = () => {
    return (
      <Fab
        style={{backgroundColor: '#b0160b'}}
        placement="bottom-right"
        onPress={() => {
          navigation.navigate('Add');
        }}
        icon={<Icon name="plus" color="#fff" />}
      />
    );
  };
  return (
    <View style={styles.container}>
      {listOfSeasons.length === 0 ? (
        <Box
          style={
            (styles.container, {alignItems: 'center', justifyContent: 'center'})
          }>
          <Heading style={styles.heading}>
            watchlist is Empty.Please add a Seasons
          </Heading>
          <Icon size={100} name="dropbox" color="#FFF" />
        </Box>
      ) : (
        <>
          <Heading style={styles.heading}>
            <Image source={Brand} alt="brand" size="sm" />
            Next series to watch
          </Heading>
          {
            <FlatList
              data={listOfSeasons}
              renderItem={({item}) => (
                <Box pl="4" pr="2" py="2" my={1} mx={2} style={styles.record}>
                  <HStack space={2}>
                    <Button
                      colorScheme="danger"
                      w={{base: '13%'}}
                      onPress={() => deleteSeasons(item.id)}>
                      <Icon name="trash" size={23} />
                    </Button>
                    <Button
                      w={{base: '13%'}}
                      onPress={() => {
                        navigation.navigate('Edit', {item});
                      }}>
                      <Icon name="edit" size={23} />
                    </Button>
                    <Spacer />
                    <VStack style={{alignItems: 'center', flexShrink: 1}}>
                      <Heading
                        size="md"
                        style={{
                          color: '#fae3e1',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {item.name}
                      </Heading>

                      <Text style={styles.seasonName}>
                        {item.totalNoSeason}
                      </Text>
                    </VStack>
                    <Spacer />
                    <Checkbox
                      defaultIsChecked={item.isWatched}
                      onPress={() => markComplete(item.id)}
                      style={{marginTop: 15, color: 'blue'}}>
                      <></>
                    </Checkbox>
                  </HStack>
                </Box>
              )}
              keyExtractor={item => item.id}
            />
          }
        </>
      )}
      {isFocused ? <FabBtn /> : <></>}
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#0D0D0D',
    flex: 1,
  },

  heading: {
    textAlign: 'center',
    marginVertical: 15,
    marginHorizontal: 5,
    fontSize: 20,
    color: '#a31d14',
  },
  record: {
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 15,
  },
  actionButton: {
    marginLeft: 5,
  },
  seasonName: {
    color: '#fdcb9e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    marginLeft: 0,
    marginBottom: 20,
  },
});
