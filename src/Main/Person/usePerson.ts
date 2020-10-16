import * as React from "react";
import { useState} from "react";

interface IPerson {
    _id: string
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

export const usePerson = (personId: string) => {
    const [person, setPerson] = useState<IPerson | null>(null)

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setPerson({
                _id: '1',
                email: 'test_email',
                firstName: 'first',
                lastName: 'last',
                role: 'role'
            })
        }, 2000)
        return () => clearTimeout(timeout)
    }, [])

    return person
}