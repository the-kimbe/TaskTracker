import { View, Text } from 'react-native'
import React from 'react'

export default function Header() {
    return (
        <View className="mb-10 items-center">
            <View className="h-16 w-16 bg-indigo-600 rounded-2xl items-center justify-center mb-4 shadow-lg">
                <Text className="text-white text-3xl font-bold">TT</Text>
            </View>
            <Text className="text-3xl font-extrabold text-slate-900">TaskTracker</Text>
            <Text className="text-slate-500 mt-2 text-center">
                Stay organized. Track your progress from {"\n"}
                <Text className="text-orange-500 font-semibold">Pending</Text> to <Text className="text-emerald-500 font-semibold">Complete</Text>.
            </Text>
        </View>
    )
}