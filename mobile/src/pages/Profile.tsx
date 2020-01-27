import React from 'react';
import { WebView } from 'react-native-webview';

export function Profile({ navigation: { getParam }}) {
  const github_username = getParam('github_username');
  return (
    <WebView
      style={{ flex: 1 }}
      source={{ uri: `https://github.com/${github_username}`}}
    />
  )
}
