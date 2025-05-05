import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'

import images from '@/constants/images'
import icons from '@/constants/icons'

interface NoResultsProps {
  title?: string
  message?: string
  showHomeButton?: boolean
}

const NoResults: React.FC<NoResultsProps> = ({
  title = 'No Results Found',
  message = "We couldn't find what you're looking for",
  showHomeButton = false
}) => {
  return (
    <View className='flex-1 items-center justify-center px-4 py-8 bg-white'>
      <View className='items-center'>
        <View className='bg-primary-100 rounded-full p-8 mb-6'>
          <Image
            style={{ width: 40, height: 40 }}
            source={icons.info}
            className='size-12'
            tintColor='#1A1E80'
          />
        </View>

        <View className='absolute -right-4 -top-4'>
          <View className='bg-primary-100/50 rounded-full p-3'>
            <Image
              source={icons.search}
              className='size-4'
              tintColor='#1A1E80'
            />
          </View>
        </View>
        <View className='absolute -left-4 top-8'>
          <View className='bg-primary-100/50 rounded-full p-2'>
            <Image
              source={icons.filter}
              className='size-3'
              tintColor='#1A1E80'
            />
          </View>
        </View>
      </View>

      <Text className='text-2xl font-rubik-bold text-black-300 text-center'>
        {title}
      </Text>
      <Text className='text-base text-black-100 mt-2 text-center px-4 max-w-[300px]'>
        {message}
      </Text>

      {showHomeButton && (
        <TouchableOpacity
          onPress={() => router.push('/')}
          className='mt-8 bg-primary-300 px-8 py-4 rounded-full flex-row items-center'
        >
          <Image
            style={{ width: 40, height: 40 }}
            source={icons.home}
            className='size-5 mr-2'
            tintColor='#fff'
          />
          <Text className='text-white font-rubik-medium'>Back to Home</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default NoResults
