import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Image, TextInput } from 'react-native'
import { useDebouncedCallback } from 'use-debounce'

import icons from '@/constants/icons'
import { useLocalSearchParams, router, Redirect } from 'expo-router'

const Search = ({
  onSearchResults
}: {
  onSearchResults?: (count: number) => void
}) => {
  const params = useLocalSearchParams<{ query?: string }>()
  const [search, setSearch] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [shouldSync, setShouldSync] = useState(true)

  // Only sync on initial load
  useEffect(() => {
    if (shouldSync && params.query) {
      setSearch(params.query.toString())
      setShouldSync(false)
    }
  }, [params.query, shouldSync])

  const handleSearch = (text: string) => {
    setSearch(text)
    setIsTyping(true)
    setShouldSync(false)

    if (text === '') {
      return <Redirect href='/' />
    }
  }

  const handleSubmit = () => {
    setIsTyping(false)
    if (!search.trim()) {
      router.setParams({ query: '' })
      return <Redirect href='/' />
    }
    router.setParams({ query: search.trim() })
  }

  const handleClear = () => {
    return <Redirect href='/' />
  }

  return (
    <View className='flex flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100 mt-5 py-3'>
      <View className='flex-1 flex flex-row items-center justify-start'>
        <TouchableOpacity onPress={handleSubmit}>
          <Image
            source={icons.search}
            resizeMode='contain'
            style={{ width: 28, height: 28 }}
            tintColor={isTyping ? '#1A1E80' : '#666876'}
          />
        </TouchableOpacity>
        <TextInput
          value={search}
          onChangeText={handleSearch}
          onSubmitEditing={handleSubmit}
          placeholder='Search properties...'
          returnKeyType='search'
          className='text-base font-rubik text-black-300 ml-2 flex-1'
          autoCapitalize='none'
          autoCorrect={false}
          blurOnSubmit={true}
          style={{ outline: 'none' }}
        />
        {search ? (
          <TouchableOpacity
            onPress={handleClear}
            className='p-2 bg-primary-100 rounded-full'
          >
            {/* <Image
              source={icons.backArrow}
              className='size-3.5 rotate-90'
              tintColor='#1A1E80'
            /> */}
          </TouchableOpacity>
        ) : null}
      </View>

      {/* <TouchableOpacity className='ml-3'>
        <Image style={{ width: 40, height: 40 }}source={icons.filter} className='size-5' tintColor='#666876' />
      </TouchableOpacity> */}
    </View>
  )
}

export default Search
