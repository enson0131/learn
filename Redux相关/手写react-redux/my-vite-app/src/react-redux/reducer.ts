const initialState = {
    count: 0
}

export function reducer(state = initialState, action: { type: string}) {
    switch (action.type) {
        case 'add': 
            return {
                ...state,
                count: state.count + 1
            }
        case 'reduce':
            return {
                ...state,
                count: state.count - 1
            }
        default:
            return initialState;
    }
}