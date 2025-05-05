import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { useEffect } from 'react'
import { router, useLocalSearchParams } from 'expo-router'

import icons from '@/constants/icons'
import Search from '@/components/Search'
import { Card } from '@/components/Cards'
import Filters from '@/components/Filters'
import NoResults from '@/components/NoResults'

import { getProperties } from '@/lib/appwrite'
import { useAppwrite } from '@/lib/useAppwrite'

const Explore = () => {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>()

  const {
    data: properties,
    refetch,
    loading
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: 'All',
      query: ''
    },
    skip: false
  })

  useEffect(() => {
    if (params.filter || params.query) {
  console.log("jijuhug")
      refetch({
        filter: params.filter || 'All',
        query: params.query || ''
      })
    }
  }, [params.filter, params.query])

  const handleCardPress = (id: string) => router.push(`/properties/${id}`)

  return (
    <SafeAreaView className='h-full bg-white'>
      <FlatList
        data={properties}
        numColumns={2}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={item => item.$id}
        contentContainerClassName='pb-32'
        columnWrapperClassName='flex gap-5 px-5'
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <View className='flex-1 items-center justify-center py-20'>
              <ActivityIndicator size='large' color='#0061FF' />
            </View>
          ) : (
            <View className='flex-1 items-center justify-center py-20'>
              <NoResults
                title='No Properties Found'
                message={
                  params.query
                    ? `No properties match "${params.query}"`
                    : 'No properties available'
                }
              />
            </View>
          )
        }
        ListHeaderComponent={() => (
          <View className='px-5'>
            <View className='flex flex-row items-center justify-between mt-5'>
              <TouchableOpacity
                onPress={() => router.back()}
                className='flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center'
              >
                <Image
                  style={{ width: 25, height: 25 }}
                  source={icons.backArrow}
                  resizeMode='contain'
                />
              </TouchableOpacity>

              <Text className='text-base mr-2 text-center font-rubik-medium text-black-300'>
                Search for Your Ideal Home
              </Text>
              <Image
                style={{ width: 25, height: 25 }}
                source={icons.bell}
                resizeMode='contain'
              />
            </View>

            <Search />

            <View className='mt-5'>
              <Filters />
              {!loading && properties && (
                <Text className='text-xl font-rubik-bold text-black-300 mt-5'>
                  Found {properties.length} Properties
                </Text>
              )}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Explore
