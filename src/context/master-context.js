import { createContext, useReducer } from "react";
export const SET_IMPACT_TYPES = 'SET_IMPACT_TYPES';
export const SET_TOKEN = 'SET_TOKEN';

export const MasterDataContext = createContext({
    masterData: {},
    setImpactTypes: ({ impact_id, impact_type, impact_color, impact_unit, purpose }) => { }
});

const masterDataReducer = (state, action) => {
    switch (action.type) {
        case SET_IMPACT_TYPES:
            return { ...state, ...{ impactTypes: action.payload } }
        case SET_TOKEN:
            return { ...state, ...{ token: action.token } }
        default:
            return state;
    }
};

const initMasterData = {
    token: null,
    impactTypes: [{
        id: 1,
        type: 'air',
        color: '#0070BA',
        purpose: 'Climate change',
        unit: '(in Kg CO2 eq)',
        kpiValue: 180
    },
    {
        id: 2,
        type: 'land',
        color: '#007E4B',
        purpose: 'Land use',
        unit: '(in Pt)',
        kpiValue: 111547
    },
    {
        id: 3,
        type: 'human',
        color: '#BD0A79',
        purpose: 'Respiratory inorganics',
        unit: '(in disease increase)',
        kpiValue: 1000
    },
    {
        id: 4,
        type: 'water',
        color: '#009B97',
        purpose: 'Water Scarcity',
        unit: '(in m3 deprivation)',
        kpiValue: 51.4
    }],
    categories: [{
        catId: -1,
        category: 'All categories'
    },
    {
        catId: 1,
        category: 'Ingredients'
    },
    {
        catId: 2,
        category: 'Transportation'
    },
    {
        catId: 3,
        category: 'On-site resources'
    }],
    contributionTypes: [
        {
            contribId: 1,
            contribType: 'Soybean meal (solvent) from Netherlands'
        },
        {
            contribId: 2,
            contribType: 'Maize gluten meal dried from Denmark'
        },
        {
            contribId: 3,
            contribType: 'Feed coming from a certain country with a longer name'
        },
        {
            contribId: 4,
            contribType: 'Another category'
        },
        {
            contribId: 5,
            contribType: 'Another contribution category'
        }
    ]
};

const MasterDataContextProvider = ({ children }) => {
    const [masterData, dispatch] = useReducer(masterDataReducer, initMasterData);

    const setImpactTypes = (payload) => {
        return dispatch({ type: SET_IMPACT_TYPES, payload: payload });
    };

    const setToken = (token) => {
        return dispatch({ type: SET_TOKEN, token: token });
    };

    const value = {
        masterData: masterData,
        setImpactTypes: setImpactTypes,
        setToken: setToken
    };
    return <MasterDataContext.Provider value={value}>{children}</MasterDataContext.Provider>
};

export default MasterDataContextProvider;

