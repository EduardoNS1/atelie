import { Text, View, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'

import { icons } from '../../constants'

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center">
      <Image 
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={{ padding: 12, height: 25, width: 25 }}
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}>{name}</Text>
    </View>
  )
}

const TabsLayout = () => {
    return (
      <>
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#F65AEF',
            tabBarInactiveTintColor: '#414141',
            tabBarStyle: {
              backgroundColor: '#000',
              position: 'absolute',
              botttom: 0,
              justifyContent: 'center',
              alignSelf: 'center',
              height: 63,
              paddingHorizontal: 10,
              paddingVertical: 8,
              paddingBottom: 10,
            }
          }}
        >
          <Tabs.Screen 
            name="home"
            options={{
              title: 'Home',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.home}
                  color={color}
                  focused={focused}
                />
              )
            }}
          />
          <Tabs.Screen 
            name="create"
            options={{
              title: 'Create',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.plus}
                  color={color}
                  focused={focused}
                />
              )
            }}
          />
          <Tabs.Screen 
            name="bookmark"
            options={{
              title: 'Profile',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.bookmark}
                  color={color}
                  focused={focused}
                />
              )
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.profile}
                  color={color}
                  focused={focused}
                />
              )
            }}
          />
        </Tabs>
      </>
    )
}

export default TabsLayout
