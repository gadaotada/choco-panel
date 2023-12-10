'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

import type { Server } from "@/types";

interface ServersCompProps {
    data: Server[] | null
}

const ServersComp: React.FC<ServersCompProps> = ({data}) => {
    const [servers, setServers] = useState(data)

    const router = useRouter();
    
    return (
        <>
            <div>
                {(!servers || servers.length === 0) ? (<h1>No servers found, add some first</h1>) 
                          : (
                            servers.map((server) => 
                                <p 
                                    key={server.server_host}
                                    onClick={() => router.push(`/servers/${server.id}`)}
                                >
                                    {server.server_name}
                                </p>
                            )
                          )                
                }
            </div>
        </>
    )
};

export default ServersComp;