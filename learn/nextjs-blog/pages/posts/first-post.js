import Link from 'next/link';

export default function FirstPost() {
    // note here the name of the function doesn't really matter
    // it can be anything

    return <>
        <h1>First Post</h1>
        <h2>
            <Link href="/">Back to home</Link>
        </h2>
    </>;
}