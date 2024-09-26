import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import WebComponent from './components/webview';

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

const nearByURL = 'http://127.0.0.1:5500/html/nearby.html';

function Page() {
  return (<WebComponent uri={nearByURL} />);
}

export default Page;
