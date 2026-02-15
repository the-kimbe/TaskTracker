import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from '@react-native-vector-icons/lucide';

export default function Header({ navigation }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 12 }}>
      
      <TouchableOpacity onPress={() => navigation?.openDrawer()}>
        <Icon name="menu" size={28} color="#4f46e5" />
      </TouchableOpacity>

      <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
        <View style={{ height: 45, width: 45, backgroundColor: '#4f46e5', borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 4, elevation: 4 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>TT</Text>
        </View>
      </View>

      {/* Right Placeholder */}
      <View style={{ width: 32 }} />
    </View>
  );
}
