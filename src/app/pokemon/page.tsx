'use client'

// import './pokemon.css';
import dynamic from 'next/dynamic';
import { Homepage } from 'src/components/pokemon-map/homepage';

export default function Page() {
    // const DynamicMap = dynamic(() => import("../../components/pokemon-map/pokemon-map"), { ssr: false });
    // return <DynamicMap />;
    return <Homepage />
}