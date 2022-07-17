import { roleType } from "../../types/roleType";
import { commentAllResources, resource, flightAllResources, userAllResources, userOwnResources } from "./resourcesBackend";
export let ROLE_ACCESSES = new Map<roleType, resource[]>();

ROLE_ACCESSES.set('AIRLINE', [...userOwnResources, ...flightAllResources, ...userAllResources]);

ROLE_ACCESSES.set('ADMINISTRATOR', [...userOwnResources, ...flightAllResources]);
ROLE_ACCESSES.set('PILOT', [...userOwnResources, 'FLIGHT_ADD_COMMENT']);
ROLE_ACCESSES.set('OCC', [...userOwnResources, 'FLIGHT_ADD_COMMENT']);
ROLE_ACCESSES.set('RAMP', [...userOwnResources, 'FLIGHT_ADD_COMMENT']);
ROLE_ACCESSES.set('GATE', [...userOwnResources, 'FLIGHT_ADD_COMMENT']);
