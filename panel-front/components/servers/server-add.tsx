'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ChangeEvent } from 'react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Server } from "@/types";
import toast from "react-hot-toast";


interface AddServerCompProps {
    addServer: (serverDetails: Server) => Promise<number | null>
}

const AddServerComp: React.FC<AddServerCompProps> = ({addServer}) => {
    const [serverInfo, setServerInfo] = useState<Server>({
     id: 0,
     server_name: "",
     server_host: "",
     server_port: 22,
     server_username: "",
     server_password: "",
     server_note: "",
    });
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
        if (field === 'server_port') {
            setServerInfo(prevInfo => ({ ...prevInfo, server_port: parseInt(e.target.value) }));
        } else {
            setServerInfo(prevInfo => ({ ...prevInfo, [field]: e.target.value }));
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        const res = await addServer(serverInfo)
        if (res) {
            toast.success('Server was added successfuly');
            router.refresh();
            setLoading(false);
        } else {
            toast.error("Couldn't add the server, please try again later");
            setLoading(false);
        }
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline">Add a new server</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Enter the server information</AlertDialogTitle>
  
                        <div className="flex flex-col justify-center items-center gap-y-4 w-full text-sm text-muted-foreground">
                            <div className="flex flex-col space-y-1.5 w-full">
                                <Label htmlFor="server_name">Name</Label>
                                <Input 
                                    id="server_name" 
                                    placeholder="Name of your server" 
                                    name="server_name" 
                                    value={serverInfo.server_name}
                                    onChange={(e) => handleChange(e, 'server_name')}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5 w-full">
                                <Label htmlFor="server_host">Host</Label>
                                <Input 
                                    id="server_host" 
                                    placeholder="Host/ip of your server" 
                                    name="server_host" 
                                    value={serverInfo.server_host}
                                    onChange={(e) => handleChange(e, 'server_host')}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5 w-full">
                                <Label htmlFor="server_port">Port</Label>
                                <Input 
                                    id="server_port" 
                                    placeholder="default is 22" 
                                    type="number"
                                    name="server_port" 
                                    value={serverInfo.server_port}
                                    onChange={(e) => handleChange(e, 'server_port')}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5 w-full">
                                <Label htmlFor="server_username">Server username</Label>
                                <Input 
                                    id="server_username" 
                                    placeholder="default is root" 
                                    type="text" 
                                    name="server_username" 
                                    value={serverInfo.server_username}
                                    onChange={(e) => handleChange(e, 'server_username')}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5 w-full">
                                <Label htmlFor="server_password">Server users password</Label>
                                <Input 
                                    id="server_password" 
                                    placeholder="*************" 
                                    type="password" 
                                    name="server_password" 
                                    value={serverInfo.server_password}
                                    onChange={(e) => handleChange(e, 'server_password')}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5 w-full">
                                <Label htmlFor="server_note">Note</Label>
                                <Input 
                                    id="server_note" 
                                    placeholder="Note to add additional information" 
                                    type="text" 
                                    name="server_note" 
                                    value={serverInfo.server_note}
                                    onChange={(e) => handleChange(e, 'server_note')}
                                />
                            </div>
                        </div>
              
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit} disabled={loading}>
                        Add
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
};

export default AddServerComp;