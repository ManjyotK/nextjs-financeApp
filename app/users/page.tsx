import { getUsers } from "@/app/lib/data";
import { User } from "@prisma/client";
import Form  from "@/app/ui/createUser";

export default async function Page() {
    const users:User[] = await getUsers();

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} ({user.email})
                    </li>
                ))}
            </ul>

            <Form></Form>
        </div>
    );
}