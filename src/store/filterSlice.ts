import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type Filter = 'all' | 'active' | 'completed';

const initialState: Filter = (localStorage.getItem('filter') as Filter) || 'all';

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter:(_, action:PayloadAction<Filter>)=>{
            localStorage.setItem('filter', action.payload);
            return action.payload;
        }
    },
    selectors:{
        selectFilter: (sliceState) => {
            return sliceState
        },
    }
})

export const { setFilter } = filterSlice.actions;
export const {selectFilter} = filterSlice.selectors;
export default filterSlice.reducer;