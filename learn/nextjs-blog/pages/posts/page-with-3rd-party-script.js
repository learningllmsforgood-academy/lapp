import { useState, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';

import styles from '../../styles/third-party-script-post.module.scss';

export default function ThirdPartyScriptDemo() {
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ onLoadFired, setOnLoadFired ] = useState(false);

    useEffect(() => {
        // on back button the script's onLoad won't fire
        // need to account for that
        if (window.FB) {
            setIsLoaded(true);
        }
    }, []);

    return <>
        <Head>
            3rd Party Script Demo
        </Head>
        <h1>This page loads a 3rd party script (facebook SDK)</h1>
        <div className={styles.tt}>
            <table>
                <tbody>
                <tr>
                    <td>SDK loaded</td>
                    <td><code>{JSON.stringify(isLoaded)}</code></td>
                </tr>
                <tr>
                    <td>Script <code>onLoad</code> called</td>
                    <td><code>{JSON.stringify(onLoadFired)}</code></td>
                </tr>
                </tbody>
            </table>
        </div>
        <Link href="/posts/first-post">Back to 1st post</Link>

        <Script
            src={"https://connect.facebook.net/en_US/sdk.js"}
            strategy='lazyOnload'
            onLoad={() => {
                console.log('Facebook SDK is loaded. window.FB should be available');
                setOnLoadFired(true);
                setIsLoaded(true);
            }}
        />
    </>
}
