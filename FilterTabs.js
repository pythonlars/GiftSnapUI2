import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const FilterTabs = ({ activeTab, setActiveTab }) => (
  <View style={styles.filterTabs}>
    <TouchableOpacity 
      style={[styles.filterTab, activeTab === 'all' && styles.activeFilterTab]}
      onPress={() => setActiveTab('all')}
    >
      <Text style={styles.filterTabText}>🔎 All</Text>
    </TouchableOpacity>
    <TouchableOpacity 
      style={[styles.filterTab, activeTab === 'unused' && styles.activeFilterTab]}
      onPress={() => setActiveTab('unused')}
    >
      <Text style={styles.filterTabText}>🔄 Unused</Text>
    </TouchableOpacity>
    <TouchableOpacity 
      style={[styles.filterTab, activeTab === 'used' && styles.activeFilterTab]}
      onPress={() => setActiveTab('used')}
    >
      <Text style={styles.filterTabText}>✓ Used</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  filterTabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeFilterTab: {
    borderBottomColor: '#6366f1',
  },
  filterTabText: {
    fontWeight: '500',
  },
});

export default FilterTabs;
