export const PUT = (all) => ({ type: 'PUT', all });

const putReducer = (state = ' ', action) => {
    console.log(action.all);
    switch (action.type) {
        case 'PUT':
            return action.all; 
        default:
            return state;
    }
}

export default putReducer;
