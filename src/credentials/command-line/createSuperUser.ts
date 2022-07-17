import prompt from 'prompt';
import { userType } from '../../../types/userType';
import { airlineType } from '../../../types/airlineType';
import { insertUser } from './insertUser';
import { insertAirline } from './insertAirline';


const properties = [
    {
        name: 'airlineName',
        validator: /^[a-zA-Z\s\-]+$/,
        warning: 'Airline name must be only letters, spaces, or dashes'
    },
    {
        name: 'userCode',
        validator: /^[a-zA-Z\s\-]+$/,
        warning: 'Code must be only letters, spaces, or dashes'
    },
    {
        name: 'firstName',
        validator: /^[a-zA-Z\s\-]+$/,
        warning: 'First name must be only letters, spaces, or dashes'
    },
    {
        name: 'lastName',
        validator: /^[a-zA-Z\s\-]+$/,
        warning: 'Last name must be only letters, spaces, or dashes'
    },
    {
        name: 'email',
        validator: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        warning: 'Incorrect email format'
    },
    {
        name: 'password',
        hidden: true
    },
];

prompt.start();

prompt.get(properties, async function (err, result) {
    if (err) { return onErr(err); }
    console.log('Command-line input received:');
    console.log('  Airline name: ' + result.airlineName);
    console.log('  Code: ' + result.userCode);
    console.log('  First name: ' + result.firstName);
    console.log('  Last name: ' + result.lastName);
    console.log('  Email: ' + result.email);
    console.log('  Password: *****');

    const newAirline: airlineType = {
        id: null,
        name: result.airlineName as string,
        active: true
    }

    const AirlineId: number = await insertAirline(newAirline)

    const newUser: userType = {
        id: null,
        firstName: result.firstName as string,
        lastName: result.lastName as string,
        email: result.email as string,
        backend: true,
        mustChangePassword: false,
        password: result.password as string,
        roles: {
            roles: ['ADMINISTRATOR', 'AIRLINE']
        },
        AirlineId: AirlineId
    }
    insertUser(newUser)

});
function onErr(err: any) {
    console.log(err);
    return 1;
}
