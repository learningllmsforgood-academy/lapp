import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function FirstPost() {
    // note here the name of the function doesn't really matter
    // it can be anything

    return <>
        <Head>
            <title>First Post</title>
        </Head>
        
        <h1>First Post</h1>

        <h2>
            <Link href="/">Back to home</Link>
        </h2>
        <ul>
            <li><Link href="/posts/page-with-3rd-party-script">3rd Party JS example</Link></li>
        </ul>

        <div>
            <div><Link href="/example.txt">Example txt file</Link></div>
            <div><ExampleImage /></div>
        </div>
    </>;
}

const ExampleImage = () => (
    <Image 
        src="/images/profile.png"
        height={50}
        width={50}
        alt="Learning App"
    />
)
