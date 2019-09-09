export const RECEIVE_ENTRY = "RECEIVE_ENTRY"
export const ADD_ENTRY = "ADD_ENTRY"

export const receiveEntries = (entries) => ({
    type: RECEIVE_ENTRY,
    entries
})

export const addEntry = (entry) => ({
    type: ADD_ENTRY,
    entry
})