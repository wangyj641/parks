import React, { Component, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export interface WebComponentProps extends React.HTMLAttributes<HTMLFormElement> {
  uri?: string;
}

const WebComponent = (props: WebComponentProps) => {
  const { uri } = props;
  console.log(uri);

  return <WebView
    source={{ uri: uri }}
    style={{ flex: 1, marginTop: -20 }}
  />
}

export default WebComponent;