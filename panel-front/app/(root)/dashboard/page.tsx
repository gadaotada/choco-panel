import { getServers } from "@/lib/actions/data-get-fns";
import { createServer } from "@/lib/actions/data-mutt-fns"
import ServersComp from "@/components/servers/servers-ui";
import AddServerComp from "@/components/servers/server-add"

export default async function DashboardPage() {
  
  const servers = await getServers();
  
  return (
    <div>
      <AddServerComp addServer={createServer}/>
      <ServersComp data={servers}/>
    </div>
  );
}
