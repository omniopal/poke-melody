'use client'

// import './pokemon.css';
import dynamic from 'next/dynamic';

export default function Page() {
    const DynamicMap = dynamic(() => import("../../components/pokemon-map/pokemon-map"), { ssr: false });
    return <DynamicMap />;
}