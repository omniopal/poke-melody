'use client'

// import './pokemon.css';
import dynamic from 'next/dynamic';

export default function Page() {
    const DynamicMap = dynamic(() => import("../../components/freeplay-pokemon-map/freeplay-pokemon-map"), { ssr: false });
    return <DynamicMap />;
}