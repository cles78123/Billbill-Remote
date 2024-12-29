import {ref} from "vue";
import {functionSwitch, selectDefaultValue} from "../../../settings/settings.ts";

export const switchStates = createReactiveRefs({
    ...functionSwitch,
    ...selectDefaultValue
});

export function initializeSwitchStates(items) {
    for (const key in switchStates) {
        switchStates[key].value = items[key];
    }
}

function createReactiveRefs(initialValues) {
    const reactiveRefs = {};
    for (const key in initialValues) {
        reactiveRefs[key] = ref(initialValues[key]);
    }
    return reactiveRefs;
}
