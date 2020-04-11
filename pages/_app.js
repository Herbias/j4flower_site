import React from 'react';
import App from 'next/app';
import '../css/index.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
