'use client'
'use client';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import io from 'socket.io-client';

const socket = io('http://localhost:4002');

export default function ServerPage() {
    const params = useParams();

    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected to backend');
        });
        return () => {
            socket.off('connect');
        };
    }, []);

    return (
        <div>
            <h1>Next.js and Socket.IO</h1>
        </div>
    );
}
